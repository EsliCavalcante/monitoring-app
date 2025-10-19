import { useState } from "react";
import { fileReaderContent } from "../utils/fileReaderContent";

type FileReaderType = {
	fnArrayBuffer: (arrayBuffer: Uint8Array<ArrayBuffer>, file: File) => void;
};

export function useFileReader(props: FileReaderType) {
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsLoading(true);
		const fileList = event.target.files as FileList;
		const file = fileList[0];

		const arrayBuffer = await fileReaderContent(file);
		props.fnArrayBuffer(arrayBuffer, file);
		setIsLoading(false);
	};

	return {
		handleChangeFile,
		isLoading,
	};
}
