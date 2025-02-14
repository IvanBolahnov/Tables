import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Notification = {
	id: number
	type: "success" | "error" | "regular"
	message: string
}

export type UiStateType = {
	notifications: Notification[]
}

const initialState: UiStateType = {
	notifications: [
		{
			id: 1,
			type: "regular",
			message: "string"
		}
	]
}

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<Notification>) => {
			state.notifications = [...state.notifications, action.payload]
		},

		deleteNotification: (state, action: PayloadAction<number>) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			)
		}
	}
})

export default uiSlice.reducer
