import { Controller, Get, UseGuards } from "@nestjs/common"
import { AppService } from "./app.service"
import { RequiredBody } from "./decorators/requiredBody.decorator"
import { StrictBodyGuard } from "./guards/strictRequiredBody.guard"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): { message: string } {
		return this.appService.getHello()
	}
}
