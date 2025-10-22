import { Button } from "@/components/ui/button";

import { pdf } from "@react-pdf/renderer";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Download, Settings, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import { parseToXLS } from "@/utils/parseToXLS";

import useUploadedData from "@/hooks/useUploadedData";
import { useEffect, useRef, useState } from "react";
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
import DocumentPDF from "@/features/logSheetPDF/components/Document";
import UploadButton from "@/features/temperatureMonitoring/components/UploadButton";
import { usePagination } from "@/features/temperatureMonitoring/hooks/usePagination";
import { formatTemperature } from "@/utils/formatTemperature";
import { temperatureGenarete } from "@/utils/temperatureGenerate";
import { Spinner } from "@/components/ui/spinner";

type DataUploaded = {
	id: number;
	Container: string;
	Temperature: number | null;
	Position: string;
	Supply: number | null;
	Return: number | null;
	Remarks: string;
};

const TemperatureListPage = () => {
	const { uploadedData, setUploadedData, setSettings, settings } =
		useUploadedData();

	const {
		getRemainingPages,
		editPageData,
		nextPage,
		prevPage,
		setPagesData,
		deletePageData,
		searchPage,
		currentData,
		currentPage,
		totalPages,
		pagesData,
		totalItems,
	} = usePagination<DataUploaded>({
		itemsPerPage: 16,
		data: uploadedData,
	});

	const navigate = useNavigate();
	const [isDialog, setIsDialog] = useState(false);
	const [isPdfLoading, setIsPdfLoading] = useState(false);

	useEffect(() => {
		if (pagesData.length > 0) {
			setUploadedData(() => [...pagesData]);
		}
	}, [pagesData]);

	async function handleOpenPdf() {
		setIsPdfLoading(true);
		const blob = await pdf(
			<DocumentPDF data={uploadedData} settings={settings} />
		).toBlob();
		setIsPdfLoading(false);
		const blobUrl = URL.createObjectURL(blob);

		window.open(blobUrl, "_blank");
		setTimeout(() => URL.revokeObjectURL(blobUrl), 6000);
	}

	async function handleDownloadPdf() {
		const documentName =
			settings.mv === " " ? "Relatorio" : settings.mv.trim();
		setIsPdfLoading(true);

		const blob = await pdf(
			<DocumentPDF data={uploadedData} settings={settings} />
		).toBlob();

		setIsPdfLoading(false);

		const blobUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = blobUrl;
		link.download = `${documentName}_${new Date().toLocaleDateString()}.pdf`; // nome do arquivo
		document.body.appendChild(link);
		link.click();

		// limpeza
		document.body.removeChild(link);
		URL.revokeObjectURL(blobUrl);
	}

	const inputTempRef = useRef<HTMLInputElement>(null);

	return (
		<div
			className="
				w-dvw h-dvh relative
				grid grid-rows-[10%_89%] p-2 sm:p-0 gap-2
			"
		>
			{isPdfLoading && (
				<div className="absolute flex items-center justify-center z-10 h-screen w-screen bg-white/70">
					<Spinner className="size-12" />
				</div>
			)}

			<div className=" ring-gray-300 ring bg-gray-50  rounded-sm sm:rounded-none">
				<div className="container  dark:bg-zinc-800 flex justify-between items-center mx-auto px-3  h-full text-lg sm:text-3xl">
					<h2 className="">Monitoramento de temperatura </h2>
					<Button
						disabled={uploadedData.length > 0 ? false : true}
						onClick={handleOpenPdf}
						className="lg:hidden rounded-xs"
					>
						Visualização
					</Button>
					{uploadedData.length > 0 && (
						<Button
							onClick={() =>
								navigate("/temperature-monitoring-preview")
							}
							variant={"outline"}
							className="rounded-xs hidden xl:block cursor-pointer"
						>
							Pré-visualização
						</Button>
					)}
				</div>
			</div>
			<div className="container mx-auto  p-2  ring-offset-1 ring-gray-300 ring bg-gray-50  rounded-xs ">
				<div className="h-[100%]  grid grid-rows-[30%_60%_10%] lg:grid-rows-[10%_80%_10%] ">
					<div className="p-2 flex  flex-col items-center lg:flex-row justify-between py-4    border-b-2">
						<h2 className="text-md font-medium  w-full lg:w-fit pt-5 lg:p-0 order-3 lg:order-1 md:text-2xl">
							Tabela de Dados de Temperatura
						</h2>
						<div className="order-2 w-[100%] sm:w-[60%] md:w-[60%] lg:w-[30%] border-2">
							<input
								onChange={(e) =>
									searchPage(e.currentTarget.value)
								}
								placeholder="Ex: MNBU1234567"
								className=" focus:outline-none placeholder:normal-case  border-1 border-zinc-700 focus:ring-2  focus:ring-blue-400 w-[100%] p-1.5 uppercase"
								type="search"
							/>
						</div>
						<div className="flex w-full lg:w-fit justify-end   order-1 lg:order-3 gap-3 sm:gap-4 ">
							<div className="flex order-2 flex-col items-center">
								<UploadButton
									onChangeFile={async (arrayBuffer, file) => {
										if (
											file.type !==
											"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
										) {
											throw new Error("Arquivo Inválido");
										}
										const data = await parseToXLS<
											DataUploaded[]
										>(arrayBuffer);
										const value = data.map(
											(item, index) => {
												return {
													...item,
													Temperature: Number(
														item.Temperature
													),
													Position: item.Position,
													Supply: null,
													Return: null,
													id: index + 1,
												};
											}
										);
										setPagesData(value);

										setUploadedData(value);
									}}
								>
									{(ref) => (
										<Button
											className="rounded-full size-8 cursor-pointer"
											size={"icon"}
											variant={"outline"}
											onClick={() => ref.current?.click()}
										>
											<Upload className="size-4" />
										</Button>
									)}
								</UploadButton>
							</div>
							<div className="order-1">
								{uploadedData.length > 0 && (
									<Button
										className="rounded-full size-8 cursor-pointer"
										onClick={handleDownloadPdf}
									>
										<Download />
									</Button>
								)}
							</div>
							<div className="order-3">
								<Dialog
									open={isDialog}
									onOpenChange={(open) => {
										setIsDialog(!!open);
									}}
								>
									<DialogOverlay />
									<DialogTrigger asChild>
										<Button
											variant={"outline"}
											className="cursor-pointer size-8 rounded-full"
										>
											<Settings className="size-4" />
										</Button>
									</DialogTrigger>
									<DialogContent
										className="min-w-[40%]"
										onPointerDownOutside={(event) => {
											event.preventDefault();
										}}
									>
										<DialogHeader>
											<DialogTitle>
												Preencha as Informações do
												Cabeçalho
											</DialogTitle>
											<DialogDescription>
												Insira as informações
												necessárias para a identificação
												e formatação do cabeçalho do seu
												documento. Esses dados
												aparecerão no topo de cada
												página.
											</DialogDescription>
										</DialogHeader>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const formData = new FormData(
													e.currentTarget
												);
												const port = formData.get(
													"port"
												) as string;
												const mv = formData.get(
													"mv"
												) as string;
												const voy = formData.get(
													"voy"
												) as string;
												const status = formData.get(
													"status"
												) as "plug-in" | "plug-out";

												setSettings((prev) => ({
													...(prev ?? {}),
													port,
													mv,
													voy,
													status,
												}));
												setIsDialog(false);
											}}
											id="form"
											className="flex flex-col gap-4"
										>
											<label
												className="space-y-1.5"
												htmlFor="port"
											>
												<span className="block">
													PORT
												</span>
												<input
													defaultValue={
														settings?.port
													}
													id="port"
													name="port"
													className="p-2.5 w-full border uppercase"
													type="text"
													placeholder="SANTOS"
												/>
											</label>
											<label
												className="space-y-1.5"
												htmlFor="m/v"
											>
												<span className="block">
													M/V
												</span>
												<input
													defaultValue={settings?.mv}
													id="m/v"
													name={"mv"}
													className="p-2.5 w-full border uppercase"
													type="text"
													placeholder="LOG-IN JATOBÁ"
												/>
											</label>
											<label
												className="space-y-1.5"
												htmlFor="VOY N"
											>
												<span className="block">
													VOY N°
												</span>
												<input
													defaultValue={settings?.voy}
													name={"voy"}
													id="VOY N"
													className="p-2.5 w-full border uppercase"
													type="text"
													placeholder="N125"
												/>
											</label>
											<label
												className="space-y-1.5"
												htmlFor="VOY N"
											>
												<span className="block">
													STATUS
												</span>
												<select
													defaultValue={
														settings?.status
													}
													id="status"
													name="status"
													className="p-2 w-30 border text-base"
												>
													<option value={"plug-in"}>
														plug-in
													</option>
													<option value={"plug-out"}>
														plug-out
													</option>
												</select>
											</label>
										</form>
										<DialogFooter className="">
											<DialogClose asChild>
												<Button
													variant={"outline"}
													className="px-6 py-6 md:w-40 cursor-pointer w-full"
												>
													Close
												</Button>
											</DialogClose>
											<Button
												form="form"
												type="submit"
												className="px-6 py-6 md:w-40 cursor-pointer w-full"
											>
												Salvar
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</div>
					{/* Table */}
					<div className="relative overflow-auto w-1/1 ">
						<div className={`w-1/1`} id="table">
							<Table className="text-xs sm:text-sm ">
								<TableHeader className="sm:h-14">
									<TableRow className="hover:bg-transparent">
										<TableHead className="w-10 text-center">
											Qty{" "}
										</TableHead>
										<TableHead className="w-10 space-x-2 text-left">
											<p className="inline-block">
												Container
											</p>
										</TableHead>
										<TableHead className="w-31 space-x-2 text-center">
											<p className="inline-block">
												Temperature
											</p>
										</TableHead>
										<TableHead className="w-15 space-x-2 text-center">
											<p className="inline-block">
												Position
											</p>
										</TableHead>
										<TableHead className="w-15 text-center">
											Supply
										</TableHead>
										<TableHead className="w-15  text-center">
											Return
										</TableHead>
										<TableHead className="w-180   text-center">
											Remarks
										</TableHead>
										<TableHead className="w-18  text-left">
											Action
										</TableHead>
									</TableRow>
								</TableHeader>

								<TableBody>
									{currentData &&
										currentData.map((page, index) => (
											<TableRow
												key={index}
												className="sm:h-10 hover:bg-gray-200"
											>
												<TableCell className="text-center">
													{page.id}
												</TableCell>
												<TableCell className="text-left">
													{page.Container}
												</TableCell>
												<TableCell className="text-center">
													<input
														ref={inputTempRef}
														key={page.Temperature}
														onBlur={(e) => {
															const value =
																e.currentTarget
																	.value;

															editPageData({
																...page,
																Temperature:
																	value ===
																		"" ||
																	value ===
																		" "
																		? null
																		: Number(
																				value.split(
																					"ºC"
																				)[0]
																		  ),
															});
														}}
														className="text-center outline-0"
														type="text"
														defaultValue={(() => {
															if (
																page.Temperature ===
																null
															) {
																return " ";
															}
															return formatTemperature(
																Number(
																	page.Temperature
																)
															);
														})()}
													/>
												</TableCell>
												<TableCell className="text-center">
													{page.Position}
												</TableCell>
												<TableCell className="text-center">
													<input
														key={page.Supply}
														onBlur={(e) => {
															const value =
																e.currentTarget
																	.value;

															editPageData({
																...page,
																Supply:
																	value ===
																		"" ||
																	value ===
																		" "
																		? null
																		: Number(
																				value.split(
																					"ºC"
																				)[0]
																		  ),
															});
														}}
														className="text-center outline-0"
														type="text"
														defaultValue={(() => {
															if (
																page.Supply ===
																null
															) {
																return " ";
															}

															return formatTemperature(
																Number(
																	page.Supply
																)
															);
														})()}
													/>
												</TableCell>
												<TableCell className="text-center">
													<input
														key={page.Return}
														onBlur={(e) => {
															const value =
																e.currentTarget
																	.value;
															editPageData({
																...page,
																Return:
																	value ===
																		"" ||
																	value ===
																		" "
																		? null
																		: Number(
																				value.split(
																					"ºC"
																				)[0]
																		  ),
															});
														}}
														className="text-center outline-0"
														type="text"
														defaultValue={(() => {
															if (
																page.Return ===
																null
															) {
																return " ";
															}
															return formatTemperature(
																Number(
																	page.Return
																)
															);
														})()}
													/>
												</TableCell>
												<TableCell className="text-center">
													<input
														key={page.Remarks}
														onBlur={(e) => {
															const value =
																e.currentTarget
																	.value;
															editPageData({
																...page,
																Remarks: value,
															});
														}}
														className="text-center outline-0"
														type="text"
														defaultValue={
															page.Remarks
														}
													/>
												</TableCell>
												<TableCell className="text-center">
													<Button
														onClick={() => {
															deletePageData(
																page
															);
														}}
														className="cursor-pointer"
														size={"icon"}
														variant={"ghost"}
													>
														<Trash2 className="stroke-2 stroke-red-700" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									{getRemainingPages()?.map((item, i) => (
										<TableRow
											key={i}
											className="sm:h-10 hover:bg-gray-200"
										>
											<TableCell className="text-center">
												{item.id}
											</TableCell>
											<TableCell className="text-left">
												{""}
											</TableCell>
											<TableCell className="text-center">
												{""}
											</TableCell>
											<TableCell className="text-center">
												{""}
											</TableCell>
											<TableCell className="text-center">
												{""}
											</TableCell>
											<TableCell className="text-center">
												{""}
											</TableCell>
											<TableCell className="text-center">
												{""}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
					<div className="p-2 py-4 border-t-2 flex items-center">
						<div className="flex-1 ">
							<div>
								<Button
									className="text-xs rounded-xs"
									onClick={() => {
										setPagesData((prev) => {
											return prev.map((item) => {
												return {
													...item,
													Supply:
														item.Temperature ===
														null
															? null
															: temperatureGenarete().supply(
																	item.Temperature
															  ),
													Return:
														item.Temperature ===
														null
															? null
															: temperatureGenarete().return(
																	item.Temperature
															  ),
												};
											});
										});
									}}
								>
									Gerar Temp
								</Button>
							</div>
						</div>
						<div className="flex justify-center text-xs flex-3  gap-1   mx-auto">
							<div>
								<Button
									className="rounded-full size-7"
									size={"sm"}
									onClick={() => prevPage()}
								>
									{"<"}
								</Button>{" "}
								{currentPage}
								{" de "}
								{totalPages}{" "}
								<Button
									className="rounded-full size-7"
									size={"sm"}
									onClick={() => nextPage()}
								>
									{">"}
								</Button>
							</div>
						</div>
						<div className="flex-1  text-xs sm:text-sm text-slate-900">
							<div>Total de registros: {totalItems}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TemperatureListPage;
