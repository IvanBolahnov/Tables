import {
	BadRequestException,
	ConflictException,
	Injectable
} from "@nestjs/common"
import { Group, Prisma, Table, User, UserOnGroup } from "@prisma/client"
import { isAlpha, minLength } from "class-validator"
import { PrismaService } from "src/prisma.service"
import { UserDto } from "src/user/user.dto"

@Injectable()
export class GroupService {
	constructor(private readonly prisma: PrismaService) {}

	create = async (
		data: Prisma.GroupCreateInput,
		user: UserDto
	): Promise<Group> => {
		const { title } = data
		const slug = data.slug.toLowerCase()

		if (!minLength(title, 3)) {
			throw new BadRequestException({
				statusCode: 400,
				message: "Title cannot be less then 3 characters"
			})
		}

		if (!minLength(slug, 3)) {
			throw new BadRequestException({
				statusCode: 400,
				message: "Slug cannot be less then 3 characters"
			})
		}

		if (!isAlpha(slug)) {
			throw new BadRequestException({
				statusCode: 400,
				message: "Slug must consist only of Latin characters (a-z)"
			})
		}

		const groupByTitle = await this.prisma.group.findUnique({
			where: { title }
		})

		if (groupByTitle) {
			throw new ConflictException({
				statusCode: 409,
				message: "This title is already in use"
			})
		}

		const groupBySlug = await this.prisma.group.findUnique({ where: { slug } })

		if (groupBySlug) {
			throw new ConflictException({
				statusCode: 409,
				message: "This slug is already in use"
			})
		}

		data.users = { create: { userId: user.id, userRole: "Admin" } }
		return await this.prisma.group.create({ data })
	}

	delete = async (groupId: number): Promise<Group> => {
		await this.prisma.task.deleteMany({
			where: { table: { groupId } }
		})
		await this.prisma.table.deleteMany({ where: { groupId } })
		await this.prisma.userOnGroup.deleteMany({
			where: { groupId }
		})

		return await this.prisma.group.delete({ where: { id: groupId } })
	}

	get = async (groupId: number): Promise<Group> => {
		return await this.prisma.group.findUnique({ where: { id: groupId } })
	}

	getIdBySlug = async (groupSlug: string): Promise<Group> => {
		return await this.prisma.group.findUnique({ where: { slug: groupSlug } })
	}

	getTables = async (groupId: number): Promise<Table[]> => {
		return await this.prisma.table.findMany({ where: { groupId } })
	}

	getUsers = async (groupId: number): Promise<UserOnGroup[]> => {
		return await this.prisma.userOnGroup.findMany({
			where: {
				groupId
			},
			include: {
				user: true
			}
		})
	}
}
