import { useRef } from "react";
import { useFileReader } from "../hooks/useFileReader";

type UploadButtonProps = {
	onChangeFile: (arrayBuffer: Uint8Array<ArrayBuffer>, file: File) => void;
	children?: (
		ref: React.RefObject<HTMLInputElement | null>,
		isLoading: boolean
	) => React.ReactNode;
};

const UploadButton = (props: UploadButtonProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { handleChangeFile, isLoading } = useFileReader({
		fnArrayBuffer(arrayBuffer, file) {
			props.onChangeFile(arrayBuffer, file);
		},
	});

	return (
		<div>
			<input
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				ref={inputRef}
				onChange={handleChangeFile}
				className="hidden"
				type="file"
			/>
			{props.children && props.children(inputRef, isLoading)}
		</div>
	);
};

export default UploadButton;
