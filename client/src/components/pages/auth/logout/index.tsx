import { FC } from "react"
import BackgroundLayout from "../../../layouts/background"
import PageLayout from "../../../layouts/page"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import LogoutForm from "../../../organisms/forms/logout"
import styles from "./index.module.css"

const LogoutPage: FC = () => {
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.auth_section}>
					<LogoutForm />
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default LogoutPage
