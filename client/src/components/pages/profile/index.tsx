import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import NotAuth from "../../organisms/sectionsContent/notAuth"
import ProfileContent from "../../organisms/sectionsContent/profile"
import styles from "./index.module.css"

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
