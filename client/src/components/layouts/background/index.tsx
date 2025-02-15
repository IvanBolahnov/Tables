import classNames from "classnames"
import { FC } from "react"
import SectionLayout from "../section"
import styles from "./index.module.css"

type SectionLayoutProps = {
	children: JSX.Element
} & React.HTMLProps<HTMLDivElement>

const BackgroundLayout: FC<SectionLayoutProps> = ({ children, className }) => {
	return (
		<>
			<SectionLayout
				className={classNames(styles.background, className)}
				onMouseMove={(e) => {
					e.currentTarget.style.setProperty("--mouse-x", e.clientX * 0.5 + "px")
					e.currentTarget.style.setProperty("--mouse-y", e.clientY * 0.5 + "px")
				}}
			>
				{children}
			</SectionLayout>
		</>
	)
}

export default BackgroundLayout
