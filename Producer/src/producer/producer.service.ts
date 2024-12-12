import { HandleHttpError } from "@/shared/helpers/utils/handleError";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { MessageCreateDto } from "dist/user/dto/userCreate.dto";
import { MessageContract } from "./dto/message.contract";

@Injectable()
export class ProducerService {
    private readonly logger = new Logger(ProducerService.name);

    constructor(@Inject("RABBIT_EXCHANGE_URL") private readonly client: ClientProxy) {}

    public async sendMessage(message: MessageCreateDto, userId: number): Promise<void> {
        try {
            this.logger.log(`Start service sendMessage - Response - ${JSON.stringify({ message, userId })}`);
            const newMessage = new MessageContract();
            newMessage.content = message.content;
            newMessage.title = message.title;
            newMessage.scheduleTime = message.scheduleTime;
            newMessage.userId = userId;

            await this.client.emit("send-message", newMessage);
            this.logger.log("End service sendMessage");
        } catch (error) {
            this.logger.error(`Error service sendMessage - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.return(error);
        }
    }
}
