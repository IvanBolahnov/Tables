import classNames from "classnames"
import { FC } from "react"
import styles from "./index.module.css"

type SectionLayoutProps = {
	children: JSX.Element
} & React.HTMLProps<HTMLDivElement>

const SectionLayout: FC<SectionLayoutProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<>
			<section {...props} className={classNames(styles.section, className)}>
				{children}
			</section>
		</>
	)
}

export default SectionLayout
