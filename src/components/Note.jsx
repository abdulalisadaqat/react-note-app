import { useContext } from "react";
import Button from "./Button";

import { NoteContext } from "../App";
export default function Note({ id, title, detail, date, archived }) {
	const { deleteNote, archiveNote } = useContext(NoteContext);
	return (
		<>
			<div className="border-2 dark:border-gray-400 rounded p-3 bg-white dark:bg-[#444] transition-colors grid grid-rows-[max-content_max-content_max-content_auto]">
				<h2 className="font-bold text-gray-800 dark:text-gray-100 transition-colors ">
					{title}
				</h2>
				<p className="text-gray-500 max-sm:text-sm my-2 dark:text-gray-400 transition-colors">
					{date}
				</p>
				<p className="text-gray-700 max-sm:text-sm dark:text-gray-100 transition-colors">
					{detail}
				</p>
				<div className="grid grid-cols-2 gap-2 mt-2 items-end">
					{archived ? (
						<Button
							bgColor="bg-green-500"
							bgDark="dark:bg-green-600"
							onClick={() => archiveNote(id)}
						>
							Active
						</Button>
					) : (
						<Button
							bgColor="bg-amber-500"
							bgDark="dark:bg-amber-600"
							onClick={() => archiveNote(id)}
						>
							Archive
						</Button>
					)}
					<Button
						bgColor="bg-red-500"
						bgDark="dark:bg-red-500"
						onClick={() => deleteNote(id, title)}
					>
						Delete
					</Button>
				</div>
			</div>
		</>
	);
}
