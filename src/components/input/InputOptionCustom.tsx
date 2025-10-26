import React from "react";

type InputOptionCustomProps = React.ComponentProps<"option">;

const InputOptionCustom = ({ value }: InputOptionCustomProps) => {
	return <option value={value}>{value}</option>;
};

export default InputOptionCustom;
