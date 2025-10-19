import { Page, Document } from "@react-pdf/renderer";
import Header from "./Header";
import Title from "./Title";
import { usePages } from "../hooks/usePages";

import type { SettingType, UploadedData } from "@/utils/@types";
import Table from "./Table";
import Footer from "./Footer";
import { memo } from "react";

const DocumentPDF = memo(
	(props: { data: UploadedData[]; settings: SettingType }) => {
		const { totalPages, getPage, blankPageItems } = usePages({
			pages: props.data,
			itemsPerPage: 30,
		});

		return (
			// <PDFViewer style={{ width: "100%", height: "100%" }}>
			<Document>
				{Array.from({ length: totalPages }, (_, index) => (
					<Page key={index} size="A4" style={{ padding: 8 }}>
						<Header settings={props.settings} />

						<Title />

						<Table
							{...getPage(index + 1)}
							blankPageItems={blankPageItems}
						/>
						<Footer
							settings={props.settings}
							pageNumber={index + 1}
							totalPages={totalPages}
						/>
					</Page>
				))}
			</Document>
			// </PDFViewer>
		);
	}
);

export default DocumentPDF;
