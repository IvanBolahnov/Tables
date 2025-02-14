import axios, { AxiosError, CreateAxiosDefaults } from "axios"
import { API_URL } from "../consts"
import { authApi } from "./auth"

const getAccessToken = (): string | null => {
	const accessToken = localStorage.getItem("accessToken")

	return accessToken
}

const setAccessToken = (accessToken: string): void => {
	localStorage.setItem("accessToken", accessToken)
}

const removeAccessToken = (): void => {
	localStorage.removeItem("accessToken")
}

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	(config) => config,

	async (error) => {
		const originalRequest = error.config
		if (
			error?.response?.data.message === "Token has expired" &&
			error?.response?.status === 401
		) {
			try {
				const accessTokenResponse = await authApi.refresh()
				if (accessTokenResponse?.data) {
					setAccessToken(accessTokenResponse.data.accessToken)
				}
				return axiosWithAuth.request(originalRequest)
			} catch (error: any) {
				if (
					error?.response?.data.message === "Token has expired" &&
					error?.response?.status === 401
				) {
					removeAccessToken()
				}
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
