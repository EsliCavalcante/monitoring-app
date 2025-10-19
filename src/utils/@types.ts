export type UploadedData = {
	id: number;
	Container: string;
	Temperature: number;
	Position: string;
	Supply: number;
	Return: number;
	Remarks: string;
};

export type SettingType = {
	port: string;
	mv: string;
	voy: string;
	status: "plug-in" | "plug-out";
};
