import { useCallback, useState } from "react";

type DataUploaded = {
	Container: string;
	Temperature: string;
	Position: string;
};

export function useMonitoringData() {
	const [monitoringData, setMonitoringData] = useState<DataUploaded[]>([]);
	const [searchedMonitoringData, setSearchedMonitoringData] = useState<
		DataUploaded[]
	>([]);

	// useEffect(() => {
	// 	setUploadedData(monitoringData as any);
	// }, [monitoringData]);

	const setMonitoring = useCallback(
		(data: {
			id: number;
			Container: string;
			Temperature: string;
			Position: string;
		}) => {
			setMonitoringData((prev) => {
				const value = prev.map((item) => {
					if (item.Container === data.Container) {
						return {
							...data,
						};
					}
					return item;
				});

				return value;
			});
		},
		[setMonitoringData]
	);

	const searchByContainer = useCallback(
		(value: string) => {
			if (value === "") return setSearchedMonitoringData([]);

			setSearchedMonitoringData(
				monitoringData.filter((item) => {
					const d = item as any;
					return d.Container.toLowerCase().includes(
						value.toLowerCase()
					);
				})
			);
		},
		[monitoringData, setSearchedMonitoringData]
	);

	const deleteMonitoring = useCallback(
		(Container: string) => {
			if (searchedMonitoringData.length) {
				setSearchedMonitoringData((prev) => {
					return prev.filter(
						(predicate) =>
							predicate.Container.toLowerCase() !==
							Container.toLowerCase()
					);
				});
			}

			setMonitoringData((prev) => {
				return prev.filter(
					(item) =>
						Container.toLowerCase() !== item.Container.toLowerCase()
				);
			});
		},
		[setMonitoringData, monitoringData]
	);

	return {
		monitoringData,
		searchedMonitoringData,
		searchByContainer,
		setMonitoring,
		setMonitoringData,
		deleteMonitoring,
	};
}
