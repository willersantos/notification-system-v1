import { NotificationEntity } from "@/notification/entity/notifcation.entity";
import { NotificationTypeOptOutEnum } from "@/shared/enum/notificationTypeOptOut.enum";
import { BaseEntity } from "@/shared/helpers/baseEntity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column({ name: "is_active" })
    isActive: boolean;

    @Column({ unique: true, name: "email", type: "char", length: 100 })
    email: string;

    @Column({ unique: true, name: "phone_number", type: "char", length: 50 })
    phone_number: string;

    @Column({ name: "fullname", type: "char", length: 255 })
    fullname: string;

    @Column("enum", {
        name: "notification_type_opt_out",
        enum: NotificationTypeOptOutEnum,
        enumName: "notificationTypeOptOutEnum",
        array: true
    })
    notificationTypeOptOut: NotificationTypeOptOutEnum[];

    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];
}
