import styles from "./index.module.css"
import { FC } from "react"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { jwtDecode } from "jwt-decode"

const TestPage: FC = () => {
	const { ...user } = useSelector((state: RootState) => state.user)

	console.log("User info")
	console.table(user)

	console.log("access token info")
	user.accessToken
		? console.table(jwtDecode(user.accessToken))
		: console.error("token not found")
	console.table(localStorage)

	console.log("refresh token info")
	console.table(
		jwtDecode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODg5NzAyNywiZXhwIjoxNzQ2NjczMDI3fQ.DBlcC5M7hfKtKimrQvd4SFzwk8FVZQQJ_0hBBfZXPc8"
		)
	)

	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout className={styles.profile_section}>
					<></>
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default TestPage
