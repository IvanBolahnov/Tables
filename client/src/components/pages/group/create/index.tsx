import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../../layouts/page"
import BackgroundLayout from "../../../layouts/background"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import NotAuth from "../../../organisms/sectionsContent/notAuth"
import CreateGroupForm from "../../../organisms/forms/create/group"

const CreateGroupPage: FC = () => {
	const { isAuth } = useSelector((state: RootState) => state.user)

	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.create_group_section}>
					{isAuth ? (
						<CreateGroupForm />
					) : (
						<NotAuth message={"Создание группы недоступно"} />
					)}
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default CreateGroupPage
