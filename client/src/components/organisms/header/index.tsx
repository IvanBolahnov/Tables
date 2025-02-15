import { FC } from "react"
import logo from "/logo.svg"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { RootState } from "../../../store/store"
import { HeaderGuestNav, HeaderUserNav } from "./headerNav"
import styles from "./index.module.css"

const Header: FC = () => {
	const { isAuth } = useSelector((state: RootState) => state.user)
	return (
		<header className={styles.header}>
			<div className={styles.header__wrapper}>
				<Link to='/' className={styles.header__logo}>
					<img src={logo} alt='logo' width={40} height={40} />
				</Link>
				{isAuth ? <HeaderUserNav /> : <HeaderGuestNav />}
			</div>
		</header>
	)
}

export default Header
