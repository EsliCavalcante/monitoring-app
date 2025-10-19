import { useState } from "react";
import { DataContext } from "./dataContext";
import type { SettingType, UploadedData } from "@/utils/@types";

type DataProviderProps = {
	children: React.ReactNode;
};

const DataProvider = (props: DataProviderProps) => {
	const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
	const [settings, setSettings] = useState<SettingType>({
		mv: " ",
		port: " ",
		voy: " ",
		status: "plug-in",
	});
	return (
		<DataContext.Provider
			value={{ settings, setSettings, uploadedData, setUploadedData }}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataProvider;
