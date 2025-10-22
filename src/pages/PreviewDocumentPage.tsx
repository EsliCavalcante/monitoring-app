import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import { useNavigate, Navigate } from "react-router";
import useUploadedData from "@/hooks/useUploadedData";
import DocumentPDF from "@/features/logSheetPDF/components/Document";

export const PreviewDocumentPage = () => {
	const { uploadedData, settings } = useUploadedData();

	const navigate = useNavigate();
	if (uploadedData.length === 0) {
		Navigate({ to: "/" });
		return null;
	}
	return (
		<div className="w-screen h-screen ">
			<div className="flex items-center ml-2">
				<Button
					variant={"ghost"}
					onClick={() => navigate("/monitoring-app/")}
					className="   cursor-pointer"
				>
					voltar
				</Button>
			</div>
			<PDFViewer style={{ width: "100%", height: "100%" }}>
				<DocumentPDF data={uploadedData} settings={settings} />
			</PDFViewer>
		</div>
	);
};

export default PreviewDocumentPage;
