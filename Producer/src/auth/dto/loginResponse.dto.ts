import { UserDto } from "@/user/dto/user.dto";

export interface LoginResponseDto {
    user: UserDto;
    accessToken: string;
}
