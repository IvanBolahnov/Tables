import { FC } from "react"
import { Link } from "react-router"
import styles from "./index.module.css"

type AlreadyAuthProps = {
  name: string
}

const AlreadyAuth: FC<AlreadyAuthProps> = ({name}) => {

	return (
    <span className={styles.already_auth}>
      {`Вы авторизираваны как ${name}. `}
      <Link to='/' className={styles.already_auth__back}>
        Назад
      </Link>
    </span>
	)
}

export default AlreadyAuth
