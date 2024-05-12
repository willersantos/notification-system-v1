import { Controller, Get, HttpCode, HttpStatus, Logger, Param } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
    private readonly logger = new Logger(NotificationController.name);
    constructor(private readonly service: NotificationService) {}

    @Get("by-id/:userId")
    @HttpCode(HttpStatus.OK)
    async getByUserId(@Param("userId") userId: number) {
        this.logger.log("Start method getByUserId");
        return await this.service.getByUserId(userId);
    }
}
