import { AppModule } from "@/app.module";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import "dotenv/config";
import { resolve } from "path";
import { securityConfigInit } from "./shared/config/security.config";
config({ path: resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    process.on("uncaughtException", (error) => {
        console.error("Unhandled Error - Something unexpected occurred.", error);
    });

    securityConfigInit(app);

    app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED }));

    await app.listen(process.env.PORT);
}
bootstrap();
