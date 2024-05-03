import { PreAuthorized } from "@/shared/helpers/decorators/preAuthorized.decorator";
import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/loginRequest.dto";
import { LoginResponseDto } from "./dto/loginResponse.dto";

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @PreAuthorized()
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        this.logger.log("Start method login");
        return await this.authService.login(loginDto);
    }
}
