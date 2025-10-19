import { useCallback, useState } from "react";

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
	const [pagesData, setPagesData] = useState<DataPage<T>[]>([
		...(data as any),
	]);
	const [searchedMonitoringData, setSearchedMonitoringData] = useState<
		DataPage<T>[]
	>([]);
	const [searchIsEnabled, setSearchIsEnabled] = useState(false);

	// const items = useMemo(() => {
	// 	return Array.from({ length: pagesData.length }, (_, i) => i + 1);
	// }, [pagesData]);

	const getDataPage = useCallback(() => {
		if (searchIsEnabled) {
			return searchedMonitoringData;
		}

		if (pagesData.length) {
			if ("id" in pagesData[0]) {
				return pagesData;
			}

			const pages = Array.from({ length: pagesData.length }, (_, i) => {
				return { ...pagesData[i], id: i + 1 };
			}) as DataPage<T>[];

			return pages;
		}
		return [];
	}, [pagesData, searchedMonitoringData, searchIsEnabled]);

	const totalItems = getDataPage().length;
	const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
	const [currentPage, setCurrentPage] = useState(initialPage);

	const deletePageData = useCallback(
		(data: T) => {
			const editData = data as any;

			setPagesData((prev) => {
				const edit = prev as any;

				const d = edit.filter(
					(item: any) => item.Container !== editData.Container
				);

				return d.map((item: any, index: any) => {
					return {
						...item,
						id: index + 1,
					};
				});
			});

			setSearchedMonitoringData((prev) => {
				const edit = prev as any;

				return edit.filter(
					(item: any) => item.Container !== editData.Container
				);
			});
		},
		[setPagesData, setSearchedMonitoringData]
	);

	const searchPage = useCallback(
		(item: string) => {
			setSearchIsEnabled(true);

			if (item === "") {
				setSearchIsEnabled(false);

				setSearchedMonitoringData([]);
				return;
			}

			setSearchedMonitoringData(() => {
				const searcheted = pagesData.filter((predicate) => {
					const value = predicate as any;
					const test = value.Container.toLowerCase().includes(
						item.toLowerCase()
					);

					return test;
				});

				if (searcheted.length === 0) return searcheted;

				return searcheted.map((item, index) => {
					return {
						...item,
						id: index + 1,
					};
				});
			});
		},
		[pagesData, setSearchedMonitoringData, setSearchIsEnabled]
	);

	const editPageData = useCallback(
		(data: T) => {
			const editData = data as any;

			setPagesData((prev) => {
				const edit = prev as any;

				const value = edit.map((item: any) => {
					if (item.Container === editData.Container) {
						return {
							...item,
							...editData,
						};
					}
					return item;
				});

				return value.map((item: any, index: any) => {
					return {
						...item,
						id: index + 1,
					};
				});
			});

			setSearchedMonitoringData((prev) => {
				const edit = prev as any;

				const value = edit.map((item: any) => {
					if (item.Container === editData.Container) {
						return {
							...item,
							...editData,
						};
					}

					return item;
				});

				return value;
			});
		},
		[setPagesData, searchIsEnabled, setSearchedMonitoringData]
	);

	const getPage = useCallback(
		(page: number) => {
			const startIndex = (page - 1) * itemsPerPage;
			const d = getDataPage().slice(
				startIndex,
				startIndex + itemsPerPage
			);

			return d;
		},
		[pagesData, itemsPerPage, searchedMonitoringData]
	);

	const setPage = useCallback(
		(page: number) => {
			const newPage = Math.max(1, Math.min(page, totalPages));
			const currentData = getPage(newPage);

			setCurrentPage(newPage);
			if (onPageChange) onPageChange(currentData);
		},
		[totalPages, onPageChange, getPage]
	);

	const getRemainingPages = useCallback(() => {
		const page = getPage(currentPage);

		if (page.length) {
			if (page.length === itemsPerPage) return [];
			const data = Array.from(
				{ length: Math.abs(page.length - itemsPerPage) },
				(_, i) => {
					return {
						id: page.slice(-1)[0].id + i + 1,
					} as DataPage<T>;
				}
			);
			return data;
		}
	}, [currentPage, pagesData, searchedMonitoringData]);

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
		pagesData,
		totalItems,
		searchedMonitoringData,
		searchIsEnabled,
		searchPage,
		deletePageData,
		editPageData,
		setPagesData,
		getPage,
		getRemainingPages,
		nextPage,
		prevPage,
	};
}
