import { DataContext } from "@/contexts/data/dataContext";
import { useContext } from "react";

const useUploadedData = () => {
	const context = useContext(DataContext);

	if (!context) throw new Error("Context invalid");

	return context;
};

export default useUploadedData;
