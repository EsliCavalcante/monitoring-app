export function fileReaderContent(
	file: File
): Promise<Uint8Array<ArrayBuffer>> {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.onload = async (e) => {
			const arrayBuffer = new Uint8Array(e.target?.result as ArrayBuffer);
			resolve(arrayBuffer);
		};

		reader.readAsArrayBuffer(file);
	});
}
