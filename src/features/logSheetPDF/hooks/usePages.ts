import type { UploadedData } from "@/utils/@types";
import { useCallback } from "react";

export function usePages({
	pages = [],

	itemsPerPage = 10,
}: {
	pages: UploadedData[];
	initialPage?: number;
	itemsPerPage?: number;
}) {
	const totalItems = pages.length;
	const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

	const pagesNumbers = Array.from({ length: pages.length }, (_, i) => i + 1);

	const getPage = useCallback(
		(page: number) => {
			const startIndex = (page - 1) * itemsPerPage;
			const pagesSliceted = pages.slice(
				startIndex,
				startIndex + itemsPerPage
			);
			const numbersSliceted = pagesNumbers.slice(
				startIndex,
				startIndex + itemsPerPage
			);

			return { pagesSliceted, numbersSliceted };
		},
		[pages, itemsPerPage]
	);

	const blankPageItems = Array.from(
		{
			length:
				itemsPerPage - (pages.length % itemsPerPage || itemsPerPage),
		},
		(_, i) => {
			return totalItems + i + 1;
		}
	);

	return { pagesNumbers, totalPages, getPage, blankPageItems };
}
