import { Prisma } from "@prisma/client"

export type UserOnGroupWithGroups = Prisma.UserOnGroupGetPayload<{
	include: { group: true }
}>
