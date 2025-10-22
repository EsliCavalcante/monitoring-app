export type UploadedData = {
	id: number;
	Container: string;
	Temperature: number | null;
	Position: string;
	Supply: number | null;
	Return: number | null;
	Remarks: string;
};

export type SettingType = {
	port: string;
	mv: string;
	voy: string;
	status: "plug-in" | "plug-out";
};
