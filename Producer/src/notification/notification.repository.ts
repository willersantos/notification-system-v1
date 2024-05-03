import { NotificationStatusEnum } from "@/shared/enum/notificationStatus.enum";
import { Repository } from "typeorm";
import { NotificationEntity } from "./entity/notifcation.entity";

export interface INotificationRepository extends Omit<Repository<NotificationEntity>, "update"> {
    this: Repository<NotificationEntity>;

    findByUserId(userId: number): Promise<NotificationEntity[]>;
}

export const NotificationRepository: Pick<INotificationRepository, "findByUserId"> = {
    async findByUserId(this: Repository<NotificationEntity>, userId: number) {
        return await this.findBy({ user: { id: userId }, status: NotificationStatusEnum.SENT });
    }
};
