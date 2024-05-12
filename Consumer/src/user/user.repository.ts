import { Repository } from "typeorm";
import { UserMinifyDto } from "./dto/userMinify.dto";
import { UserEntity } from "./entity/user.entity";

export interface IUserRepository extends Omit<Repository<UserEntity>, "update"> {
    this: Repository<UserEntity>;

    findById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findEmailAndUsername(): Promise<UserMinifyDto[]>;
}

export const UserRepository: Pick<IUserRepository, "findById" | "findByEmail" | "findEmailAndUsername"> = {
    async findById(this: Repository<UserEntity>, id: number) {
        return await this.findOneBy({ id });
    },
    async findByEmail(this: Repository<UserEntity>, email: string) {
        return await this.findOneBy({ email });
    },
    async findEmailAndUsername(this: Repository<UserEntity>): Promise<UserMinifyDto[]> {
        return await this.createQueryBuilder().where({ isActive: true }).select(["fullname", "email"]).execute();
    }
};
