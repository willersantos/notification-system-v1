import { HandleHttpError } from "@/shared/helpers/utils/handleError";
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

    public async getByUserId(userId: number): Promise<NotificationEntity[]> {
        try {
            this.logger.log(`Start service getByUserId - Request - ${JSON.stringify({ userId })}`);
            const response = await this.repository.findByUserId(userId);
            this.logger.log(`End service getByUserId - Response - ${JSON.stringify(response)}`);
            return response;
        } catch (error) {
            this.logger.error(`Error service getByUserId - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
