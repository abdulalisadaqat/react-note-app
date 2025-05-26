import { useState, useEffect, createContext } from "react";
import "./assets/css/tailwind.css";
import "./assets/css/style.css";

// custom components
import Router from "./components/Router";
import Button from "./components/Button";
import Icon from "./components/Icon";

// icons
import noteIcon from "../public/notes.svg";
import sunIcon from "../public/sun.svg";
import moonIcon from "../public/moon.svg";

export const NoteContext = createContext();

export default function App() {
	const [notes, setNotes] = useState([]);
	// check if there are notes in local storage
	const [thereIsNotes, setThereIsNotes] = useState(false);

	// load notes from local storage when the app starts
	useEffect(() => {
		const savedNotes = localStorage.getItem("notes");
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
		setThereIsNotes(true);
	}, []);

	// save notes to local storage whenever notes change
	useEffect(() => {
		if (thereIsNotes) {
			localStorage.setItem("notes", JSON.stringify(notes));
		}
	}, [notes]);

	// add new note
	const [noteData, setNoteData] = useState({
		title: "",
		detail: "",
		archive: false,
	});
	const [noteErrors, setNoteErrors] = useState({
		title: "",
		detail: "",
	});
	function getNoteID() {
		let id = parseInt(localStorage.getItem("noteID") || "1");
		localStorage.setItem("noteID", (id + 1).toString());
		return id;
	}
	// this function will create a new note
	const modal = document.querySelector(".modal");
	function createNote() {
		// validate note data
		if (noteData.title.trim() === "") {
			setNoteErrors((prev) => ({ ...prev, title: "Title is required" }));
			return;
		} else {
			setNoteErrors((prev) => ({ ...prev, title: "" }));
		}
		if (noteData.detail.trim() === "") {
			setNoteErrors((prev) => ({ ...prev, detail: "Detail is required" }));
			return;
		} else {
			setNoteErrors((prev) => ({ ...prev, detail: "" }));
		}
		const newNote = {
			id: getNoteID(),
			title: noteData.title,
			detail: noteData.detail,
			archived: noteData.archive,
			date: new Date().toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}),
		};
		setNotes([...notes, newNote]);
		// reset note data
		setNoteData({ title: "", detail: "", archive: false });

		// close the modal
		if (modal) {
			modal.style.display = "none";
		}
	}

	// this function will delete a note by its id
	function deleteNote(noteID, noteTitle) {
		alert(`Are you sure you want to delete note "${noteTitle}"?`);
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== noteID);
		});
	}

	// this function will archive or unarchive a note by its id
	function archiveNote(noteID) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === noteID) {
					return { ...note, archived: !note.archived };
				}
				return note;
			});
		});
	}

	// this function will search for a note by its title
	const [searchedNotes, setSearchedNotes] = useState([]);
	const [searchTitle, setSearchTitle] = useState("");
	function searchNote(title) {
		if (title.trim() === "") {
			setSearchedNotes([]);
		} else {
			setSearchedNotes(() => {
				return notes.filter((note) => note.title.includes(title));
			});
		}
		setSearchTitle(title.trim());
	}

	// change app theme
	const [darkMode, setDarkMode] = useState(false);
	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme == "dark") {
			setDarkMode(true);
		}
	}, []);
	useEffect(() => {
		localStorage.setItem("theme", darkMode ? "dark" : "light");
		document.documentElement.className = darkMode ? "dark" : ""; // documentElement refers to the <html> element
	}, [darkMode]);

	// change create note button text based on window size
	const [windowSm, setWindowSm] = useState(false);
	window.addEventListener("resize", () => {
		// check if window size is smaller than 640px
		if (window.matchMedia("(max-width: 640px)").matches) {
			setWindowSm(true);
		} else {
			setWindowSm(false);
		}
	});
	window.addEventListener("load", () => {
		if (window.matchMedia("(max-width: 640px)").matches) {
			setWindowSm(true);
		} else {
			setWindowSm(false);
		}
	});

	return (
		<>
			<header>
				<div className="bg-gray-800 dark:bg-gray-600 py-5">
					<div className="container">
						<div className="flex justify-between items-center max-sm:pe-4">
							<p className="text-3xl font-bold font-sans text-white m-0 flex items-center">
								<Icon src={noteIcon} width={36} />{" "}
								<span className="ms-1 dark:text-white">All Note</span>
							</p>
							<button
								className=" cursor-pointer "
								onClick={(e) => {
									setDarkMode(!darkMode);
									e.target.classList.add("spin");
									setTimeout(() => {
										e.target.classList.remove("spin");
									}, 1000);
								}}
							>
								{darkMode ? <Icon src={moonIcon} /> : <Icon src={sunIcon} />}
							</button>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="flex justify-between py-3">
						<Button
							darkBorder="dark:border"
							onClick={() => (modal.style.display = "block")}
						>
							{windowSm ? (
								<span className="text-2xl" title="create new note">
									+
								</span>
							) : (
								"Create New Note"
							)}
						</Button>
						<div className="relative">
							<input
								type="text"
								id="search-input"
								className="p-2 border rounded w-full h-full dark:text-white dark:bg-gray-600 border-[#333] dark:border-white placeholder:text-gray-500 dark:placeholder:text-gray-300"
								placeholder="Search notes..."
								onChange={(e) => searchNote(e.target.value)}
							/>
							<span className="text-2xl rotate-y-180 text-gray-500 dark:text-gray-300 mx-2 absolute right-0 top-0 bottom-0 content-center">
								&#8981;
							</span>
						</div>
					</div>
				</div>
			</header>

			{/* create new note */}
			<section
				className="modal"
				id="create-form"
				onClick={(e) =>
					e.target == modal ? (modal.style.display = "none") : ""
				}
			>
				<div className="modal-dialog pointer-events-none">
					<div className="modal-content dark:!bg-gray-700">
						<div className="text-end mt-3 me-3">
							<button
								className="w-full text-right text-3xl dark:text-gray-400 me-2 cursor-pointer"
								onClick={() => (modal.style.display = "none")}
							>
								&times;
							</button>
						</div>
						<p className="text-center w-full font-bold text-2xl dark:text-gray-100">
							Note Form
						</p>
						<div className="modal-body">
							<form action="">
								<div className="mb-4">
									<label
										htmlFor="title"
										className="font-bold dark:text-gray-200"
									>
										Title
									</label>
									<input
										type="text"
										id="title"
										className="input"
										placeholder="Note Title"
										value={noteData.title}
										onChange={(e) =>
											setNoteData({
												...noteData,
												title: e.target.value,
											})
										}
										required
									/>
									{noteErrors.title && (
										<p className="text-sm text-red-700">{noteErrors.title}</p>
									)}
								</div>
								<div className="mb-4">
									<label
										htmlFor="detail"
										className="font-bold dark:text-gray-200"
									>
										Detail
									</label>
									<textarea
										id="detail"
										className="input"
										placeholder="Note Detail"
										rows={10}
										value={noteData.detail}
										onChange={(e) =>
											setNoteData({
												...noteData,
												detail: e.target.value,
											})
										}
										required
									></textarea>
									{noteErrors.detail && (
										<p className="text-sm text-red-700">{noteErrors.detail}</p>
									)}
								</div>
								<div className="flex items-center mb-4">
									<label
										htmlFor="archive"
										className="me-2 text-sm font-medium dark:text-gray-200"
									>
										Archive
									</label>
									<input
										id="archive"
										type="checkbox"
										className="w-4 h-4"
										onChange={() => setNoteData({ ...noteData, archive: true })}
									/>
								</div>
								<Button
									type="button"
									darkBorder="dark:border"
									width="w-full"
									onClick={createNote}
								>
									Create Note
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<main className="pb-10">
				<NoteContext.Provider
					value={{ notes, deleteNote, archiveNote, searchedNotes, searchTitle }}
				>
					<Router />
				</NoteContext.Provider>
			</main>
		</>
	);
}
