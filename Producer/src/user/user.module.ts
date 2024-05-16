import { ProducerModule } from "@/producer/producer.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ProducerModule],
    controllers: [UserController],
    providers: [
        {
            provide: getRepositoryToken(UserEntity),
            inject: [getDataSourceToken()],
            useFactory(dataSource: DataSource) {
                return dataSource.getRepository(UserEntity).extend(UserRepository);
            }
        },
        UserService
    ],
    exports: [UserService]
})
export class UserModule {}
