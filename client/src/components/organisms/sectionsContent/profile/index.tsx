import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { STATIC_URL } from "../../../../consts"
import Button from "../../../molecules/button"
import { userApi } from "../../../../api/user"
import { Link } from "react-router"
import { UserOnGroupWithGroups } from "../../../../api/type"
import { uiSlice } from "../../../../store/ui/ui.slice"
import classNames from "classnames"
import SettingsIcon from '/public/icons/settings_lock.svg?react'

const ProfileContent: FC = () => {
	const user = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	const { addNotification } = uiSlice.actions

	const [groups, setGroups] = useState<UserOnGroupWithGroups[] | null>()
	const [groupsError, setGroupsError] = useState<any>()
	const [tables, setTables] = useState<[]>()
	const [tablesError, setTablesError] = useState<any>()

	useEffect(() => {
		userApi.getGroups().then((data) => {
			setGroups(data.data)
			setGroupsError(data.error)
		})
		userApi.getTables().then((data) => {
			setTables(data.data)
			setTablesError(data.error)
		})
	}, [])

	return (
		<div className={classNames(styles.profile, componentStyles.section_card)}>
			<div className={styles.profile__header}>
				<img
					className={styles.profile__img}
					src={`${STATIC_URL}/users/${user.imgUrl}`}
					alt={user.name + " image"}
				/>
				<h2 className={styles.profile__name}>{user.name}</h2>
				<Button
					className={styles.profile__edit}
					onClick={() => {
						dispatch(
							addNotification({
								id: Date.now(),
								message: "Not available now",
								type: "error"
							})
						)
					}}
				>
					<SettingsIcon />
				</Button>
			</div>
			<hr />
			<div className={styles.profile__info}>
				<span>{"E-mail: " + user.email}</span>
				<span>{"ID: " + user.id}</span>
			</div>
			<hr />
			<div className={styles.profile__links}>
				{!groupsError && (
					<Link to={"/groups"}>{"Группы: " + groups?.length}</Link>
				)}
				{!tablesError && (
					<Link to={"/tables"}>{"Таблицы: " + tables?.length}</Link>
				)}
			</div>
		</div>
	)
}

export default ProfileContent
