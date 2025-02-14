import { axiosClassic } from ".."
import { ApiResponse } from "../type"

export type AccessTokenPayload = {
	name: string
	email: string
	imgUrl: string
	sub: number
}

type Reg = {
	name: string
	email: string
	password: string
}

type Login = {
	email: string
	password: string
}

class AuthApi {
	private baseUrl = "/auth"

	async reg(data: Reg): Promise<ApiResponse<{ accessToken: string }>> {
		const url = this.baseUrl + "/reg"

		console.log(data)

		try {
			const response = await axiosClassic.post(url, data)
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

	async login(data: Login): Promise<ApiResponse<{ accessToken: string }>> {
		const url = this.baseUrl + "/login"

		try {
			const response = await axiosClassic.post(url, data)
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
	async refresh(): Promise<ApiResponse<{ accessToken: string }>> {
		const url = this.baseUrl + "/refresh"
		try {
			const response = await axiosClassic.post(url)
			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error.response.data
			}
		}
	}
	async logout(): Promise<ApiResponse<string>> {
		const url = this.baseUrl + "/logout"
		try {
			const response = await axiosClassic.post(url)
			return {
				data: response.data,
				error: null
			}
		} catch (error: any) {
			return {
				data: null,
				error: error.response.data
			}
		}
	}
}

export const authApi = new AuthApi()
