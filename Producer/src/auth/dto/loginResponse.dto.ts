import { UserLoginDto } from "@/baseAuth/user/dto/userLogin.dto";

export interface LoginResponseDto {
    user: UserLoginDto;
    accessToken: string;
}
