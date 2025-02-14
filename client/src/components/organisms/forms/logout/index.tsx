import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../../../molecules/button"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { userSlice } from "../../../../store/user/user.slice"
import { authApi } from "../../../../api/auth"
import { RootState } from "../../../../store/store"
import classNames from "classnames"
import AlreadyAuth from "../../../molecules/alreadyAuth"

type LoginForm = {
	email: string
	password: string
}

const LogoutForm: FC = () => {
	const { isAuth, name } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	const { logout } = userSlice.actions
	const navigate = useNavigate()

	const {
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<LoginForm>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const submit: SubmitHandler<LoginForm> = async () => {
		const response = await authApi.logout()

		if (response.data) {
			dispatch(logout())
			navigate("/auth")
		}
		if (response.error) {
			setError("root", { type: "manual", message: "Попробуйте позже" })
		}
	}

	return (
		<>
			<form
				className={classNames(styles.auth_form, componentStyles.section_card)}
				onSubmit={handleSubmit(submit)}
			>
				<div className={styles.form__submit}>
					<Button type='submit'>
						Выйти из аккаунта
						{isSubmitting && <div className={styles.form__loader}></div>}
					</Button>
				</div>
				{errors.root && (
					<span className={styles.form__error_message}>
						{errors.root.message}
					</span>
				)}
				{isAuth && (
					<AlreadyAuth name={name}/>
				)}
			</form>
		</>
	)
}

export default LogoutForm
