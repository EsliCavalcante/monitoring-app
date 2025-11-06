import type { UploadedData } from "@/utils/@types";
import { formatTemperature } from "@/utils/formatTemperature";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

export const even = (positionCurrent: number) => {
	return positionCurrent % 2 === 1 ? styles.evenRow : styles.oddRow;
};

export const odd = (positionCurrent: number) => {
	return positionCurrent % 2 === 0 ? styles.evenRow : styles.oddRow;
};

const styles = StyleSheet.create({
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
		fontSize: 8,
	},

	"text-uppercase": { textTransform: "uppercase" },

	oddRow: { backgroundColor: "#d6d6d6", padding: 5 },
	evenRow: { backgroundColor: "#ffffff", padding: 5 },
});

const Table = (props: {
	pagesSliceted: UploadedData[];
	numbersSliceted: number[];
	blankPageItems: number[];
}) => {
	const headers = [
		"Qty",
		"Container",
		"Position",
		"Temp",
		"Supply",
		"Return",
		"Remarks",
	];
	const colWidths = ["5%", "12%", "10%", "11%", "9%", "9%", "48%"];

	const totalPagesRemaining = 30 - (props.pagesSliceted.length % 30 || 30);

	return (
		<View style={styles.table}>
			<View style={styles.row}>
				{headers.map((header, index) => (
					<View
						key={index}
						style={[
							styles.colHeader,
							{
								width: colWidths[index],
							},
						]}
					>
						<Text>{header}</Text>
					</View>
				))}
			</View>

			{/* Table Data */}
			{props.pagesSliceted.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[0],
							},
							odd(rowIndex),
						]}
					>
						<Text>{props.numbersSliceted[rowIndex] || " "}</Text>
					</View>
					<View
						style={[
							styles.tableCol,

							{
								fontWeight: "600",
								textAlign: "left",
								width: colWidths[1],
							},
							odd(rowIndex),
						]}
					>
						<Text style={styles["text-uppercase"]}>
							{row.container || " "}
						</Text>
					</View>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[2],
							},
							odd(rowIndex),
						]}
					>
						<Text>{row.position || " "}</Text>
					</View>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[3],
							},
							odd(rowIndex),
						]}
					>
						<Text>
							{row.temperature !== null
								? formatTemperature(row.temperature)
								: " "}
						</Text>
					</View>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[4],
							},
							odd(rowIndex),
						]}
					>
						<Text>
							{row.supply === null
								? " "
								: formatTemperature(row.supply)}
						</Text>
					</View>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[5],
							},
							odd(rowIndex),
						]}
					>
						<Text>
							{row.return === null
								? " "
								: formatTemperature(row.return)}
						</Text>
					</View>
					<View
						style={[
							styles.tableCol,
							{
								width: colWidths[6],
								borderRightWidth: 0,
							},
							odd(rowIndex),
						]}
					>
						<Text>{row.remarks || " "}</Text>
					</View>
				</View>
			))}

			{Array.from({
				length: totalPagesRemaining,
			}).map((_, rowIndex) => {
				return (
					<View key={rowIndex} style={styles.row}>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[0],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{props.blankPageItems[rowIndex]}</Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[1],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[2],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[3],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[4],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[5],
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
						<View
							style={[
								styles.tableCol,
								{
									width: colWidths[6],
									borderRightWidth: 0,
								},
								totalPagesRemaining % 2 == 0
									? odd(rowIndex)
									: even(rowIndex),
							]}
						>
							<Text>{""} </Text>
						</View>
					</View>
				);
			})}
		</View>
	);
};

export default Table;
