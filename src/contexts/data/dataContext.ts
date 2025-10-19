import type { SettingType, UploadedData } from "@/utils/@types";
import { createContext } from "react";

type DataContextType = {
	uploadedData: UploadedData[];
	settings: SettingType;
	setSettings: React.Dispatch<React.SetStateAction<SettingType>>;
	setUploadedData: React.Dispatch<React.SetStateAction<UploadedData[]>>;
};

export const DataContext = createContext<DataContextType | undefined>(
	undefined
);
