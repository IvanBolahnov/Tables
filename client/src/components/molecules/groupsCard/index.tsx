import { FC, useEffect, useState } from "react"
import styles from "./index.module.css"
import classNames from "classnames"
import { Link } from "react-router"
import { Table, UserOnGroupWithGroups, UserRole } from "../../../api/type"
import { groupApi } from "../../../api/group"
import { STATIC_URL } from "../../../consts"

type GroupCardProps = {
	group: UserOnGroupWithGroups
	className?: string
}

const getRole = (role: UserRole): string => {
	switch (role) {
		case "Admin":
			return "Админ"
			break

		case "Moderator":
			return "Модератор"
			break

		case "User":
			return "Пользователь"
			break

		case "Applicant":
			return "Кондидат"
			break

		default:
			return "Неизвестная роль"
			break
	}
}

const GroupCard: FC<GroupCardProps> = ({ group, className }) => {
	const [tables, setTables] = useState<Table[] | null>()
	useEffect(() => {
		groupApi.getTables(group.groupId).then((data) => {
			setTables(data.data)
		})
	}, [])

	return (
		<Link
			to={`/groups/${group.group.slug}`}
			className={classNames(styles.group_card, className)}
		>
			<div className={styles.group_card__header}>
				<img
					className={styles.group_card__img}
					src={`${STATIC_URL}/groups/${group.group.imgUrl}`}
					alt={group.group.title + " image"}
				/>
				<h2 className={styles.group_card__title} title={group.group.title}>
					{group.group.title}
				</h2>
			</div>
			<div className={styles.group_card__info}>
				<span
					className={classNames("_subtitle", styles.group_card__info__role)}
				>
					{getRole(group.userRole)}
				</span>
				<span
					className={classNames("_subtitle", styles.group_card__info__role)}
				>
					Таблицы: {tables?.length}
				</span>
				<span
					className={classNames("_subtitle", styles.group_card__info__slug)}
				>
					{"/" + group.group.slug}
				</span>
			</div>
		</Link>
	)
}

export default GroupCard
