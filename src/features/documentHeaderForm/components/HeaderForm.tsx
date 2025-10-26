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
						<label
							className="space-y-1.5 text-[#BBDCFF]/90"
							htmlFor="port"
						>
							<span className="block text-[12px]">PORT</span>
							<input
								defaultValue={data?.port}
								id="port"
								name="port"
								className="focus:outline-none  text-white text-[12px] px-4 py-2.5 border border-zinc-500 focus:ring-1 focus:ring-[#BBDCFF]   bg-[#201E32] rounded-xs   placeholder:normal-case placeholder:text-white/20 placeholder:text-[12px]   w-[100%] p-1.5 uppercase"
								type="text"
								placeholder="SANTOS"
							/>
						</label>
						<label
							className="space-y-1.5 text-[#BBDCFF]/90"
							htmlFor="m/v"
						>
							<span className="block text-[12px]">M/V</span>
							<input
								defaultValue={data?.mv}
								id="m/v"
								name={"mv"}
								className="focus:outline-none  text-white text-[12px] px-4 py-2.5 border border-zinc-500 focus:ring-1 focus:ring-[#BBDCFF]   bg-[#201E32] rounded-xs   placeholder:normal-case placeholder:text-white/20 placeholder:text-[12px]   w-[100%] p-1.5 uppercase"
								type="text"
								placeholder="LOG-IN JATOBÁ"
							/>
						</label>
						<label
							className="space-y-1.5 text-[#BBDCFF]/90"
							htmlFor="VOY N"
						>
							<span className="block text-[12px]">VOY N°</span>
							<input
								defaultValue={data?.voy}
								name={"voy"}
								id="VOY N"
								className="focus:outline-none  text-white text-[12px] px-4 py-2.5 border border-zinc-500 focus:ring-1 focus:ring-[#BBDCFF]   bg-[#201E32] rounded-xs   placeholder:normal-case placeholder:text-white/20 placeholder:text-[12px]   w-[100%] p-1.5 uppercase"
								type="text"
								placeholder="N125"
							/>
						</label>
						<label
							className="space-y-1.5 text-[#BBDCFF]/90"
							htmlFor="VOY N"
						>
							<span className="block text-[12px]">STATUS</span>
							<select
								defaultValue={data?.status}
								id="status"
								name="status"
								className="focus:outline-none text-base  text-white text-[12px] px-4 py-2.5 border border-zinc-500 focus:ring-1 focus:ring-[#BBDCFF]   bg-[#201E32] rounded-xs   placeholder:normal-case placeholder:text-white/20 placeholder:text-[12px]   w-[100%] p-1.5 uppercase"
							>
								<option value={"plug-in"}>plug-in</option>
								<option value={"plug-out"}>plug-out</option>
							</select>
						</label>
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
							className="px-6 py-6 md:w-40 cursor-pointer w-full  bg-custom-blue rounded-xs"
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
