import { PrimaryGeneratedColumn } from "typeorm";

export abstract class ReferenceEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
