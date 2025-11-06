import { Btn, Icon, Text } from "@/components/ButtonTextIcon";
import { useFileReader } from "@/features/temperatureMonitoring/hooks/useFileReader";
import type { UploadedData } from "@/utils/@types";
import { useParseToXLS } from "@/utils/useParseToXLS";
import { Upload } from "lucide-react";
import { useRef } from "react";

type ArchiveUploadBtn = {
	onChangeFile?: (data: UploadedData[]) => void;
};

const ArchiveUploadBtn = (props: ArchiveUploadBtn) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { parseFile } = useParseToXLS();
	const { handleChangeFile } = useFileReader({
		async fnArrayBuffer(_, file) {
			if (
				file.type !==
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			) {
				throw new Error("Arquivo Inválido");
			}
			const data = await parseFile(file);
			const value = data.map((item, index) => {
				return {
					...item,
					temperature: Number(item.temperature),
					position: item.position,
					supply: null,
					return: null,
					id: index + 1,
				};
			});

			if (!props.onChangeFile) return;
			props.onChangeFile(value);
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
			<Btn onClick={() => inputRef.current?.click()}>
				<Icon>
					<Upload />
				</Icon>
				<Text>Upload</Text>
			</Btn>
		</div>
	);
};

export default ArchiveUploadBtn;
