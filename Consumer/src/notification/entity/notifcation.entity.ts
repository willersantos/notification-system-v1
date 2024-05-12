import { NotificationStatusEnum } from "@/shared/enum/notificationStatus.enum";
import { BaseEntity } from "@/shared/helpers/baseEntity";
import { UserEntity } from "@/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "notification" })
export class NotificationEntity extends BaseEntity {
    @Column({ name: "title", type: "char", length: 255 })
    title: string;

    @Column({ name: "content", type: "varchar" })
    content: string;

    @Column({ name: "status", type: "enum", enumName: "notificationStatusEnum", enum: NotificationStatusEnum })
    status: NotificationStatusEnum;

    @Column({ name: "user_id" })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    @JoinColumn({ name: "user_id", foreignKeyConstraintName: "user_id_fk" })
    user: UserEntity;
}
