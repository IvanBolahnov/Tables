import { Injectable } from "@nestjs/common"
import { Prisma, Table, Task } from "@prisma/client"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class TableService {
	constructor(private readonly prisma: PrismaService) {}

	create = async (data: Prisma.TableUncheckedCreateInput): Promise<Table> => {
		return await this.prisma.table.create({ data })
	}

	delete = async (tableId: number): Promise<Table> => {
		return await this.prisma.table.delete({ where: { id: tableId } })
	}

	get = async (tableId: number): Promise<Table> => {
		return await this.prisma.table.findUnique({ where: { id: tableId } })
	}

	getTasks = async (tableId: number): Promise<Task[]> => {
		return await this.prisma.task.findMany({ where: { tableId } })
	}
}
