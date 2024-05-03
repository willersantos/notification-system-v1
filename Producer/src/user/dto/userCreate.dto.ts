import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class MessageCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    scheduleTime: Date;
}
