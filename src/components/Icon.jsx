export default function Icon({ src, width = 24 }) {
	return (
		<>
			<img
				src={src}
				alt="icon"
				width={width}
				height={width}
				className="inline-block"
			/>
		</>
	);
}
