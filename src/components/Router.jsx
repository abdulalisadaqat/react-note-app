import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ActiveNotes from "./ActiveNotes";
import ArchivedNotes from "./ArchivedNotes";

export default function Router() {
	return (
		<>
			<Routes>
				<Route path="/" Component={Home}>
					<Route index Component={ActiveNotes} />
					<Route path="archived-notes" Component={ArchivedNotes} />
				</Route>
			</Routes>
		</>
	);
}
