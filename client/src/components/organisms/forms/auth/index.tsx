import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { AccessTokenPayload, authApi } from "../../../../api/auth"
import { userSlice } from "../../../../store/user/user.slice"
import { uiSlice } from "../../../../store/ui/ui.slice"
import { RootState } from "../../../../store/store"
import Input from "../../../molecules/input"
import PasswordInput from "../../../molecules/passwordInput"
import Button from "../../../molecules/button"
import { jwtDecode } from "jwt-decode"
import MailIcon from "/src/assets/icons/mail.svg?react"
import PasswordIcon from "/src/assets/icons/password.svg?react"
import classNames from "classnames"
import AlreadyAuth from "../../../molecules/alreadyAuth"

type LoginForm = {
	email: string
	password: string
}

const AuthForm: FC = () => {
	const { isAuth, name } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	const { login } = userSlice.actions
	const { addNotification } = uiSlice.actions

	const navigate = useNavigate()

	const {
		handleSubmit,
		control,
		setError,
		setFocus,
		formState: { errors, isSubmitting }
	} = useForm<LoginForm>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const submit: SubmitHandler<LoginForm> = async (data) => {
		const response = await authApi.login(data)
		console.log(response)

		if (response.data) {
			const token: string = response.data.accessToken
			dispatch(login({ token }))
			const decode: AccessTokenPayload = jwtDecode(token)
			dispatch(
				addNotification({
					id: Date.now(),
					type: "success",
					message: `Вы авторизированы как ${decode.name}`
				})
			)
			navigate("/profile")
			return
		}
		switch (response.error?.message) {
			case "Invalid password":
				setError("password", { type: "validate", message: "Неверный пароль" })
				setFocus("password")
				break

			case "User not found":
				setError("email", {
					type: "validate",
					message: "Пользователь не найден"
				})
				setFocus("email")
				break

			default:
				setError("root", { type: "manual", message: "Попробуйте позже" })
				break
		}
	}

	return (
		<>
			<form
				className={classNames(styles.auth_form, componentStyles.section_card)}
				onSubmit={handleSubmit(submit)}
			>
				<div className={styles.form__header}>
					<h1>Вход</h1>
				</div>
				<hr />
				<div className={styles.form__input}>
					<Controller
						name={"email"}
						control={control}
						render={({ field }) => (
							<Input autoComplete='email' placeholder='E-mail' {...field}>
								<MailIcon />
							</Input>
						)}
					/>
					{errors.email && (
						<span className={styles.form__error_message}>
							{errors.email.message}
						</span>
					)}
				</div>
				<div className={styles.form__input}>
					<Controller
						name={"password"}
						control={control}
						render={({ field }) => (
							<PasswordInput
								autoComplete='current-password'
								placeholder='Пароль'
								{...field}
							>
								<PasswordIcon />
							</PasswordInput>
						)}
					/>
					{errors.password && (
						<span className={styles.form__error_message}>
							{errors.password.message}
						</span>
					)}
				</div>
				<div className={styles.form__submit}>
					<Button type='submit'>
						Войти {isSubmitting && <div className={styles.form__loader}></div>}
					</Button>
				</div>
				<Link to='/auth/reg' className={styles.form__link}>
					Регистрация
				</Link>
				{errors.root && (
					<span className={styles.form__error_message}>
						{errors.root.message}
					</span>
				)}
				{isAuth && <AlreadyAuth name={name} />}
			</form>
		</>
	)
}

export default AuthForm
