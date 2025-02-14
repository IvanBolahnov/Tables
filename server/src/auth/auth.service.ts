import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { isEmail, minLength } from "class-validator"
import { PrismaService } from "src/prisma.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { TokensDto } from "./tokens.dto"

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService
	) {}

	reg = async (data: Prisma.UserCreateInput): Promise<TokensDto> => {
		const { email, password, name } = data

		const user = await this.prisma.user.findUnique({ where: { email } })

		if (user) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "This Email is already in use"
			})
		}

		if (!isEmail(email)) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Invalid email"
			})
		}

		if (!minLength(password, 6)) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Password cannot be less then 6 characters"
			})
		}

		if (!minLength(name, 2)) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Name cannot be less then 2 characters"
			})
		}

		const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS))

		const hashPassword = await bcrypt.hash(password, salt)

		data.password = hashPassword

		const newUser = await this.prisma.user.create({ data })

		return await this.generateTokens(newUser)
	}

	login = async (data: {
		email: User["email"]
		password: User["password"]
	}): Promise<TokensDto> => {
		const { email, password } = data

		const user = await this.prisma.user.findUnique({ where: { email } })

		if (!user) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "User not found"
			})
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Invalid password"
			})
		}

		return await this.generateTokens(user)
	}

	refresh = async (
		refreshToken: TokensDto["refreshToken"]
	): Promise<TokensDto> => {
		if (!refreshToken) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Token not found"
			})
		}

		const payload = await this.jwtService.decode(refreshToken)

		if (!payload) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Invalid token"
			})
		}

		try {
			await this.jwtService.verifyAsync(refreshToken, {
				secret: process.env.JWT_SECRET_KEY
			})
		} catch (error) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: "Token has expired"
			})
		}

		const user = await this.prisma.user.findUnique({
			where: { id: payload.sub }
		})

		if (!user) {
			throw new NotFoundException({
				statusCode: 404,
				message: "User not found"
			})
		}

		return this.generateTokens(user)
	}

	private async generateTokens(user: User): Promise<TokensDto> {
		const accessTokenPayload = {
			name: user.name,
			email: user.email,
			imgUrl: user.imgUrl,
			sub: user.id
		}

		const refreshTokenPayload = {
			sub: user.id
		}

		const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
			secret: process.env.JWT_SECRET_KEY,
			expiresIn: "15m"
		})
		const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
			secret: process.env.JWT_SECRET_KEY,
			expiresIn: "90d"
		})

		return {
			accessToken,
			refreshToken
		}
	}
}
