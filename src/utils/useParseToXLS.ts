// useContainerXlsxParser.ts
import { useState } from "react";
import ExcelJS from "exceljs";
import { parseToNumber } from "@/features/uploadArchive/shared/parseToNumber";

export type ParsedContainer = {
	id: number;
	container: string;
	temperature: number;
	position?: string | null;
	supply: number | null;
	return: number | null;
	remarks: string | null;
};

export class ErrorColumn extends Error {
	missingColumns: string[];
	constructor(message: string, missingColumns: string[]) {
		super(message);
		this.name = "ErrorColumn";
		this.missingColumns = missingColumns;
		Object.setPrototypeOf(this, ErrorColumn.prototype);
	}
}

export function useParseToXLS() {
	const [data, setData] = useState<ParsedContainer[]>([]);
	const [error, setError] = useState<ErrorColumn | null>(null);
	const [loading, setLoading] = useState(false);

	async function parseFile(file: File) {
		setLoading(true);
		setError(null);
		setData([]);

		try {
			const buffer = await file.arrayBuffer();
			const workbook = new ExcelJS.Workbook();
			await workbook.xlsx.load(buffer);

			const worksheet = workbook.worksheets[0];

			if (!worksheet) {
				throw new ErrorColumn("Nenhuma planilha encontrada", [
					"container",
					"temperature",
				]);
			}

			// ✅ Detectar automaticamente a linha do cabeçalho (mais tolerante)
			let headerRowIndex = -1;
			let headerMap = new Map<number, string>();

			const normalize = (v: any) =>
				v == null ? "" : String(v).toString().trim().toLowerCase();
			const containsAny = (text: string, keywords: string[]) =>
				keywords.some((k) => text.includes(k));

			worksheet.eachRow((row, rowNumber) => {
				if (!Array.isArray(row.values)) return;

				const values: string[] = row.values
					.filter(Boolean)
					.map((v: any) => normalize(v));

				if (values.length < 2) return; // não parece um cabeçalho

				// palavras-chave (case-insensitive) para identificar colunas
				const containerKeys = ["container", "cont"];
				const tempKeys = [
					"temp",
					"temperature",
					"temperatura",
					"temper",
				]; // cobre variações

				const looksLikeHeader = values.some(
					(v) =>
						containsAny(v, containerKeys) ||
						containsAny(v, tempKeys)
				);

				if (looksLikeHeader && headerRowIndex === -1) {
					headerRowIndex = rowNumber;
					row.eachCell((cell, col) => {
						const val = normalize(cell.value);
						if (val) headerMap.set(col, val);
					});
				}
			});

			if (headerRowIndex === -1) {
				throw new ErrorColumn(
					"Não foi possível localizar o cabeçalho",
					["container", "temperature"]
				);
			}

			// ✅ Mapear nomes que queremos (procura por palavras-chave dentro do header)
			const findColByKeywords = (keywords: string[]) =>
				Array.from(headerMap.entries()).find(([, v]) =>
					containsAny(v, keywords)
				)?.[0];

			const colContainer = findColByKeywords(["container", "cont"]); // obrigatório
			const colTemp = findColByKeywords([
				"temp",
				"temperature",
				"temperatura",
				"temper",
			]); // obrigatório
			// Busca apenas por "position" exato (case-insensitive)
			const colPosition = Array.from(headerMap.entries()).find(
				([, v]) => v === "position"
			)?.[0];

			const missing: string[] = [];
			if (!colContainer) missing.push("container");
			if (!colTemp) missing.push("temperature");

			if (missing.length > 0) {
				throw new ErrorColumn(
					`Colunas obrigatórias ausentes: ${missing.join(", ")}`,
					missing
				);
			}

			const parsed: ParsedContainer[] = [];
			let id = 1;

			worksheet.eachRow((row, rowNumber) => {
				if (rowNumber <= headerRowIndex) return; // pula cabeçalho e linhas acima

				const get = (col?: number) => {
					if (!col) return null;
					const cell = row.getCell(col).value;
					if (cell && typeof cell === "object" && "text" in cell)
						return (cell as any).text;
					return cell?.toString() ?? null;
				};

				const container = get(colContainer);
				const temperature = parseToNumber(get(colTemp));
				const position = get(colPosition);

				// ✅ apenas ignora linhas vazias (nenhum erro)
				if (!container && isNaN(temperature)) return;

				parsed.push({
					id: id++,
					container: String(container),
					temperature,
					position: position || null,
					supply: null,
					return: null,
					remarks: null,
				});
			});

			setData(parsed);
			return parsed;
		} catch (err) {
			if (err instanceof ErrorColumn) setError(err);
			else
				setError(
					new ErrorColumn((err as Error).message, [
						"container",
						"temperature",
					])
				);
			return [];
		} finally {
			setLoading(false);
		}
	}

	return { data, error, loading, parseFile };
}
