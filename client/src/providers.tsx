import { FC } from "react"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Notifications from "./components/organisms/notifications"

type ProvidersProps = {
	children: JSX.Element
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<Provider store={store()}>
				<BrowserRouter>{children}</BrowserRouter>
				<Notifications></Notifications>
			</Provider>
		</>
	)
}

export default Providers
