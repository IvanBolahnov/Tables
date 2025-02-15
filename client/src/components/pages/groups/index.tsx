import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import GroupsContent from "../../organisms/sectionsContent/groups"
import NotAuth from "../../organisms/sectionsContent/notAuth"
import styles from "./index.module.css"

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
