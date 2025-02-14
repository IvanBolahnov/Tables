import styles from "./index.module.css"
import { FC } from "react"
import Header from "../../organisms/header"
import Footer from "../../organisms/footer"
import Notifications from "../../organisms/notifications"

type PageLayoutProps = {
	noHeader?: boolean
	noFooter?: boolean
	children: JSX.Element
} & React.HTMLProps<HTMLDivElement>

const PageLayout: FC<PageLayoutProps> = ({
	children,
	noHeader,
	noFooter,
	...props
}) => {
	return (
		<>
			{!noHeader && <Header />}
			<main {...props} className={styles.main}>
				{children}
			</main>
			{!noFooter && <Footer />}
		</>
	)
}

export default PageLayout
