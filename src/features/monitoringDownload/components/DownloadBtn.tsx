import { Btn, Text, Icon } from "@/components/ButtonTextIcon";
import type { Button } from "@/components/ui/button";
import DocumentPDF from "@/features/logSheetPDF/components/Document";
import type { SettingType, UploadedData } from "@/utils/@types";
import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import React, { useState } from "react";

type DownloadBtnProps = {
	data: UploadedData[];
	settings: SettingType;
	onChangeFile?: (isLoading: boolean) => void;
} & React.ComponentProps<typeof Button>;

const DownloadBtn = ({
	onChangeFile,
	data,
	settings,
	...rest
}: DownloadBtnProps) => {
	const [isPdfLoading, setIsPdfLoading] = useState(false);

	async function handleDownloadPdf() {
		const documentName =
			settings.mv === "" ? "Relatorio" : settings.mv.trim();

		setIsPdfLoading(true);
		if (onChangeFile) {
			onChangeFile(true);
		}
		const blob = await pdf(
			<DocumentPDF data={data} settings={settings} />
		).toBlob();
		if (onChangeFile) {
			onChangeFile(false);
		}
		setIsPdfLoading(false);

		const blobUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = blobUrl;
		link.download = `${documentName}_${new Date().toLocaleDateString()}.pdf`; // nome do arquivo
		document.body.appendChild(link);
		link.click();

		// limpeza
		document.body.removeChild(link);
		URL.revokeObjectURL(blobUrl);
	}

	return (
		<Btn {...rest} onClick={handleDownloadPdf}>
			<Icon>
				<Download />
			</Icon>
			<Text>Download</Text>
		</Btn>
	);
};

export default DownloadBtn;
