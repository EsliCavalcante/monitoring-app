import React from "react";

type TextProps = {
	children: React.ReactNode;
};

const Text = ({ children }: TextProps) => {
	return (
		<span className="text-[clamp(0.4rem,2vw,1rem)] group-disabled:text-white/30 text-zinc-100 group-hover:text-[#BBDCFF] text-wrap">
			{children}
		</span>
	);
};

export default Text;
