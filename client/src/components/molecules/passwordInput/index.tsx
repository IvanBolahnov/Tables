import styles from "./index.module.css"
import { FC, forwardRef, useState } from "react"
import classNames from "classnames"
import Button from "../button"
import OpenEyeIcon from "/src/assets/icons/eye.svg?react"
import CloseEyeIcon from "/src/assets/icons/eyeClose.svg?react"

type InputProps = {
	children?: React.ReactNode
} & React.HTMLProps<HTMLInputElement>

const PasswordInput: FC<InputProps> = forwardRef(
	({ children, className, ...props }, ref) => {
		const [isHide, setIsHide] = useState<boolean>(true)

		return (
			<label className={classNames(styles.input__wrapper)}>
				{children}
				<input
					ref={ref}
					type={isHide ? "password" : "text"}
					className={classNames(styles.input, className)}
					{...props}
				></input>
				<Button
					className={styles.input__hide_button}
					type={"button"}
					onClick={() => {
						setIsHide((state) => !state)
					}}
				>
					{isHide ? <CloseEyeIcon /> : <OpenEyeIcon />}
				</Button>
			</label>
		)
	}
)

export default PasswordInput
