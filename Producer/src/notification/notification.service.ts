import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "./entity/notifcation.entity";
import { INotificationRepository } from "./notification.repository";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        @InjectRepository(NotificationEntity)
        private readonly repository: INotificationRepository
    ) {}
}
