import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards
} from "@nestjs/common"
import { TableService } from "./table.service"
import { Roles } from "src/auth/roles.decorator"
import { AuthGuard } from "src/auth/auth.guard"
import { Prisma, Table, Task } from "@prisma/client"
import { RolesByTableGuard } from "./roleByTable.guard"
import { RequiredBody } from "src/decorators/requiredBody.decorator"
import { StrictBodyGuard } from "src/guards/strictRequiredBody.guard"
import { RolesByBodyGroupGuard } from "./roleByBodyGroup.guard"

@Controller("table")
export class TableController {
	constructor(private readonly tableService: TableService) {}

	@Post()
	@RequiredBody(["title", "groupId"])
	@Roles("Admin")
	@UseGuards(AuthGuard, RolesByBodyGroupGuard, StrictBodyGuard)
	async create(@Body() data: Prisma.TableUncheckedCreateInput): Promise<Table> {
		return await this.tableService.create(data)
	}

	@Delete(":tableId")
	@Roles("Admin")
	@UseGuards(AuthGuard, RolesByTableGuard)
	async delete(@Param("tableId") tableId: string): Promise<Table> {
		return await this.tableService.delete(Number(tableId))
	}

	@Get(":tableId")
	@Roles("Admin", "Moderator", "User")
	@UseGuards(AuthGuard, RolesByTableGuard)
	async get(@Param("tableId") tableId: string): Promise<Table> {
		return await this.tableService.get(Number(tableId))
	}

	@Get(":tableId/tasks")
	@Roles("Admin", "Moderator", "User")
	@UseGuards(AuthGuard, RolesByTableGuard)
	async getTasks(@Param("tableId") tableId: string): Promise<Task[]> {
		return await this.tableService.getTasks(Number(tableId))
	}
}
