import { FC } from "react"
import styles from "./index.module.css"
import classNames from "classnames"

type SectionWrapperLayoutProps = {
	children: JSX.Element
} & React.HTMLProps<HTMLDivElement>

const SectionWrapperLayout: FC<SectionWrapperLayoutProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<>
			<div
				{...props}
				className={classNames(styles.section__wrapper, className)}
			>
				{children}
			</div>
		</>
	)
}

export default SectionWrapperLayout
