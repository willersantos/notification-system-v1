import { DateUtils } from "@/shared/helpers/utils/date";
import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign } from "jsonwebtoken";
import { UserDto } from "../user/dto/user.dto";

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);
    private readonly quantityTokenDays: number = this.configService.get("authJwt.accessTokenExpirationDays");
    private readonly secretToken: string = this.configService.get("authJwt.jwtSecret");

    constructor(private readonly configService: ConfigService) {}

    public async generateAccessToken(user: UserDto): Promise<string> {
        try {
            this.logger.log(`Start service generateAccessToken - Request - ${JSON.stringify({ user })}`);

            const now = DateUtils.today();

            const payload = {
                sub: JSON.stringify(user),
                exp: DateUtils.getTime(DateUtils.addDays(now, this.quantityTokenDays)),
                iat: DateUtils.getTime(now)
            };

            const accessToken = sign(payload, this.secretToken);

            this.logger.log("End service generateAccessToken");

            return accessToken;
        } catch (error) {
            this.logger.error(`Error service generateAccessToken - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
