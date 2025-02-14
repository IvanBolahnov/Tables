import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice"
import uiSlice from "./ui/ui.slice"

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
