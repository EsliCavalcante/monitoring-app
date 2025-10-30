import { Button } from "@/components/ui/button";
// ThermometerSnowflake
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Trash2 } from "lucide-react";

import useUploadedData from "@/hooks/useUploadedData";
import { useEffect, useRef, useState } from "react";

import { usePagination } from "@/features/temperatureMonitoring/hooks/usePagination";
import { formatTemperature } from "@/utils/formatTemperature";

import { Spinner } from "@/components/ui/spinner";

import { DownloadBtn } from "@/features/monitoringDownload";

import { HeaderForm } from "@/features/documentHeaderForm";
import { ArchiveUplodBtn } from "@/features/uploadArchive";
import type { UploadedData } from "@/utils/@types";
import TempGeneratorBtn from "@/features/temperatureGenerator/components/TempGeneratorBtn";
import {
	InputGroupCustom,
	InputSearchCustom,
	LabelCustom,
} from "@/components/input";

import React, { Suspense } from "react";

const TemperatureListPage = () => {
	const { uploadedData, setUploadedData, setSettings, settings } =
		useUploadedData();
	const LazyPreviewBtn = React.lazy(
		() => import("../features/documentPreview/components/PreviewBtn")
	);
	const LazyDownloadBtn = React.lazy(
		() => import("../features/monitoringDownload/components/DownloadBtn")
	);
	const {
		getRemainingPages,
		editPageData,
		nextPage,
		prevPage,
		setOriginalData,
		deletePageData,
		setSearchByContainer,
		originalData,
		searchByContainer,
		currentData,
		currentPage,
		totalPages,

		totalItems,
		searchIsEnabled,
	} = usePagination<UploadedData>({
		itemsPerPage: 16,
		data: uploadedData,
	});
	const { pagesSliceted, numbersSliceted } = currentData;
	const [isPdfLoading, setIsPdfLoading] = useState(false);

	useEffect(() => {
		if (originalData.length > 0) {
			setUploadedData(() => [...originalData]);
		}
	}, [originalData]);

	const inputTempRef = useRef<HTMLInputElement>(null);

	return (
		<div
			className="
			overflow-y-scroll	
				bg-custom-dark
				w-dvw h-dvh relative
				grid grid-rows-[16%_10%_70%] p-4 sm:p-0 gap-5
			"
		>
			{isPdfLoading && (
				<div className="absolute flex items-center justify-center z-10 h-screen w-screen bg-white/70">
					<Spinner className="size-12" />
				</div>
			)}

			<div className="font-base  bg-gradient-to-l from-custom-geadient-blue to-custom-geadient-blue-dark  rounded-xs sm:rounded-none">
				<div className="container   flex justify-between items-center mx-auto px-3  h-full text-lg sm:text-3xl">
					<h2 className="text-[clamp(1rem,5vw,1.5rem)] leading-tight text-white">
						Monitoramento de temperatura{" "}
					</h2>

					<Suspense fallback={<div>Carregado documento...</div>}>
						<LazyPreviewBtn
							disabled={uploadedData.length > 0 ? false : true}
							data={uploadedData}
							setting={settings}
							onChangeFile={(isLoading) => {
								setIsPdfLoading(isLoading);
							}}
						/>
					</Suspense>
				</div>
			</div>
			<div className="font-base    bg-gradient-to-r from-custom-geadient-blue to-custom-geadient-blue-dark  rounded-xs sm:rounded-none">
				<div className="container flex  justify-evenly items-center mx-auto h-full text-lg ">
					<HeaderForm
						onSaveHeader={(data) => {
							setSettings(data);
						}}
					/>

					<TempGeneratorBtn
						disabled={uploadedData.length > 0 ? false : true}
						onGeneratorTemp={(data) => {
							setOriginalData(data);
						}}
						data={uploadedData}
					/>

					<Suspense
						fallback={<div>Carregando arquivo para download</div>}
					>
						<LazyDownloadBtn
							disabled={uploadedData.length > 0 ? false : true}
							data={uploadedData}
							settings={settings}
						/>
					</Suspense>
					<ArchiveUplodBtn
						onChangeFile={(data) => {
							setUploadedData(data);
							setOriginalData(data);
						}}
					/>
				</div>
			</div>

			<div className="container font-base bg-gradient-to-t from-custom-geadient-blue to-custom-geadient-blue-dark    mx-auto  p-2   rounded-xs ">
				<div className="h-[100%]  grid grid-rows-[12%_76%_12%_10%] lg:grid-rows-[13%_80%_10%] ">
					<div className=" ">
						<InputGroupCustom>
							<LabelCustom>Buscar</LabelCustom>
							<InputSearchCustom
								disabled={
									uploadedData.length > 0 ? false : true
								}
								placeholder="Proucurar Container - Ex : [ MNBU1244321 ]"
								onChange={(e) =>
									setSearchByContainer(e.currentTarget.value)
								}
								value={searchByContainer}
							/>
						</InputGroupCustom>
					</div>
					{/* Table */}
					<div className="relative overflow-auto w-1/1 ">
						<div className={`w-full h-1/1  `} id="table">
							{pagesSliceted.length > 0 && (
								<Table className="text-xs text-white  sm:text-sm ">
									<TableHeader className="">
										<TableRow className="hover:bg-transparent text-white">
											<TableHead className="w-10 text-center text-white">
												Qty{" "}
											</TableHead>
											<TableHead className="w-10 space-x-2 text-left text-white">
												<p className="inline-block">
													Container
												</p>
											</TableHead>
											<TableHead className="w-31 space-x-2 text-center text-white">
												<p className="inline-block">
													Temperature
												</p>
											</TableHead>
											<TableHead className="w-15 space-x-2 text-center text-white">
												<p className="inline-block">
													Position
												</p>
											</TableHead>
											<TableHead className="w-15 text-center text-white">
												Supply
											</TableHead>
											<TableHead className="w-15  text-center text-white">
												Return
											</TableHead>
											<TableHead className="w-180   text-center text-white">
												Remarks
											</TableHead>
											<TableHead className="w-18  text-left text-white">
												Action
											</TableHead>
										</TableRow>
									</TableHeader>

									<TableBody className="">
										{currentData &&
											pagesSliceted.map((page, index) => (
												<TableRow
													key={page.id}
													className="sm:h-10 text-white hover:bg-custom-blue"
												>
													<TableCell className="text-center p-0">
														{numbersSliceted[index]}
													</TableCell>
													<TableCell className="text-left p-0">
														<input
															ref={inputTempRef}
															key={page.Container}
															onBlur={(e) => {
																const value =
																	e
																		.currentTarget
																		.value;

																editPageData({
																	...page,
																	Container:
																		value,
																});
															}}
															className="text-center uppercase  outline-0"
															type="text"
															defaultValue={
																page.Container
															}
														/>
													</TableCell>
													<TableCell className="text-center p-0">
														<input
															ref={inputTempRef}
															key={
																page.Temperature
															}
															onBlur={(e) => {
																const value =
																	e
																		.currentTarget
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
															className="text-center  outline-0"
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
													<TableCell className="text-center p-0">
														{page.Position}
													</TableCell>
													<TableCell className="text-center p-1 md:p-2">
														<input
															key={page.Supply}
															onBlur={(e) => {
																const value =
																	e
																		.currentTarget
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
													<TableCell className="text-center p-1 md:p-2">
														<input
															key={page.Return}
															onBlur={(e) => {
																const value =
																	e
																		.currentTarget
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
													<TableCell className="text-center p-1 md:p-2">
														<input
															key={page.Remarks}
															onBlur={(e) => {
																const value =
																	e
																		.currentTarget
																		.value;
																editPageData({
																	...page,
																	Remarks:
																		value,
																});
															}}
															className="text-center outline-0"
															type="text"
															defaultValue={
																page.Remarks
															}
														/>
													</TableCell>
													<TableCell className="text-center p-1 md:p-2">
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
												className="  hover:bg-custom-blue "
											>
												<TableCell className="text-center h-11 ">
													{item}
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
												<TableCell className="text-center">
													{""}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}

							{searchIsEnabled === true &&
								pagesSliceted.length === 0 && (
									<div className="text-white h-1/1  flex justify-center items-center">
										<p className="text-xs text-zinc-400 font-extralight">
											Container não encontrado{" "}
										</p>
									</div>
								)}
						</div>
					</div>

					<div className="p-2 py-4  border-t-2 border-white/50 flex  items-center justify-center ">
						<div className="flex relative font-base flex-6 justify-center w-full  items-center   text-xs ">
							<div className="text-white">
								<Button
									className="rounded-full m-1 bg-[#BBDCFF]/40 size-7"
									size={"sm"}
									onClick={() => prevPage()}
								>
									{"<"}
								</Button>{" "}
								{currentPage}
								{" de "}
								{totalPages}{" "}
								<Button
									className="rounded-full m-1 bg-[#BBDCFF]/40 size-7"
									size={"sm"}
									onClick={() => nextPage()}
								>
									{">"}
								</Button>
							</div>

							<div className="  flex-1 absolute right-0  w-20 text-white   text-xs sm:text-sm">
								<div className="text-right ">
									Registros: {totalItems}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container font-base text-[#BBDCFF] py-6 text-center text-[10px] bg-gradient-to-b from-custom-geadient-blue   to-custom-geadient-blue-dark     mx-auto  p-2   rounded-xs ">
				Desenvolvido por : Esli Cavalcante
			</div>
		</div>
	);
};

export default TemperatureListPage;
