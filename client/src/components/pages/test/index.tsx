import { jwtDecode } from "jwt-decode"
import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import styles from "./index.module.css"

const TestPage: FC = () => {
	const { ...user } = useSelector((state: RootState) => state.user)

	const logJWTInfo = () => {
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
	}

	logJWTInfo()

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
