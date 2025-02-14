import { FC } from "react"
import logo from "/logo.svg"
import styles from "./index.module.css"

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<svg
				className={styles.footer__top}
				preserveAspectRatio='none'
				viewBox='0 0 1440 50'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M1440 50H0L1440 0V50Z'></path>
			</svg>
			<div className={styles.footer__wrapper}>
				<img className={styles.footer__logo} src={logo} alt='logo' />
				<h1>Tables</h1>
				<span>Tables</span>
			</div>
		</footer>
	)
}

export default Footer
