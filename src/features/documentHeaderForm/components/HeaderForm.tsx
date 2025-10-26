import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";
import type { SettingType } from "@/utils/@types";
import { Btn, Icon, Text } from "@/components/ButtonTextIcon";
import {
	InputCustom,
	InputGroupCustom,
	InputOptionCustom,
	InputSelectCustom,
	LabelCustom,
} from "@/components/input";

type HeaderFormProps = {
	onSaveHeader: (data: SettingType) => void;
};

const HeaderForm = ({ onSaveHeader }: HeaderFormProps) => {
	const [isDialog, setIsDialog] = useState(false);
	const [data, setData] = useState<SettingType>({
		mv: "",
		port: "",
		status: "plug-in",
		voy: "",
	});

	return (
		<div>
			<Dialog
				open={isDialog}
				onOpenChange={(open) => {
					setIsDialog(!!open);
				}}
			>
				<DialogOverlay />
				<DialogTrigger asChild>
					<Btn>
						<Icon>
							<FilePen className="size-4" />
						</Icon>
						<Text>Cabeçalho</Text>
					</Btn>
				</DialogTrigger>
				<DialogContent
					className="min-w-[40%] border-0 font-base  bg-custom-geadient-blue-dark dark "
					onPointerDownOutside={(event) => {
						event.preventDefault();
					}}
				>
					<DialogHeader className="gap-4">
						<DialogTitle className="text-zinc-100 leading-6">
							Preencha as Informações do Cabeçalho
						</DialogTitle>
						<DialogDescription className="text-zinc-400">
							Insira as informações necessárias para a
							identificação e formatação do cabeçalho do seu
							documento. Esses dados aparecerão no topo de cada
							página.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							const port = formData.get("port") as string;
							const mv = formData.get("mv") as string;
							const voy = formData.get("voy") as string;
							const status = formData.get("status") as
								| "plug-in"
								| "plug-out";

							setData((prev) => ({
								...(prev ?? {}),
								port,
								mv,
								voy,
								status,
							}));
							onSaveHeader({ port, mv, voy, status });
							setIsDialog(false);
						}}
						id="form"
						className="flex flex-col gap-4"
					>
						<InputGroupCustom>
							<LabelCustom>PORT</LabelCustom>
							<InputCustom
								id="port"
								name="port"
								defaultValue={data?.port}
								placeholder="SANTOS"
							/>
						</InputGroupCustom>

						<InputGroupCustom>
							<LabelCustom>M/V</LabelCustom>
							<InputCustom
								id="mv"
								name="mv"
								defaultValue={data?.mv}
								placeholder="LOG-IN JATOBÁ"
							/>
						</InputGroupCustom>

						<InputGroupCustom>
							<LabelCustom>VOY N°</LabelCustom>
							<InputCustom
								id="voy"
								name="voy"
								defaultValue={data?.voy}
								placeholder="N125"
							/>
						</InputGroupCustom>

						<InputGroupCustom>
							<LabelCustom>Status</LabelCustom>
							<InputSelectCustom
								defaultValue={data?.status}
								id="status"
								name="status"
							>
								<InputOptionCustom value={"plug-in"} />
								<InputOptionCustom value={"plug-out"} />
							</InputSelectCustom>
						</InputGroupCustom>
					</form>
					<DialogFooter className="gap-4 mt-2.5">
						<DialogClose asChild>
							<Button
								variant={"secondary"}
								className="px-6 bg-transparent text-white border-white/50 border py-6 md:w-40 cursor-pointer w-full rounded-xs"
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button
							form="form"
							type="submit"
							className="px-6 py-6 md:w-40 cursor-pointer w-full text-white  bg-custom-blue rounded-xs"
						>
							Salvar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HeaderForm;
