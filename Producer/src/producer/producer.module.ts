import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProducerService } from "./producer.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "RABBIT_EXCHANGE_URL",
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBIT_EXCHANGE_URL]
                }
            }
        ])
    ],
    providers: [ProducerService],
    exports: [ProducerService]
})
export class ProducerModule {}
