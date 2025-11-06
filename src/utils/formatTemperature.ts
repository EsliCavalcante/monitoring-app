export function formatTemperature(value: number): string {
	// Se não for número válido, retornar string vazia para indicar ausência
	if (typeof value !== "number" || Number.isNaN(value)) return "";

	// Formata com 1 casa decimal e adiciona o sufixo °C

	if (value >= 0) {
		return `+${value.toFixed(1)}°C`;
	}
	return `${value.toFixed(1)}°C`;
}
