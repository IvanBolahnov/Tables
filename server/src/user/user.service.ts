import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma, Table, User } from "@prisma/client"
import { PrismaService } from "src/prisma.service"
import { UserDto } from "./user.dto"
import { UserOnGroupWithGroups } from "./user.types"

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	get = async (data: Prisma.UserWhereUniqueInput): Promise<UserDto> => {
		const user = await this.prisma.user.findUnique({
			omit: { password: true },
			where: data
		})

		if (!user) {
			throw new NotFoundException({
				statusCode: 404,
				message: "User not found"
			})
		}

		return user
	}

	delete = async (userId): Promise<User> => {
		return await this.prisma.user.delete({
			where: { id: userId }
		})
	}

	getGroups = async (userId): Promise<UserOnGroupWithGroups[]> => {
		return await this.prisma.userOnGroup.findMany({
			where: { userId },
			include: { group: true }
		})
	}

	getTables = async (userId): Promise<Table[]> => {
		return await this.prisma.table.findMany({
			where: { group: { users: { some: { userId } } } }
		})
	}
}
