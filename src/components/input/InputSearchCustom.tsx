import { Search } from "lucide-react";
import React from "react";

type InputSearchCustomProps = React.ComponentProps<"input">;

const InputSearchCustom = ({ ...rest }: InputSearchCustomProps) => {
	const classInputCustom = `
		border-gray-500 border p-[clamp(0.3rem,2vw,0.2rem)] pl-11
		min-w-full rounded-xs bg-[#333241] 
		text-[clamp(0.8rem,1.9vw,1.1rem)]
		placeholder:text-zinc-500/95
		focus:outline-none focus:border-none
		focus:ring focus:ring-[#BBDCFF]
		uppercase placeholder:text-[11px] focus:pl-2
		placeholder:normal-case placeholder:text-[clamp(0.7rem,1.9vw,1.1rem)]
		disabled:bg-gray-100/10 disabled:border-gray-100/5 disabled:placeholder-gray-100/10
	`;

	return (
		<div className="relative [&:has(input:focus)>.search-hidden]:hidden [&:has(input:disabled)>.search-hidden]:text-white/10">
			<Search className="absolute size-[clamp(1.2rem,3vw,1.6rem)] search-hidden   top-1/5 left-2" />

			<input {...rest} className={classInputCustom} type="search" />
		</div>
	);
};

export default InputSearchCustom;
