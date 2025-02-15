import { FC } from "react"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import styles from "./index.module.css"

const TablesPage: FC = () => {
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout>
					<h1>Таблицы</h1>
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default TablesPage
