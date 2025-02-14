import { Reflector } from "@nestjs/core"

export const RequiredBody = Reflector.createDecorator<string[]>()
