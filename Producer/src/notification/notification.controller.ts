import { Controller, Logger } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
    private readonly logger = new Logger(NotificationController.name);
    constructor(private readonly service: NotificationService) {}

    // TODO: Precisará estar no Consumer
    // @Get("by-id/:userId")
    // @HttpCode(HttpStatus.OK)
    // async getByUserId(@Param("userId") userId: number) {
    //     this.logger.log("Start method getByUserId");
    //     return await this.service.getByUserId(userId);
    // }
}
