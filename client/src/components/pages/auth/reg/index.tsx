import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../../layouts/page"
import BackgroundLayout from "../../../layouts/background"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import RegForm from "../../../organisms/forms/reg"

const RegPage: FC = () => {
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.auth_section}>
					<RegForm />
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default RegPage
