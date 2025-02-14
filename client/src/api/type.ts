export type ApiResponse<T> =
	| {
			data: T
			error: null
	  }
	| {
			data: null
			error: any
	  }

export type UserRole = "User" | "Moderator" | "Admin" | "Applicant"

export type User = {
	id: number
	name: string
	email: string
	imgUrl: string
}

export type Group = {
	id: number
	title: string
	imgUrl: string
	slug: string
}

export type UserOnGroupWithGroups = {
	groupId: number
	userId: number
	userRole: UserRole
	group: Group
}

export type UserOnGroupWithUser = {
	groupId: number
	userId: number
	userRole: UserRole
	user: User
}

export type Table = {
	id: number
	title: string
	imgUrl: string
	groupId: number
}
