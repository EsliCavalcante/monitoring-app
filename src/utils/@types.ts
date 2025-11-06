export type UploadedData = {
	id: number;
	container: string;
	temperature: number | null;
	position?: string | null;
	supply: number | null;
	return: number | null;
	remarks: string | null;
};

export type SettingType = {
	port: string;
	mv: string;
	voy: string;
	status: "plug-in" | "plug-out";
};
