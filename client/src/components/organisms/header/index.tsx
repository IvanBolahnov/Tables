import { FC } from "react"
import { Link } from "react-router"
import styles from "./index.module.css"
import logo from "/logo.svg"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { HeaderGuestNav, HeaderUserNav } from "./headerNav"

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
