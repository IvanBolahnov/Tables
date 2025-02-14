import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../../layouts/page"
import BackgroundLayout from "../../../layouts/background"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import AuthForm from "../../../organisms/forms/auth"

const AuthPage: FC = () => {
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.auth_section}>
					<AuthForm />
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default AuthPage
