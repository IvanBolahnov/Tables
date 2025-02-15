import { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import { groupApi } from "../../../api/group"
import { Group as GroupType } from "../../../api/type"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import Group from "../../organisms/sectionsContent/group"
import NotFoundPage from "../notFound"
import styles from "./index.module.css"

const GroupPage: FC = () => {
	const { groupSlug = "" } = useParams()
	const [group, setGroup] = useState<GroupType | null>()
	const [groupError, setGroupError] = useState<any>()

	useEffect(() => {
		groupApi.getGroupBySlug(groupSlug).then((data) => {
			setGroup(data.data)
			setGroupError(data.error)
		})
	}, [])

	return (
		<>
			{group ? (
				<PageLayout noFooter>
					<BackgroundLayout>
						<SectionWrapperLayout className={styles.groups_section}>
							<Group group={group} />
						</SectionWrapperLayout>
					</BackgroundLayout>
				</PageLayout>
			) : (
				<NotFoundPage />
			)}
		</>
	)
}

export default GroupPage
