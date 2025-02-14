import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../../layouts/page"
import BackgroundLayout from "../../../layouts/background"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import LogoutForm from "../../../organisms/forms/logout"

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
