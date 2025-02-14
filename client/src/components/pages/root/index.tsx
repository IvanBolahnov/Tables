import styles from "./index.module.css"
import { FC } from "react"
import { Link } from "react-router"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"

const links: string[] = [
	"/auth",
	"/auth/reg",
	"/auth/logout",
	"/profile",
	"/groups",
	"/test"
]

const RootPage: FC = () => {
	return (
		<PageLayout>
			<BackgroundLayout>
				<SectionWrapperLayout>
					<div>
						<ul style={{ display: "flex", flexDirection: "column" }}>
							{links.map((link) => (
								<Link to={link} key={link}>
									{link}
								</Link>
							))}
						</ul>
					</div>
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default RootPage
