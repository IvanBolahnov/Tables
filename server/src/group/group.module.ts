import { Module } from "@nestjs/common"
import { GroupService } from "./group.service"
import { GroupController } from "./group.controller"
import { PrismaService } from "src/prisma.service"

@Module({
	providers: [GroupService, PrismaService],
	controllers: [GroupController]
})
export class GroupModule {}
