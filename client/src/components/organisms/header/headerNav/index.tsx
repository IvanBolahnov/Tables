import { FC } from "react"
import { Link } from "react-router"
import styles from "./index.module.css"

const HeaderGuestNav: FC = () => {
	return (
		<nav className={styles.header__nav}>
			<Link to={"/auth/reg"}>Зарегистрироваться</Link>
			<Link to={"/auth"}>Войти</Link>
		</nav>
	)
}

const HeaderUserNav: FC = () => {
	return (
		<nav className={styles.header__nav}>
			<Link to={"/auth/logout"}>Выйти из профиля</Link>
			<Link to={"/profile"}>Профиль</Link>
			<Link to={"/groups"}>Группы</Link>
			<Link to={"/tables"}>Таблицы</Link>
		</nav>
	)
}

export { HeaderGuestNav, HeaderUserNav }
