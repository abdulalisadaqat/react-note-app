import { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Note from "../components/Note";
import { NoteContext } from "../App";
export default function Home() {
	const { notes, searchedNotes, searchTitle } = useContext(NoteContext);
	const [pageTitle, setPageTitle] = useState("Active Notes");
	const NavLinkClasses =
		"text-black dark:text-gray-100 border dark:border-gray-400 text-sm rounded py-2 px-3 me-1 no-underline hover:opacity-70 transition-colors";
	return (
		<>
			<div className="shadow-[0_6px_5px_lightgray] dark:shadow-none dark:border-b dark:border-gray-400 mb-5">
				<div className="container">
					<div className="flex justify-between sm:items-center max-sm:flex-col-reverse py-4">
						<h1 className="text-2xl sm:text-3xl dark:text-gray-100 font-bold text-nowrap">
							{pageTitle}
						</h1>
						<div className="max-sm:mb-4 w-full flex justify-end">
							<NavLink
								to="." // "." refers to the current route, which is "active-notes = /"
								end
								className={({ isActive }) =>
									`${NavLinkClasses} ${isActive ? " bg-black text-gray-100 dark:bg-[#1a345a] " + setPageTitle("Active Notes") : ""}`
								}
							>
								Active Notes
							</NavLink>
							<NavLink
								to="archived-notes"
								className={({ isActive }) =>
									`${NavLinkClasses} ${isActive ? " bg-black text-gray-100 dark:bg-[#1a345a] " + setPageTitle("Archived Notes") : ""}`
								}
							>
								Archived Notes
							</NavLink>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				{searchedNotes.length == 0 && searchTitle != "" ? (
					<div className="mb-5">
						<p className="text-red-700 dark:text-red-400 text-2xl max-sm:text-sm ">
							No search result!
						</p>
					</div>
				) : (
					""
				)}
				{searchedNotes.length > 0 ? (
					<section id="searched-notes">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
							{searchedNotes.map((note, index) => (
								<Note {...note} key={index} />
							))}
						</div>
					</section>
				) : notes.length > 0 ? (
					<Outlet />
				) : (
					<div className="h-[50vh] place-content-center">
						<h2 className="text-center text-3xl font-black text-black dark:text-gray-100">
							You have no notes!
						</h2>
					</div>
				)}
			</div>
		</>
	);
}
