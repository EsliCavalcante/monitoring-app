import React from "react";

type InputCustomProps = React.ComponentProps<"input">;

const InputCustom = ({ children, className, ...rest }: InputCustomProps) => {
	const classCustom = `
		border-gray-500 border p-1.5 pl-4
		min-w-full rounded-xs bg-[#3a384b]
		text-[clamp(0.9rem,1.9vw,1.1rem)]
		placeholder:text-zinc-500/95
		focus:outline-none focus:border-none
		focus:ring focus:ring-[#BBDCFF]
		uppercase p-[clamp(0.3rem,2vw,0.2rem)]
		
	`;

	return <input className={classCustom} {...rest}></input>;
};

export default InputCustom;
