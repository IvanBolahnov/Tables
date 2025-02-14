import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import ProfileContent from "../../organisms/sectionsContent/profile"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import NotAuth from "../../organisms/sectionsContent/notAuth"

const ProfilePage: FC = () => {
	const { isAuth } = useSelector((state: RootState) => state.user)

	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.profile_section}>
					{isAuth ? (
						<ProfileContent />
					) : (
						<NotAuth message='Профиль недоступен' />
					)}
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default ProfilePage
