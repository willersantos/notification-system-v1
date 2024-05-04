import { ValidateLoginEnum } from "@/shared/enum/validateLogin.enum";
import { DateUtils } from "@/shared/helpers/utils/date";
import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Secret, verify } from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);
    private readonly jwtSecret = this.configService.get("authJwt.jwtSecret");

    constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const preAuthorized = this.reflector.get<boolean>("pre-authorized", context.getHandler());

        if (preAuthorized === true) return true;

        const request = context.switchToHttp().getRequest();

        const token = request.headers["authorization"]?.replace("Bearer ", "") as string | undefined;

        if (!token) {
            this.logger.error("Error service login - Description - Undefined token");
            throw new UnauthorizedException(ValidateLoginEnum.INVALID_TOKEN);
        }

        try {
            const decodedToken = verify(token, this.jwtSecret as Secret) as any;
            if (new Date(decodedToken.exp) < DateUtils.today()) {
                this.logger.error("Error service login - Description - Expired token");
                throw new UnauthorizedException(ValidateLoginEnum.EXPIRED_TOKEN);
            }

            const user = JSON.parse(decodedToken.sub);

            request.user = user;

            return true;
        } catch (error) {
            this.logger.error(`Error service canActivate - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
