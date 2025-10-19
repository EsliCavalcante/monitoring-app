export function formatTemperature(value: number): string {
	if (value.toString().split("°").length > 1)
		return value.toString().split("°")[0].trim() + "ºC";

	const parseNumber = Number(value);

	if (parseNumber >= 0.0 && parseNumber <= 0.9) {
		if (parseNumber === 0.0) return `+${parseNumber.toPrecision(2)}ºC`;
		return `+${parseNumber.toPrecision(1)}ºC`;
	}

	if (parseNumber > 0) {
		return parseNumber > 0 && parseNumber < 10
			? `+${parseNumber.toPrecision(2)}ºC`
			: `+${parseNumber.toPrecision(3).padEnd(3, "0")}ºC`;
	}

	if (parseNumber < -0.0 && parseNumber >= -0.9) {
		return `${parseNumber.toPrecision(1)}ºC`;
	}

	return parseNumber < 0 && parseNumber > -10
		? `${parseNumber.toPrecision(2)}ºC`
		: `${parseNumber.toPrecision(3).padEnd(3, "0")}ºC`;
}
