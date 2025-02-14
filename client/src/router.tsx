import { FC } from "react"
import { Routes, Route } from "react-router"
import RootPage from "./components/pages/root"
import AuthPage from "./components/pages/auth/login"
import RegPage from "./components/pages/auth/reg"
import LogoutPage from "./components/pages/auth/logout"
import ProfilePage from "./components/pages/profile"
import GroupsPage from "./components/pages/groups"
import TablesPage from "./components/pages/tables"
import GroupPage from "./components/pages/group"
import TablePage from "./components/pages/table"
import NotFoundPage from "./components/pages/notFound"
import CreateGroupPage from "./components/pages/group/create"
import TestPage from "./components/pages/test"

const Router: FC = () => {
	return (
		<Routes>
			<Route path='*' element={<NotFoundPage />} />
			<Route index element={<RootPage />} />
			<Route path='auth'>
				<Route index element={<AuthPage />} />
				<Route path='reg' element={<RegPage />} />
				<Route path='logout' element={<LogoutPage />} />
			</Route>
			<Route path='profile' element={<ProfilePage />} />
			<Route path='groups'>
				<Route index element={<GroupsPage />} />
				<Route path=':groupSlug' element={<GroupPage />} />
			</Route>
			<Route path='tables'>
				<Route index element={<TablesPage />} />
				<Route path=':tableSlug' element={<TablePage />} />
			</Route>
			<Route path='create'>
				<Route path='group' element={<CreateGroupPage />} />
				<Route path='table' element={<TablePage />} />
				<Route path='task' element={<TablePage />} />
			</Route>
			<Route path='test' element={<TestPage />} />
		</Routes>
	)
}

export default Router
