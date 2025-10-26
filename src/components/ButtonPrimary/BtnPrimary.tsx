import React from "react";
import { Button } from "../ui/button";

type BtnPrimaryProps = {
	children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

const BtnPrimary = ({ children, ...rest }: BtnPrimaryProps) => {
	return (
		<Button
			{...rest}
			className="
			flex-col font-base bg-custom-blue disabled:bg-custom-blue/30  group cursor-pointer group hover:bg-custom-blue/30 max-w-30 min-h-15 min-w-30 rounded-sm leading-4
			"
		>
			<p className="text-wrap text-[clamp(0.8rem,2vw,1rem)] group-disabled:text-white/30 group-hover:text-zinc-100/50">
				{children}
			</p>
		</Button>
	);
};

export default BtnPrimary;
