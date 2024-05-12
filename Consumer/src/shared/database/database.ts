import "dotenv/config";
import { resolve } from "path";

import { config } from "dotenv";
config({ path: resolve(__dirname, `../../../.env.${process.env.NODE_ENV}`) });

import { DataSource, DataSourceOptions } from "typeorm";

export const DatabaseConfigOptions: DataSourceOptions = {
    type: "postgres",
    cache: false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ["dist/shared/database/migrations/*.{js,ts}"],
    synchronize: false,
    entities: ["dist/**/*.entity.{js,ts}"]
};

export default new DataSource(DatabaseConfigOptions);
