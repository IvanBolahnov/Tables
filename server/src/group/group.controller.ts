import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	UseGuards
} from "@nestjs/common"
import { GroupService } from "./group.service"
import { AuthGuard } from "src/auth/auth.guard"
import {
	Prisma,
	Group,
	Table,
	userRole,
	User,
	UserOnGroup
} from "@prisma/client"
import { Request } from "express"
import { Roles } from "src/auth/roles.decorator"
import { RequiredBody } from "src/decorators/requiredBody.decorator"
import { StrictBodyGuard } from "src/guards/strictRequiredBody.guard"
import { RolesByGroupGuard } from "./roleByGroup.guard"

@Controller("group")
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	@RequiredBody(["title", "slug"])
	@UseGuards(AuthGuard, StrictBodyGuard)
	async create(
		@Body() data: Prisma.GroupCreateInput,
		@Req() request: Request
	): Promise<Group> {
		return this.groupService.create(data, request["user"])
	}

	@Delete(":groupId")
	@Roles("Admin")
	@UseGuards(AuthGuard, RolesByGroupGuard)
	async delete(@Param("groupId") groupId: string): Promise<Group> {
		return this.groupService.delete(Number(groupId))
	}

	@Get(":groupId")
	@UseGuards(AuthGuard)
	async get(@Param("groupId") groupId: string): Promise<Group> {
		return this.groupService.get(Number(groupId))
	}

	@Get("slug/:groupSlug")
	@UseGuards(AuthGuard)
	async getIdBySlug(@Param("groupSlug") groupSlug: string): Promise<Group> {
		return this.groupService.getIdBySlug(groupSlug)
	}

	@Get(":groupId/tables")
	@Roles("Admin", "Moderator", "User")
	@UseGuards(AuthGuard, RolesByGroupGuard)
	async getTables(@Param("groupId") groupId: string): Promise<Table[]> {
		return this.groupService.getTables(Number(groupId))
	}

	@Get(":groupId/users")
	@UseGuards(AuthGuard)
	async getUsers(@Param("groupId") groupId: string): Promise<UserOnGroup[]> {
		return this.groupService.getUsers(Number(groupId))
	}
}
