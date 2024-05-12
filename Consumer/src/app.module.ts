import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import "dotenv/config";
import { resolve } from "path";
import { AuthModule } from "./auth/auth.module";
import { NotificationModule } from "./notification/notification.module";
import appConfig from "./shared/config/app.config";
import authConfig from "./shared/config/auth.config";
import urlConfig from "./shared/config/url.config";
import { DatabaseConfigOptions } from "./shared/database/database";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";
config({ path: resolve(__dirname, `../.env.${process.env.NODE_ENV}`) });

const InternModules = [AuthModule, NotificationModule, TokenModule, UserModule];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, authConfig, urlConfig],
            envFilePath: [`.env.${process.env.NODE_ENV}`]
        }),
        ...InternModules,
        TypeOrmModule.forRoot(DatabaseConfigOptions)
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
