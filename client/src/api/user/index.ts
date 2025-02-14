import { axiosWithAuth } from ".."
import { ApiResponse, UserOnGroupWithGroups } from "../type"

class UserApi {
	private baseUrl = "/user"

	async getGroups(): Promise<ApiResponse<UserOnGroupWithGroups[]>> {
		const url = this.baseUrl + "/groups"

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

	async getTables(): Promise<ApiResponse<any>> {
		const url = this.baseUrl + "/tables"

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
}

export const userApi = new UserApi()
