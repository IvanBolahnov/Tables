import { FC } from "react"
import styles from "./index.module.css"
import classNames from "classnames"
import { Link, LinkProps } from "react-router"

type ButtonProps = {
	children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
	return (
		<button className={classNames(styles.button, className)} {...props}>
			{children}
		</button>
	)
}

export default Button

export const ButtonStyledLink: FC<LinkProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<Link className={classNames(styles.button, className)} {...props}>
			{children}
		</Link>
	)
}
