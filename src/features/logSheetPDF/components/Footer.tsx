import type { SettingType } from "@/utils/@types";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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

const Checkbox = ({ label }: { checked: boolean; label: string }) => (
	<View style={styles.row}>
		<Text style={styles.label}>{label}</Text>
		<View style={styles["box-checked"]}>
			<Image
				style={{ width: 8 }}
				src={`${import.meta.env.BASE_URL}/vector.png`}
			/>
		</View>
	</View>
);

const Footer = (props: {
	pageNumber: number;
	totalPages: number;
	settings: SettingType;
}) => {
	return (
		<View>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 10,
					paddingVertical: 5,

					marginLeft: 4,
				}}
			>
				{props.settings.status === "plug-in" ? (
					<Checkbox checked={true} label={"PLUG-IN"} />
				) : (
					<Checkbox checked={true} label={"PLUG-OUT"} />
				)}

				<View
					style={[
						styles["header-form-hora"],
						{ border: "0px solid red" },
					]}
				>
					<View
						style={{
							...styles.form,
							width: "50%",
						}}
					>
						<Text style={styles["header-inputs"]}>
							ARRIVAL TIME
						</Text>
						<Text
							style={{
								...styles["header-input-text"],
								flex: 1,
							}}
						></Text>
					</View>
					<View
						style={{
							...styles.form,
							width: "50%",
						}}
					>
						<Text style={styles["header-inputs"]}>
							DEPARTURE TIME
						</Text>
						<Text
							style={{
								...styles["header-input-text"],
								flex: 1,
							}}
						></Text>
					</View>
				</View>
			</View>

			{/* footer form 2 */}
			<View
				style={{
					...styles.header,
					marginTop: 0,

					height: 70,
				}}
			>
				<View style={{ ...styles["header-form"] }}>
					<View style={{ ...styles.form, flex: 3 }}>
						<Text style={styles["header-inputs"]}>DATE</Text>
						<Text
							style={{
								...styles["header-input-text"],
								flex: 1,
							}}
						></Text>
					</View>
					<View style={{ ...styles.form, flex: 8 }}>
						<Text style={styles["header-inputs"]}>
							SIGNATURE/STAMP
						</Text>
						<Text
							style={{
								...styles["header-input-text"],
								flex: 1,
							}}
						></Text>
					</View>
					<View style={{ ...styles.form, flex: 9 }}>
						<Text style={styles["header-inputs"]}>
							REEFERBRAS SIGNATURE/STAMP
						</Text>
						<Text
							style={{
								...styles["header-input-text"],
								flex: 1,
							}}
						></Text>
					</View>
				</View>
			</View>

			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 6,
				}}
			>
				<Text style={{ fontSize: 8 }}>
					página {props.pageNumber} de {props.totalPages}
				</Text>
			</View>
		</View>
	);
};

export default Footer;
