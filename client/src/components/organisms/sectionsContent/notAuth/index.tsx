import classNames from "classnames"
import { FC } from "react"
import { Link } from "react-router"
import componentStyles from "../../../index.module.css"
import styles from "./index.module.css"

type NotAuthProps = {
	message: string
}

const NotAuth: FC<NotAuthProps> = ({ message }) => {
	return (
		<div className={classNames(styles.notAuth, componentStyles.section_card)}>
			<div className={styles.notAuth__header}>
				<h2 className={styles.notAuth__title}>Пользователь не авторизован</h2>
			</div>
			<p>{message}</p>
			<p>
				Для доступа к контенту <Link to={"/auth"}>Войдите в аккаунт</Link> или{" "}
				<Link to={"/auth/reg"}>Зарегистрируйтесь</Link>
			</p>
			<p className={classNames(styles.notAuth__code, "_subtitle")}>401</p>
		</div>
	)
}

export default NotAuth
