import { Btn, Icon, Text } from "@/components/ButtonTextIcon";
import type { UploadedData } from "@/utils/@types";
import { ThermometerSnowflake } from "lucide-react";
import React from "react";
import { temperatureGenaretor } from "../utils/temperatureGenerator";
import type { Button } from "@/components/ui/button";

type TempGeneratorBtnProps = {
	data: UploadedData[];
	onGeneratorTemp: (data: UploadedData[]) => void;
} & React.ComponentProps<typeof Button>;

const TempGeneratorBtn = ({
	data,
	onGeneratorTemp,
	...rest
}: TempGeneratorBtnProps) => {
	return (
		<Btn
			{...rest}
			onClick={() => {
				const value = data.map((item) => {
					return {
						...item,
						supply:
							item.temperature !== null
								? temperatureGenaretor().supply(
										item.temperature
								  )
								: null,
						return:
							item.temperature !== null
								? temperatureGenaretor().return(
										item.temperature
								  )
								: null,
					} as UploadedData;
				});

				onGeneratorTemp(value);
			}}
		>
			<Icon>
				<ThermometerSnowflake />
			</Icon>
			<Text>Gerar Temp</Text>
		</Btn>
	);
};

export default TempGeneratorBtn;
