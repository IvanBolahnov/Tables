import { FC } from "react"
import Footer from "../../organisms/footer"
import Header from "../../organisms/header"
import Notifications from "../../organisms/notifications"
import styles from "./index.module.css"

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
