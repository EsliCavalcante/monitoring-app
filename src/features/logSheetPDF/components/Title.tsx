import { View, Text } from "@react-pdf/renderer";

const Title = () => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				marginVertical: 12,
			}}
		>
			<View
				style={{
					borderBottom: "1px solid red",
					flex: 1,
				}}
			/>
			<Text
				style={{
					fontSize: 11,
					fontWeight: "500",
					color: "red",
				}}
			>
				REFRIGETERATED CONTAINER TEMPERATURE LOG SHEET
			</Text>
			<View
				style={{
					borderBottom: "1px solid red",
					flex: 1,
				}}
			/>
		</View>
	);
};

export default Title;
