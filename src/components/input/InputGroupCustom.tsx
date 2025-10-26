import React from "react";

type InputGroupCustomProps = React.ComponentProps<"label">;

const InputGroupCustom = ({ className, children }: InputGroupCustomProps) => {
	const classCustom = `
		flex flex-col  text-white
		min-w-full font-base gap-[clamp(0rem,0.5vw,1.2rem)]
		[&:has(input:focus)>.label-focus]:text-[#BBDCFF]
		[&:has(select:focus)>.label-focus]:text-[#BBDCFF]
		[&:has(input:disabled)>.label-focus]:text-white/20
		
	`;

	return <label className={className + classCustom}>{children}</label>;
};

export default InputGroupCustom;
