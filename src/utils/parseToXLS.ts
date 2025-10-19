// src/features/fileUpload/utils/parseCSV.ts
import * as ExcelJS from "exceljs";

export async function parseToXLS<T>(file: Uint8Array<ArrayBuffer>): Promise<T> {
	const workbook = new ExcelJS.Workbook();

	await workbook.xlsx.load(file.buffer);

	const worksheet = workbook.getWorksheet(1); // Primeira planilha

	if (!worksheet) {
		throw new Error("Nenhuma planilha encontrada no arquivo");
	}

	if (!worksheet.actualRowCount) throw new Error("planilha vazia");

	const jsonData: any[] = [];
	const headerRow = worksheet.getRow(1);
	const headers: string[] = [];

	// Extrair cabeçalhos
	headerRow.eachCell((cell, colNumber) => {
		headers[colNumber] = cell.text;
	});

	// Extrair dados
	worksheet.eachRow((row, rowNumber) => {
		if (rowNumber === 1) return; // Pular cabeçalho

		const rowData: any = {};
		row.eachCell((cell, colNumber) => {
			if (headers[colNumber]) {
				rowData[headers[colNumber]] = cell.text;
			}
		});

		// Só adicionar se tiver dados
		if (Object.keys(rowData).length > 0) {
			jsonData.push(rowData);
		}
	});

	return jsonData as T;
}
