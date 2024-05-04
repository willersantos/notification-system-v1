import "dotenv/config";
import { resolve } from "path";

import { INestApplication } from "@nestjs/common";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
config({ path: resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

export const securityConfigInit = (app: INestApplication) => {
    // Enable CORS - Define cross-origin headers
    app.enableCors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true
    });

    // Hide X-Powered-By headers
    app.use(helmet());

    // HSTS Configuration - HTTP Strict Transport Security
    if (process.env.NODE_ENV !== "local") {
        app.use(
            helmet.hsts({
                maxAge: 300,
                includeSubDomains: true,
                preload: true
            })
        );
    }

    // Size limit for request body
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
};
