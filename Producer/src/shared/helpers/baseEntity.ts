import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "create_date" })
    createDate: Date;

    @UpdateDateColumn({ name: "updated_date" })
    updatedDate: Date;
}
