import React from "react";
import { Button } from "../ui/button";

type ButtonProps = {
	children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

const Btn = ({ children, ...rest }: ButtonProps) => {
	return (
		<Button
			{...rest}
			className="flex-col  font-base bg-transparent group cursor-pointer hover:bg-transparent max-w-40 min-h-16 min-w-20 rounded-sm leading-4"
		>
			{children}
		</Button>
	);
};

export default Btn;
