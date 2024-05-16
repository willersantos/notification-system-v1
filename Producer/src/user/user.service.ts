import { ProducerService } from "@/producer/producer.service";
import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AllUserDto } from "./dto/allUser.dto";
import { UserDto } from "./dto/user.dto";
import { MessageCreateDto } from "./dto/userCreate.dto";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./user.repository";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: IUserRepository,
        private readonly producerService: ProducerService
    ) {}

    public async getByEmailAndUsername(email: string, username: string): Promise<UserDto | null> {
        try {
            this.logger.log(`Start service getByEmailAndUsername - Request - ${JSON.stringify({ email, username })}`);

            const { emails, usernames } = await this.getAllEmailsAndUsernames();

            if (emails.includes(email.toLowerCase()) && (await this.matchUsername(username, usernames))) {
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

    public async saveMessage(message: MessageCreateDto, id: number): Promise<void> {
        try {
            this.logger.log(`Start service saveMessage - Request - ${JSON.stringify({ message, id })}`);
            const user = await this.repository.findById(id);
            if (!user) {
                throw new HttpException("User not found by id", HttpStatus.NOT_FOUND);
            }

            await this.producerService.sendMessage(message, id);

            this.logger.log(`End service saveMessage`);
        } catch (error) {
            this.logger.error(`Error service saveOrUpdate - Error - ${JSON.stringify(error)}`);
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

    private async matchUsername(searchedUsername: string, usernames: string[]): Promise<boolean> {
        try {
            this.logger.log(
                `Start service matchUsername - Request - ${JSON.stringify({ searchedUsername, usernames })}`
            );
            const searchUsernameChars = searchedUsername.toLowerCase().replace(/ /g, "");
            const response = usernames.some((username) => {
                const usernameChars = username.toLowerCase().replace(/ /g, "");
                return Array.from(searchUsernameChars).every((char) => usernameChars.includes(char));
            });
            this.logger.log(`End service matchUsername - Response - ${JSON.stringify({ response })}`);

            return response;
        } catch (error) {
            this.logger.error(`Error service matchUsername - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
