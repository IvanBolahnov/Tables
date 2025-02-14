import { FC, forwardRef } from "react"
import styles from "./index.module.css"
import classNames from "classnames"

type InputProps = {
	children?: React.ReactNode
} & React.HTMLProps<HTMLInputElement>

const Input: FC<InputProps> = forwardRef(
	({ children, className, ...props }, ref) => {
		return (
			<label className={styles.input__wrapper}>
				<div className={styles.input__left_icon}>{children}</div>
				<input
					ref={ref}
					className={classNames(styles.input, className)}
					{...props}
				></input>
			</label>
		)
	}
)

export default Input
