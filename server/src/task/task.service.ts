import { Injectable } from "@nestjs/common"
import { Prisma, Task } from "@prisma/client"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class TaskService {
	constructor(private readonly prisma: PrismaService) {}

	create = async (data: Prisma.TaskUncheckedCreateInput): Promise<Task> => {
		return await this.prisma.task.create({ data })
	}

	delete = async (taskId: number): Promise<Task> => {
		return await this.prisma.task.delete({ where: { id: taskId } })
	}

	get = async (taskId: number): Promise<Task> => {
		return await this.prisma.task.findUnique({ where: { id: taskId } })
	}
}
