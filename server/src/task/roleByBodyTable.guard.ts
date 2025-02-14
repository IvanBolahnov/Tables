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
export class RolesByBodyTableGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const roles = this.reflector.get<userRole[]>("roles", context.getHandler())

		const user: UserDto = request["user"]
		const tableId = Number(request.body.tableId)

		if (!tableId) {
			throw new NotFoundException({
				statusCode: 404,
				message: "Table not found"
			})
		}

		// const userOnGroup = await this.prisma.userOnGroup.findFirst({
		// 	where: {
		// 		userId: user.id,
		// 		group: { tables: { every: { id: tableId } } }
		// 	}
		// })

		const userOnGroup = await this.prisma.userOnGroup.findFirst({
			where: {
				userId: user.id,
				group: { tables: { some: { id: tableId } } }
			}
		})

		if (!userOnGroup) {
			throw new NotFoundException({
				statusCode: 404,
				message: "table not found"
			})
		}

		if (roles.find((elem) => elem == userOnGroup.userRole)) {
			return true
		}

		return false
	}
}
