import { StyleSheet } from "@react-pdf/renderer";

export const styleHeader = StyleSheet.create({
	page: {
		padding: 10,
	},

	["header-logo"]: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 2,
		padding: 0,
		borderRadius: 4,
		border: "1px solid red",
	},

	header: {
		display: "flex",
		flexDirection: "row",
		gap: 4,
	},

	input: {
		borderBottom: "1px solid black",
		fontSize: "0.5rem",
		width: "80%",
		height: 10,
		textTransform: "uppercase",
		paddingLeft: 8,
	},
	form: {
		display: "flex",
		flexDirection: "row",
		height: "12px",
	},

	"input-label": {
		fontSize: "0.5rem",
		fontWeight: "bold",
	},
});

export const tableStyles = StyleSheet.create({
	table: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 0,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		textAlign: "center",
		fontStyle: "normal",
	},

	colHeader: {
		borderColor: "#b66f6f",
		textAlign: "center",
		textTransform: "capitalize",
		paddingHorizontal: 4,
		paddingVertical: 5,
		fontSize: 9,
		backgroundColor: "#d81f1f",
		color: "#fff",
		fontWeight: "600",
	},

	tableCol: {
		fontWeight: "500",
		borderRightWidth: 0.8,
		borderColor: "rgb(163, 163, 163)",
		fontSize: 7,
	},

	oddRow: { backgroundColor: "#d6d6d6", padding: 5 },
	evenRow: { backgroundColor: "#ffffff", padding: 5 },
});

export const checkBoxStyle = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
	},

	label: {
		fontSize: 9,
		fontWeight: "bold",
		marginRight: 2,
	},

	["box-checked"]: {
		width: 12,
		height: 12,

		borderRadius: 2,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
	},
	["box-no-checked"]: {
		width: 12,
		height: 12,

		borderRadius: 2,
		border: "1px solid black",
		alignItems: "center",
		justifyContent: "center",
	},
});

export const FooterStyle = StyleSheet.create({
	header: {
		display: "flex",
		height: 70,
		gap: 6,
		padding: 2,
		flexDirection: "row",
	},
	["header-form-hora"]: {
		display: "flex",

		width: "60%",
		alignItems: "center",
		gap: 0,
		flexDirection: "row",
		flex: 6,
		padding: 14,
		borderRadius: 6,
		border: "1px solid red",
	},

	form: {
		display: "flex",
		flexDirection: "row",
		height: "12px",
	},

	["header-inputs"]: {
		fontSize: "0.5rem",
		fontWeight: "bold",
	},

	["header-form"]: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 0,
		flexDirection: "row",
		flex: 6,
		padding: 4,
		borderRadius: 6,
		border: "1px solid red",
	},

	["header-input-text"]: {
		borderBottom: "1px solid black",
		fontSize: "0.5rem",
		height: 10,

		paddingLeft: 6,
	},
});

export const even = (positionCurrent: number) => {
	return positionCurrent % 2 === 1 ? tableStyles.evenRow : tableStyles.oddRow;
};

export const odd = (positionCurrent: number) => {
	return positionCurrent % 2 === 0 ? tableStyles.evenRow : tableStyles.oddRow;
};
