import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import BackgroundLayout from "../../../layouts/background"
import PageLayout from "../../../layouts/page"
import SectionWrapperLayout from "../../../layouts/section/sectionWrapper"
import CreateGroupForm from "../../../organisms/forms/create/group"
import NotAuth from "../../../organisms/sectionsContent/notAuth"
import styles from "./index.module.css"

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
