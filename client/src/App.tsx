import { useDispatch } from "react-redux"
import { AccessTokenPayload, authApi } from "./api/auth"
import Router from "./router"
import { userSlice } from "./store/user/user.slice"
import { uiSlice } from "./store/ui/ui.slice"
import { jwtDecode } from "jwt-decode"

function App() {
	const dispatch = useDispatch()
	const { login } = userSlice.actions
	const { addNotification } = uiSlice.actions

	;(async () => {
		const user = await authApi.refresh()
		if (user.data) {
			const { accessToken } = user.data
			dispatch(login({ token: accessToken }))
			const decode: AccessTokenPayload = jwtDecode(accessToken)
			dispatch(
				addNotification({
					id: Date.now(),
					type: "success",
					message: `Вы авторизированы как ${decode.name}`
				})
			)
		}
	})()

	return (
		<>
			<Router />
		</>
	)
}

export default App
