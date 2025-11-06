/**
 * Extrai o primeiro número encontrado em uma string e retorna como number.
 * Exemplo: "as-18.0asd" -> -18
 *
 * Regras:
 * - Procura por um número com sinal opcional e parte decimal opcional (ex: -12, 3.5, +4.2)
 * - Suporta "," como separador decimal (substitui por "." antes do parse)
 * - Retorna NaN se nenhum número for encontrado
 */
export function parseToNumber(input: number | string): number {
	if (input == null) return NaN;
	const s = String(input);

	// Tratar números entre parênteses como negativos: (12) => -12
	const paren = s.match(/\(([\d.,+-]+)\)/);
	const source = paren ? `-${paren[1]}` : s;

	// Encontrar a primeira ocorrência de número com sinal e decimais opcionais
	const match = source.match(/[+-]?\d+(?:[.,]\d+)?/);
	if (!match) return NaN;

	// Normalizar separador decimal para ponto e remover espaços
	const normalized = match[0].replace(/\s+/g, "").replace(",", ".");

	const value = Number(normalized);
	return Number.isFinite(value) ? value : NaN;
}
