import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards
} from "@nestjs/common"
import { TaskService } from "./task.service"
import { Roles } from "src/auth/roles.decorator"
import { AuthGuard } from "src/auth/auth.guard"
import { RolesByBodyTableGuard } from "./roleByBodyTable.guard"
import { RequiredBody } from "src/decorators/requiredBody.decorator"
import { Prisma, Task } from "@prisma/client"
import { StrictBodyGuard } from "src/guards/strictRequiredBody.guard"
import { RolesByTaskGuard } from "./roleByTask.guard"

@Controller("task")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@RequiredBody(["tableId", "title", "description", "tags"])
	@Roles("Admin", "Moderator")
	@UseGuards(AuthGuard, RolesByBodyTableGuard, StrictBodyGuard)
	async create(@Body() data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
		return await this.taskService.create(data)
	}

	@Delete(":taskId")
	@Roles("Admin", "Moderator")
	@UseGuards(AuthGuard, RolesByTaskGuard)
	async delete(@Param("taskId") taskId: string): Promise<Task> {
		return await this.taskService.delete(Number(taskId))
	}

	@Get(":taskId")
	@Roles("Admin", "Moderator", "User")
	@UseGuards(AuthGuard, RolesByTaskGuard)
	async get(@Param("taskId") taskId: string): Promise<Task> {
		return await this.taskService.get(Number(taskId))
	}
}
