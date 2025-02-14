import styles from "./index.module.css"
import componentStyles from "../../../../index.module.css"
import { FC } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import Input from "../../../../molecules/input"
import Button from "../../../../molecules/button"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { uiSlice } from "../../../../../store/ui/ui.slice"
import { groupApi } from "../../../../../api/group"
import classNames from "classnames"
import BlocksIcon from "/src/assets/icons/blocks.svg?react"
import SlugIcon from "/src/assets/icons/slug.svg?react"

type CreateGroupForm = {
	title: string
	slug: string
}

const CreateGroupForm: FC = () => {
	const dispatch = useDispatch()
	const { addNotification } = uiSlice.actions

	const navigate = useNavigate()

	const {
		handleSubmit,
		control,
		setError,
		setFocus,
		formState: { errors, isSubmitting }
	} = useForm<CreateGroupForm>({
		defaultValues: {
			title: "",
			slug: ""
		}
	})

	const submit: SubmitHandler<CreateGroupForm> = async (data) => {
		const { title, slug } = data
		const response = await groupApi.create(data)

		if (response.data) {
			dispatch(
				addNotification({
					id: Date.now(),
					type: "success",
					message: `Группа ${title} доступна по пути /groups/${slug}`
				})
			)
			navigate(`/groups/${slug}`)
			return
		}

		switch (response.error?.message) {
			case "Title cannot be less then 3 characters":
				setError("title", {
					type: "validate",
					message: "Название не может быть меньше трех символов"
				})
				setFocus("title")
				break

			case "Slug cannot be less then 3 characters":
				setError("slug", {
					type: "validate",
					message: "Идентификатор не может быть меньше трех символов"
				})
				setFocus("slug")
				break

			case "Slug must consist only of Latin characters (a-z)":
				setError("slug", {
					type: "validate",
					message: "Идентификатор должен состоять только из латинских символов"
				})
				setFocus("slug")
				break

			case "This title is already in use":
				setError("title", {
					type: "validate",
					message: "Группа с данным названием уже существует"
				})
				setFocus("title")
				break

			case "This slug is already in use":
				setError("slug", {
					type: "validate",
					message: "Группа с данным Идентификатором уже существует"
				})
				setFocus("slug")
				break

			default:
				setError("root", { type: "manual", message: "Попробуйте позже" })
				break
		}
	}

	return (
		<>
			<form
				className={classNames(styles.create_form, componentStyles.section_card)}
				onSubmit={handleSubmit(submit)}
			>
				<div className={styles.form__header}>
					<h1>Создание Группы</h1>
				</div>
				<hr />
				<div className={styles.form__input}>
					<Controller
						name={"title"}
						control={control}
						render={({ field }) => (
							<Input
								autoComplete='group-title'
								placeholder='Название'
								{...field}
							>
								<BlocksIcon />
							</Input>
						)}
					/>
					{errors.title && (
						<span className={styles.form__error_message}>
							{errors.title.message}
						</span>
					)}
				</div>
				<div className={styles.form__input}>
					<Controller
						name={"slug"}
						control={control}
						render={({ field }) => (
							<Input
								autoComplete='group-slug'
								placeholder='Идентификатор'
								{...field}
							>
								<SlugIcon />
							</Input>
						)}
					/>
					{errors.slug && (
						<span className={styles.form__error_message}>
							{errors.slug.message}
						</span>
					)}
				</div>
				<div className={styles.form__submit}>
					<Button type='submit'>
						Создать{" "}
						{isSubmitting && <div className={styles.form__loader}></div>}
					</Button>
				</div>
				{errors.root && (
					<span className={styles.form__error_message}>
						{errors.root.message}
					</span>
				)}
			</form>
		</>
	)
}

export default CreateGroupForm
