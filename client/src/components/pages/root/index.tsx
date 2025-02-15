import { FC } from "react"
import { Link } from "react-router"
import BackgroundLayout from "../../layouts/background"
import PageLayout from "../../layouts/page"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import styles from "./index.module.css"

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
