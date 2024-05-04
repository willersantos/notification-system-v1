import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    public serverIsRunning(): string {
        // TODO: Implement this method
        return "Server is running!";
    }
}
