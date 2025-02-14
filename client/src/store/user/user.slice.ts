import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import { AccessTokenPayload } from "../../api/auth"

export type UserStateType = {
	isAuth: boolean
	id: number
	name: string
	email: string
	imgUrl: string
	accessToken: string
}

const initialState: UserStateType = {
	isAuth: false,
	id: 0,
	name: "",
	email: "",
	imgUrl: "",
	accessToken: ""
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ token: string }>) => {
			const user: AccessTokenPayload = jwtDecode(action.payload.token)

			state.isAuth = true
			state.id = user.sub
			state.name = user.name
			state.email = user.email
			state.imgUrl = user.imgUrl
			state.accessToken = action.payload.token
			localStorage.setItem("accessToken", action.payload.token)
		},

		logout: (state) => {
			state.isAuth = false
			state.id = 0
			state.name = ""
			state.email = ""
			state.imgUrl = ""
			state.accessToken = ""
			localStorage.removeItem("accessToken")
		}
	}
})

export default userSlice.reducer
