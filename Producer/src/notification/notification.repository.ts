import { Repository } from "typeorm";
import { NotificationEntity } from "./entity/notifcation.entity";

export interface INotificationRepository extends Omit<Repository<NotificationEntity>, "update"> {
    this: Repository<NotificationEntity>;
}

export const NotificationRepository: {} = {};
// export const NotificationRepository: Pick<INotificationRepository, ""> = {
// };
