import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { RequiredBody } from "src/decorators/requiredBody.decorator"

@Injectable()
export class BodyGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const requiredBody = this.reflector.get(RequiredBody, context.getHandler())
		const body = request.body

		if (!requiredBody || requiredBody.length === 0) {
			return true
		}

		requiredBody.forEach((key) => {
			if (!body[key]) {
				throw new BadRequestException({
					statusCode: 400,
					message: `Missing required body parameter: ${key}`
				})
			}
		})

		return true
	}
}
