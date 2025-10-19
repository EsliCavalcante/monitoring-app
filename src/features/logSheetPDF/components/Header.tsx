import type { SettingType } from "@/utils/@types";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 4,
	},

	logo: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		padding: 8,
		borderRadius: 4,
		border: "1px solid red",
	},

	"vessel-info": {
		display: "flex",
		flexDirection: "row",
	},

	vessel: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		border: "1px solid red",
		padding: 4,
		borderRadius: 4,
		flex: 3,
	},

	"vessel-text": {
		borderBottom: "1px solid black",
		fontSize: "0.5rem",
		width: "70%",
		height: 10,
		textTransform: "uppercase",
	},

	"vessel-label": {
		textTransform: "uppercase",
		fontSize: "0.5rem",
		fontWeight: "bold",
	},
});

const Header = (props: { settings: SettingType }) => {
	return (
		<View style={styles.header}>
			<View style={styles.logo}>
				<Image style={{ width: 120 }} src={"./reeferbras-logo.png"} />
			</View>

			<View style={styles.vessel}>
				<View style={{ ...styles["vessel-info"], flex: 1 / 3 }}>
					<Text style={styles["vessel-label"]}>port</Text>
					<Text style={styles["vessel-text"]}>
						{" " + props.settings?.port}
					</Text>
				</View>
				<View style={{ ...styles["vessel-info"], flex: 1 / 2 }}>
					<Text style={styles["vessel-label"]}>vessel</Text>
					<Text style={styles["vessel-text"]}>
						{" " + props.settings.mv}
					</Text>
				</View>
				<View style={{ ...styles["vessel-info"], flex: 1 / 3 }}>
					<Text style={styles["vessel-label"]}>voyage n°</Text>
					<Text style={{ ...styles["vessel-text"], paddingLeft: 6 }}>
						{" " + props.settings?.voy}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Header;
