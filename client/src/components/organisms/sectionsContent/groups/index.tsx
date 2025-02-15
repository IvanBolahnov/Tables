import styles from "./index.module.css"
import componentStyles from "../../../index.module.css"
import { FC, useEffect, useState } from "react"
import { userApi } from "../../../../api/user"
import { UserOnGroupWithGroups } from "../../../../api/type"
import GroupCard from "../../../molecules/groupsCard"
import { ButtonStyledLink } from "../../../molecules/button"
import classNames from "classnames"
import AddIcon from "/src/assets/icons/add_lock.svg?react"

const GroupsContent: FC = () => {
	const [groups, setGroups] = useState<UserOnGroupWithGroups[] | null>()
	const [groupsError, setGroupsError] = useState<any>()

	useEffect(() => {
		userApi.getGroups().then((data) => {
			setGroups(data.data)
			setGroupsError(data.error)
		})
	}, [])

	return (
		<div className={classNames(styles.groups, componentStyles.section_card)}>
			<div className={styles.groups__header}>
				<h2>Группы</h2>
				<ButtonStyledLink
					className={styles.groups__create}
					to={"/create/group"}
				>
					<AddIcon />
				</ButtonStyledLink>
			</div>
			<hr />
			<div className={styles.groups_list}>
				{!groupsError &&
					groups &&
					groups.map((group) => (
						<GroupCard group={group} key={group.groupId} />
					))}
			</div>
		</div>
	)
}

export default GroupsContent
