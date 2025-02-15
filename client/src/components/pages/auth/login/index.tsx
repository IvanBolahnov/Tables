import { FC } from "react"
import BackgroundLayout from "../../../layouts/background"
import PageLayout from "../../../layouts/page"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import AuthForm from "../../../organisms/forms/auth"
import styles from "./index.module.css"

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
