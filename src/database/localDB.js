if (!localStorage.getItem("notes")) {
	localStorage.setItem("notes", JSON.stringify([]));
}
export const notes = JSON.parse(localStorage.getItem("notes"));
