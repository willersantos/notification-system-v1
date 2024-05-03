import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    public serverIsRunning(): string {
        return "Server is running!";
    }
}
