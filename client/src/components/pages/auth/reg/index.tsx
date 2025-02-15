import { FC } from "react"
import BackgroundLayout from "../../../layouts/background"
import PageLayout from "../../../layouts/page"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import RegForm from "../../../organisms/forms/reg"
import styles from "./index.module.css"

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
