import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { LoginRequestDto } from "./dto/loginRequest.dto";
import { LoginResponseDto } from "./dto/loginResponse.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

    public async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            this.logger.log(`Start service login - Request - ${JSON.stringify(request)}`);

            const user = await this.userService.getByEmailAndUsername(request.email, request.username);

            if (!user) {
                this.logger.error("Error service login - Description - Invalid credentials");
                throw new UnauthorizedException("Invalid credentials");
            }

            const accessToken = await this.tokenService.generateAccessToken(user);

            this.logger.log(`End service login - Request - ${JSON.stringify(user)}`);

            return {
                accessToken,
                user
            };
        } catch (error) {
            this.logger.error(`Error service login - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
