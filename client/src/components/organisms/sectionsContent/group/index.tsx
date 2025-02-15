import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC, useEffect, useState } from "react"
import Button from "../../../molecules/button"
import {
	Group as GroupType,
	Table,
	UserOnGroupWithUser
} from "../../../../api/type"
import { STATIC_URL, THIS_URL } from "../../../../consts"
import { useDispatch } from "react-redux"
import { uiSlice } from "../../../../store/ui/ui.slice"
import { groupApi } from "../../../../api/group"
import { copyTextToClipboard } from "../../../../services/copyToClipboard"
import classNames from "classnames"
import CopyIcon from "/src/assets/icons/copy.svg?react"
import SettingsIcon from "/src/assets/icons/settings_lock.svg?react"

type GroupProps = {
	group: GroupType
}

const Group: FC<GroupProps> = ({ group }) => {
	const [users, setUsers] = useState<UserOnGroupWithUser[] | null>()
	const [usersError, setUsersError] = useState<any>()
	const [tables, setTables] = useState<Table[] | null>()
	const [tablesError, setTablesError] = useState<any>()

	const { addNotification } = uiSlice.actions
	const dispatch = useDispatch()

	useEffect(() => {
		groupApi.getTables(group.id).then((data) => {
			setTables(data.data)
			setTablesError(data.error)
		})
		groupApi.getUsers(group.id).then((data) => {
			setUsers(data.data)
			setUsersError(data.error)
		})
	}, [])

	const slugToClipboaard = async () => {
		const isCopied = await copyTextToClipboard(
			`${THIS_URL}/groups/${group.slug}`
		)

		isCopied
			? dispatch(
					addNotification({
						message: "Путь скопирован",
						type: "success",
						id: Date.now()
					})
			  )
			: dispatch(
					addNotification({
						message: "Путь не скопирован",
						type: "error",
						id: Date.now()
					})
			  )
	}

	return (
		<div className={classNames(styles.group, componentStyles.section_card)}>
			<div className={styles.group__header}>
				<img
					className={styles.group__img}
					src={`${STATIC_URL}/groups/${group.imgUrl}`}
					alt={group.title + " image"}
				/>
				<h2 className={styles.group__name}>{group.title}</h2>
				<Button
					className={styles.group__edit}
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
			<div className={styles.group__info}>
				<Button
					className={styles.group__slug}
					onClick={() => {
						slugToClipboaard()
					}}
				>
					{"/" + group.slug}
					<CopyIcon />
				</Button>
				<span>{"ID: " + group.id}</span>
				<span>{"Пользователи: " + users?.length}</span>
				<span>{"Таблицы: " + tables?.length}</span>
			</div>
			<hr />
			<div className={styles.group__users_list}>
				<h3>Участники:</h3>
				{!usersError &&
					users &&
					users.map((user) => <span key={user.userId}>{user.user.name}</span>)}

				{/* {!usersError && (
					<Link to={`/groups/${group.slug}/users`}>
						{"Пользователи: " + users?.length}
					</Link>
				)}
				{!tablesError && (
					<Link to={`/groups/${group.slug}/tables`}>
						{"Таблицы: " + tables?.length}
					</Link>
				)} */}
			</div>
		</div>
	)
}

export default Group
