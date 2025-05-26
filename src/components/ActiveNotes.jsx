import { useContext } from "react";
import Note from "./Note";

import { NoteContext } from "../App";
export default function ActiveNotes() {
	const { notes } = useContext(NoteContext);
	// Filter out archived notes
	const activeNotes = notes.filter((note) => !note.archived);
	return (
		<>
			{activeNotes.length > 0 ? (
				<section id="active-notes">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
						{notes.map((note, index) =>
							!note.archived ? <Note {...note} key={index} /> : ""
						)}
					</div>
				</section>
			) : (
				<div className="h-[50vh] place-content-center">
					<h2 className="text-center text-3xl font-black text-black dark:text-gray-100 h-full place-content-center">
						No active notes!
					</h2>
				</div>
			)}
		</>
	);
}
