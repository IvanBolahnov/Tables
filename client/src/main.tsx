import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Providers from "./providers.tsx"
import App from "./App.tsx"
import "./index.css"
import "./const.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
)
