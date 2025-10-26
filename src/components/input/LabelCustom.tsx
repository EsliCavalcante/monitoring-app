import React from "react";

type LabelCustomProps = {
	children: React.ReactNode;
};

const LabelCustom = ({ children }: LabelCustomProps) => {
	const classCustom = `
		text-[clamp(0.8rem,1.9vw,1.2rem)]
		label-focus
	`;

	return <span className={classCustom}>{children}</span>;
};

export default LabelCustom;
