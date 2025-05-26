import { useContext } from "react";
import Note from "./Note";

import { NoteContext } from "../App";
export default function ArchivedNotes() {
	const { notes } = useContext(NoteContext);
	// Filter out archived notes
	const archivedNotes = notes.filter((note) => note.archived);
	return (
		<>
			{archivedNotes.length > 0 ? (
				<section id="archived-notes">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
						{archivedNotes.map((note, index) => (
							<Note {...note} key={index} />
						))}
					</div>
				</section>
			) : (
				<div className="h-[50vh] place-content-center">
					<h2 className="text-center text-3xl font-black text-black dark:text-gray-100">
						No archived notes!
					</h2>
				</div>
			)}
		</>
	);
}
