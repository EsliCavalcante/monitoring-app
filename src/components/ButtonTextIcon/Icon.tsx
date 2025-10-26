import React from "react";

type IconProps = {
	children: React.ReactNode;
	className?: string;
};

const Icon = ({ children, className }: IconProps) => {
	// Classes do Tailwind que você quer passar para o filho
	const childClasses =
		"relative top-1 group-disabled:text-white/30 size-[clamp(1rem,1.9vw,1.2rem)] group-hover:text-[#BBDCFF] text-zinc-100";

	let contentToRender: React.ReactNode = children;

	// 2. Verifica se 'children' é um elemento React VÁLIDO (exclui strings, arrays, etc.)
	if (React.isValidElement(children)) {
		// 3. Asserção de Tipo Temporária (se necessário) OU Acesso Seguro
		// Aqui, fazemos a asserção para que o TS entenda que 'children' tem 'props'
		const childElement = children as React.ReactElement<any>;

		// 4. Clona o elemento, combinando as classes existentes e as novas
		contentToRender = React.cloneElement(childElement, {
			// Pega as classes existentes do children (ou string vazia se não houver)
			// e adiciona as novas classes
			className: `${className || ""} ${childClasses}`,
		});
	}

	return <div>{contentToRender}</div>;
};

export default Icon;
