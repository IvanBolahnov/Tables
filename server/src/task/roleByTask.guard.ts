import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { PrismaService } from "src/prisma.service"
import { userRole } from "@prisma/client"
import { UserDto } from "src/user/user.dto"

@Injectable()
export class RolesByTaskGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const roles = this.reflector.get<userRole[]>("roles", context.getHandler())

		const user: UserDto = request["user"]
		const taskId = Number(request.params.taskId)

		if (!taskId) {
			throw new NotFoundException({
				statusCode: 404,
				message: "Task not found"
			})
		}

		const userOnGroup = await this.prisma.userOnGroup.findFirst({
			where: {
				group: { tables: { some: { tasks: { some: { id: taskId } } } } },
				userId: user.id
			}
		})

		if (!userOnGroup) {
			throw new NotFoundException({
				statusCode: 404,
				message: "Task not found"
			})
		}

		if (roles.find((elem) => elem == userOnGroup.userRole)) {
			return true
		}

		return false
	}
}
