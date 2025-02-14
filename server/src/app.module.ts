import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UserModule } from "./user/user.module"
import { GroupModule } from "./group/group.module"
import { TableModule } from "./table/table.module"
import { TaskModule } from "./task/task.module"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { PrismaService } from "./prisma.service"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "static"),
			serveRoot: "/api/static/"
			// renderPath: "*"
		}),
		ConfigModule.forRoot(),
		UserModule,
		GroupModule,
		TableModule,
		TaskModule,
		AuthModule
	],
	providers: [AppService, PrismaService],
	controllers: [AppController]
})
export class AppModule {}
