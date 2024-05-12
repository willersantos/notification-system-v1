import { Module } from "@nestjs/common";
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { NotificationEntity } from "./entity/notifcation.entity";
import { NotificationRepository } from "./notification.repository";
import { NotificationService } from "./notification.service";

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    providers: [
        {
            provide: getRepositoryToken(NotificationEntity),
            inject: [getDataSourceToken()],
            useFactory(dataSource: DataSource) {
                return dataSource.getRepository(NotificationEntity).extend(NotificationRepository);
            }
        },
        NotificationService
    ],
    exports: [NotificationService]
})
export class NotificationModule {}
