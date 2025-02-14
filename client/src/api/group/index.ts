import { axiosWithAuth } from ".."
import { ApiResponse, Group, Table, UserOnGroupWithUser } from "../type"

type Create = {
	title: string
	slug: string
}

class GroupApi {
	private baseUrl = "/group"

	async getGroup(id: number): Promise<ApiResponse<Group>> {
		const url = this.baseUrl + "/" + id

		try {
			const response = await axiosWithAuth.get(url)

			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error?.response?.data
			}
		}
	}

	async getGroupBySlug(slug: string): Promise<ApiResponse<Group>> {
		const url = this.baseUrl + "/slug/" + slug

		try {
			const response = await axiosWithAuth.get(url)

			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error?.response?.data
			}
		}
	}

	async getTables(id: number): Promise<ApiResponse<Table[]>> {
		const url = this.baseUrl + "/" + id + "/tables"

		try {
			const response = await axiosWithAuth.get(url)

			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error?.response?.data
			}
		}
	}

	async getUsers(id: number): Promise<ApiResponse<UserOnGroupWithUser[]>> {
		const url = this.baseUrl + "/" + id + "/users"

		try {
			const response = await axiosWithAuth.get(url)

			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error?.response?.data
			}
		}
	}

	async create(data: Create): Promise<ApiResponse<Group>> {
		const url = this.baseUrl

		try {
			const response = await axiosWithAuth.post(url, data)

			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error?.response?.data
			}
		}
	}
}

export const groupApi = new GroupApi()
