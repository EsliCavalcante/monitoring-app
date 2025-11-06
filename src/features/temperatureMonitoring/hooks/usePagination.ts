import { useCallback, useEffect, useState } from "react";

type UsePaginationProps<T> = {
	data: T[];
	initialPage?: number;
	itemsPerPage?: number;
	onPageChange?: (page: T[]) => void;
};

type DataPage<T> = {
	id: number;
} & T;

export function usePagination<T>({
	data,
	initialPage = 1,
	itemsPerPage = 10,
	onPageChange,
}: UsePaginationProps<T>) {
	const [originalData, setOriginalData] = useState<DataPage<T>[]>(() => {
		return Array.from({ length: data.length }, (_, i) => {
			return { ...data[i], id: i + 1 };
		}) as DataPage<T>[];
	});

	const [researchData, setResearchData] = useState<DataPage<T>[]>([]);
	const [dataPage, setDataPage] = useState<DataPage<T>[]>([]);
	const [searchIsEnabled, setSearchIsEnabled] = useState(false);
	const [searchByContainer, setSearchByContainer] = useState<string>("");

	useEffect(() => {
		if (searchByContainer !== "") {
			setResearchData((_) => {
				setSearchIsEnabled(true);

				const searcheted = originalData.filter((predicate) => {
					const value = predicate as any;
					return value.container
						.toLowerCase()
						.includes(searchByContainer?.toLowerCase());
				});

				if (searcheted.length === 0) return searcheted;

				return searcheted;
			});
			return;
		}

		setSearchIsEnabled(false);
		setResearchData([]);
	}, [searchByContainer, originalData, setResearchData]);

	useEffect(() => {
		if (searchIsEnabled) {
			setDataPage(researchData);
			return;
		}

		setDataPage(originalData);
	}, [searchIsEnabled, originalData, researchData]);

	const pagesNumbers = Array.from(
		{ length: dataPage.length },
		(_, i) => i + 1
	);

	const totalItems = dataPage.length;
	const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
	const [currentPage, setCurrentPage] = useState(initialPage);

	const deletePageData = useCallback(
		(data: T) => {
			const editData = data as any;

			setOriginalData((prev) => {
				const edit = prev as any;

				if (researchData.length - 1 === 0) {
					setSearchByContainer("");
				}
				return edit.filter(
					(item: any) => item.Container !== editData.Container
				);
			});
		},
		[setDataPage, researchData]
	);

	const editPageData = useCallback(
		(data: T) => {
			const editData = data as any;

			setOriginalData((prev) => {
				const edit = prev as any;

				return edit.map((item: any) => {
					if (item.id === editData.id) {
						return {
							...item,
							...editData,
						};
					}
					return item;
				});
			});
		},
		[setDataPage]
	);

	const getPage = useCallback(
		(page: number) => {
			const startIndex = (page - 1) * itemsPerPage;
			const pagesSliceted = dataPage.slice(
				startIndex,
				startIndex + itemsPerPage
			);

			const numbersSliceted = pagesNumbers.slice(
				startIndex,
				startIndex + itemsPerPage
			);

			return { pagesSliceted, numbersSliceted };
		},
		[itemsPerPage, dataPage]
	);

	const setPage = useCallback(
		(page: number) => {
			const newPage = Math.max(1, Math.min(page, totalPages));
			const currentData = getPage(newPage);

			setCurrentPage(newPage);
			if (onPageChange) onPageChange(currentData.pagesSliceted);
		},
		[totalPages, onPageChange, getPage]
	);

	const getRemainingPages = useCallback(() => {
		const { numbersSliceted } = getPage(currentPage);

		if (numbersSliceted.length) {
			if (numbersSliceted.length === itemsPerPage) return [];
			const data = Array.from(
				{ length: Math.abs(numbersSliceted.length - itemsPerPage) },
				(_, i) => numbersSliceted.slice(-1)[0] + i + 1
			);

			return data;
		}
	}, [currentPage, getPage]);

	const nextPage = useCallback(
		() => setPage(currentPage + 1),
		[currentPage, setPage]
	);
	const prevPage = useCallback(
		() => setPage(currentPage - 1),
		[currentPage, setPage]
	);

	if (totalPages < currentPage) {
		prevPage();
	}

	const currentData = getPage(currentPage);

	const hasLastPage = currentPage === totalPages;
	const hasFirstPage = currentPage === 1;

	return {
		currentPage,
		totalPages,
		itemsPerPage,
		currentData,
		hasFirstPage,
		hasLastPage,
		totalItems,
		searchIsEnabled,
		pagesNumbers,
		searchByContainer,
		originalData,
		setOriginalData,
		setSearchByContainer,
		deletePageData,
		editPageData,
		getPage,
		getRemainingPages,
		nextPage,
		prevPage,
	};
}
