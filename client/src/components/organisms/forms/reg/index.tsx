import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import Input from "../../../molecules/input"
import PasswordInput from "../../../molecules/passwordInput"
import Button from "../../../molecules/button"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { userSlice } from "../../../../store/user/user.slice"
import { AccessTokenPayload, authApi } from "../../../../api/auth"
import { RootState } from "../../../../store/store"
import { jwtDecode } from "jwt-decode"
import { uiSlice } from "../../../../store/ui/ui.slice"
import MailIcon from "/src/assets/icons/mail.svg?react"
import UserIcon from "/src/assets/icons/user.svg?react"
import PasswordIcon from "/src/assets/icons/password.svg?react"
import classNames from "classnames"
import AlreadyAuth from "../../../molecules/alreadyAuth"

type RegForm = {
	name: string
	email: string
	password: string
	repeatPassword: string
}

const RegForm: FC = () => {
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
	} = useForm<RegForm>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			repeatPassword: ""
		}
	})

	const submit: SubmitHandler<RegForm> = async (data) => {
		const { name, email, password, repeatPassword } = data
		if (password !== repeatPassword) {
			setError("repeatPassword", {
				type: "validate",
				message: "Пароли не совпадают"
			})
			return
		}
		const response = await authApi.reg({ name, email, password })

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
			case "This Email is already in use":
				setError("email", {
					type: "validate",
					message: "Пользователь с данной почтой уже существует"
				})
				setFocus("email")
				break

			case "Invalid email":
				setError("email", {
					type: "validate",
					message: "Некорректная почта"
				})
				setFocus("email")
				break

			case "Password cannot be less then 6 characters":
				setError("password", {
					type: "validate",
					message: "Пароль не может быть меньше 6 символов"
				})
				setFocus("password")
				break

			case "Name cannot be less then 2 characters":
				setError("name", {
					type: "validate",
					message: "Имя не может быть меньше 2 символов"
				})
				setFocus("name")
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
					<h1>Регистрация</h1>
				</div>
				<hr />
				<div className={styles.form__input}>
					<Controller
						name={"name"}
						control={control}
						render={({ field }) => (
							<Input autoComplete='name' placeholder='Имя' {...field}>
								<UserIcon />
							</Input>
						)}
					/>
					{errors.name && (
						<span className={styles.form__error_message}>
							{errors.name.message}
						</span>
					)}
				</div>
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
								autoComplete='new-password'
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
				<div className={styles.form__input}>
					<Controller
						name={"repeatPassword"}
						control={control}
						render={({ field }) => (
							<PasswordInput
								autoComplete='new-password'
								placeholder='Повторите пароль'
								{...field}
							>
								<PasswordIcon />
							</PasswordInput>
						)}
					/>
					{errors.repeatPassword && (
						<span className={styles.form__error_message}>
							{errors.repeatPassword.message}
						</span>
					)}
				</div>

				<div className={styles.form__submit}>
					<Button type='submit'>
						Зарегистрироваться{" "}
						{isSubmitting && <div className={styles.form__loader}></div>}
					</Button>
				</div>
				<Link to='/auth' className={styles.form__link}>
					Войти в аккаунт
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

export default RegForm
