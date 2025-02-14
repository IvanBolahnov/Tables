import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards
} from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { AuthService } from "./auth.service"
import { TokensDto } from "./tokens.dto"
import { Request, Response } from "express"
import { RequiredBody } from "src/decorators/requiredBody.decorator"
import { StrictBodyGuard } from "src/guards/strictRequiredBody.guard"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("reg")
	@RequiredBody(["email", "name", "password"])
	@UseGuards(StrictBodyGuard)
	async reg(
		@Body()
		data: Prisma.UserCreateInput,
		@Res({ passthrough: true }) response: Response
	): Promise<{ accessToken: TokensDto["accessToken"] }> {
		const tokens = await this.authService.reg(data)

		return this.tokensResponse(response, tokens)
	}

	@Post("login")
	@RequiredBody(["email", "password"])
	@UseGuards(StrictBodyGuard)
	async login(
		@Body() data: { email: User["email"]; password: User["password"] },
		@Res({ passthrough: true }) response: Response
	): Promise<{ accessToken: TokensDto["accessToken"] }> {
		const tokens = await this.authService.login(data)

		return this.tokensResponse(response, tokens)
	}

	@Post("refresh")
	async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	): Promise<{ accessToken: TokensDto["accessToken"] }> {
		const refreshToken = request.cookies["refreshToken"]
		const tokens = await this.authService.refresh(refreshToken)

		return this.tokensResponse(response, tokens)
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("refreshToken", {
			path: "/api/auth/refresh",
			httpOnly: true
		})
		return { message: "Logout successful" }
	}

	private tokensResponse(
		response: Response,
		{ accessToken, refreshToken }: TokensDto
	): { accessToken: TokensDto["accessToken"] } {
		response.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 90, // 90d
			path: "/api/auth/refresh"
		})

		return { accessToken }
	}
}
