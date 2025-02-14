import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import GroupsContent from "../../organisms/sectionsContent/groups"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import NotAuth from "../../organisms/sectionsContent/notAuth"

const GroupsPage: FC = () => {
	const { isAuth } = useSelector((state: RootState) => state.user)

	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.groups_section}>
					{isAuth ? (
						<GroupsContent />
					) : (
						<NotAuth message={"Групппы недоступны"} />
					)}
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default GroupsPage
