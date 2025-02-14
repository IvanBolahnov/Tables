import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"

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
