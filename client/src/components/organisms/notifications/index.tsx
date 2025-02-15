import classNames from "classnames"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { Notification, uiSlice } from "../../../store/ui/ui.slice"
import styles from "./index.module.css"

type NotificationProps = {
	notification: Notification
}

const NotificationItem: FC<NotificationProps> = ({ notification }) => {
	const dispatch = useDispatch()
	const { deleteNotification } = uiSlice.actions

	setTimeout(() => {
		dispatch(deleteNotification(notification.id))
	}, 5000)

	return (
		<li
			onClick={() => {
				dispatch(deleteNotification(notification.id))
			}}
			className={classNames(
				styles.notification,
				styles["notification_" + notification.type]
			)}
		>
			{notification.message}
		</li>
	)
}

const Notifications: FC = () => {
	const { notifications } = useSelector((state: RootState) => state.ui)
	return (
		<ul className={styles.notifications}>
			{notifications.map((notification) => (
				<NotificationItem notification={notification} key={notification.id} />
			))}
		</ul>
	)
}

export default Notifications
