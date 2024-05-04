import { Body, Controller, HttpCode, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import { MessageCreateDto } from "./dto/userCreate.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly service: UserService) {}

    @Post("new-message/:id")
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() message: MessageCreateDto, @Param("id") id: number) {
        this.logger.log("Start method save");
        return await this.service.saveMessage(message, id);
    }
}
