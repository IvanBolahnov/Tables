import { FC } from "react"
import { useParams } from "react-router"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import styles from "./index.module.css"

const TablePage: FC = () => {
	const { tableSlug } = useParams()
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout>
					<h1>Таблица {tableSlug}</h1>
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default TablePage
