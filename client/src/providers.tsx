import { FC } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import Notifications from "./components/organisms/notifications"
import { store } from "./store/store"

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
