import { AppService } from "@/app.service";
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PreAuthorized } from "./shared/helpers/decorators/preAuthorized.decorator";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @PreAuthorized()
    @HttpCode(HttpStatus.OK)
    async getServer(): Promise<string> {
        return await this.appService.serverIsRunning();
    }
}
