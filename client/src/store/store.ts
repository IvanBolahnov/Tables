import { combineReducers, configureStore } from "@reduxjs/toolkit"
import uiSlice from "./ui/ui.slice"
import userSlice from "./user/user.slice"

const rootReducer = combineReducers({
	user: userSlice,
	ui: uiSlice
})

export const store = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
