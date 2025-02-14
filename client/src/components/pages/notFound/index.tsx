import styles from "./index.module.css"
import { FC } from "react"
import { Link } from "react-router"
import PageLayout from "../../layouts/page"
import BackgroundLayout from "../../layouts/background"
import SectionWrapperLayout from "../../layouts/section/sectionWrapper"
import classNames from "classnames"

const NotFoundPage: FC = () => {
	return (
		<PageLayout noFooter>
			<BackgroundLayout>
				<SectionWrapperLayout>
					<div className={styles.notFound}>
						<div className={styles.notFound__header}>
							<h2 className={styles.notFound__title}>Страница не найдена</h2>
						</div>
						<Link to={"/"}>Вернуться на главную</Link>
						<p className={classNames(styles.notFound__code, "_subtitle")}>
							404
						</p>
					</div>
				</SectionWrapperLayout>
			</BackgroundLayout>
		</PageLayout>
	)
}

export default NotFoundPage
