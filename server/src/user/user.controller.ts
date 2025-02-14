import { Controller, Get, Delete, Req, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { Request } from "express"
import { AuthGuard } from "src/auth/auth.guard"
import { UserDto } from "./user.dto"
import { Group, Table, User, UserOnGroup } from "@prisma/client"
import { UserOnGroupWithGroups } from "./user.types"

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get()
	async get(@Req() request: Request): Promise<UserDto> {
		return await this.userService.get({ id: request["user"].sub })
	}

	@UseGuards(AuthGuard)
	@Get("groups")
	async getGroups(@Req() request: Request): Promise<UserOnGroupWithGroups[]> {
		return this.userService.getGroups(request["user"].sub)
	}

	@UseGuards(AuthGuard)
	@Get("tables")
	async getTables(@Req() request: Request): Promise<Table[]> {
		return this.userService.getTables(request["user"].sub)
	}

	@UseGuards(AuthGuard)
	@Delete()
	async delete(@Req() request: Request): Promise<User> {
		return this.userService.delete(request["user"].sub)
	}
}
