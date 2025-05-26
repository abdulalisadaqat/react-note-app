export default function Button({
	children,
	bgColor = "bg-black",
	bgDark = "dark:bg-[#1a345a]",
	darkBorder = " ",
	textColor = "text-white",
	width = "fit-content",
	onClick = () => {},
}) {
	return (
		<>
			<button
				type="button"
				className={`${bgColor}
					 py-2 px-4 rounded h-max hover:opacity-70 transition-colors ${darkBorder} 
					${textColor} ${bgDark} ${width}`}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);
}
