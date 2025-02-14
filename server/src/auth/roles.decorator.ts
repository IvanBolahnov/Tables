import { userRole } from "@prisma/client"
import { SetMetadata } from "@nestjs/common"

export const Roles = (...roles: userRole[]) => SetMetadata("roles", roles)
