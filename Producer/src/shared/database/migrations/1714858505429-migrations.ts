import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714858505429 implements MigrationInterface {
    name = "Migrations1714858505429";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notificationStatusEnum" AS ENUM('Enviado', 'Pendente', 'Erro')`);
        await queryRunner.query(
            `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "title" character(255) NOT NULL, "content" character varying NOT NULL, "status" "public"."notificationStatusEnum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TYPE "public"."notificationTypeOptOutEnum" AS ENUM('Web', 'SMS', 'Push notification', 'E-mail')`
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL, "email" character(100) NOT NULL, "phone_number" character(50) NOT NULL, "fullname" character(255) NOT NULL, "notification_type_opt_out" "public"."notificationTypeOptOutEnum" array NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "notification" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "user_id_fk"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."notificationTypeOptOutEnum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notificationStatusEnum"`);
    }
}
