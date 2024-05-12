import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AllUserDto } from "./dto/allUser.dto";
import { UserDto } from "./dto/user.dto";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./user.repository";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: IUserRepository
    ) {}

    public async getByEmailAndUsername(email: string, username: string): Promise<UserDto | null> {
        try {
            this.logger.log(`Start service getByEmailAndUsername - Request - ${JSON.stringify({ email, username })}`);

            const { emails, usernames } = await this.getAllEmailsAndUsernames();

            if (emails.includes(email.toLowerCase()) && usernames.includes(username.toLowerCase())) {
                const user = await this.repository.findByEmail(email);

                const response = {
                    id: user.id,
                    email,
                    username: user.fullname
                };
                this.logger.log(`End service getByEmailAndUsername - Response ${JSON.stringify(response)}`);

                return response;
            }

            this.logger.log(`End service getByEmailAndUsername - Response - ${JSON.stringify(null)}`);

            return null;
        } catch (error) {
            this.logger.error(`Error service getByEmailAndUsername - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }

    private async getAllEmailsAndUsernames(): Promise<AllUserDto> {
        try {
            this.logger.log("Start service getAllEmailsAndUsernames");
            const emailsAndNames = await this.repository.findEmailAndUsername();
            const emails = emailsAndNames.map(({ email }) => email.toLowerCase());
            const usernames = emailsAndNames.map(({ fullname }) => fullname.toLowerCase());
            this.logger.log(
                `End service getAllEmailsAndUsernames - Response - ${JSON.stringify({ emails, usernames })}`
            );
            return { emails, usernames };
        } catch (error) {
            this.logger.error(`Error service getAllEmailsAndUsernames - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
