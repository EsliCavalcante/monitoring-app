import { BtnPrimary } from "@/components/ButtonPrimary";
import type { Button } from "@/components/ui/button";
import DocumentPDF from "@/features/logSheetPDF/components/Document";
import type { SettingType, UploadedData } from "@/utils/@types";
import { pdf } from "@react-pdf/renderer";
import React from "react";

type PreviewBtnProps = {
	data: UploadedData[];
	setting: SettingType;
	onChangeFile?: (isLoading: boolean) => void;
} & React.ComponentProps<typeof Button>;

const PreviewBtn = ({
	data,
	setting,
	onChangeFile,
	...rest
}: PreviewBtnProps) => {
	async function handleOpenPdf() {
		if (onChangeFile) {
			onChangeFile(true);
		}
		const blob = await pdf(
			<DocumentPDF data={data} settings={setting} />
		).toBlob();
		if (onChangeFile) {
			onChangeFile(false);
		}
		const blobUrl = URL.createObjectURL(blob);

		window.open(blobUrl, "_blank");
		setTimeout(() => URL.revokeObjectURL(blobUrl), 6000);
	}

	return (
		<BtnPrimary {...rest} onClick={handleOpenPdf}>
			Visualizar Documento
		</BtnPrimary>
	);
};

export default PreviewBtn;
