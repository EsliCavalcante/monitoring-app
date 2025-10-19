<Document>
					<Page size={"A4"} style={styleHeader.page}>
						<View style={styleHeader.header}>
							<View
								style={{
									...styleHeader["header-logo"],
									flex: 1,
									border: "1px solid black",
									padding: 6,
								}}
							>
								<Image
									style={{ width: 100 }}
									src={"./reeferbras-logo.png"}
								/>
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									border: "1px solid black",
									borderRadius: 4,
									padding: 4,
									flex: 4,
								}}
							>
								<View
									style={{
										...styleHeader.form,
										flex: 2,
									}}
								>
									<Text style={styleHeader["input-label"]}>
										PORT
									</Text>
									<Text style={styleHeader.input}>PECÉM</Text>
								</View>
								<View style={{ ...styleHeader.form, flex: 2 }}>
									<Text style={styleHeader["input-label"]}>
										M/V
									</Text>
									<Text style={styleHeader.input}>
										RDO FORTUNE
									</Text>
								</View>
								<View style={{ ...styleHeader.form, flex: 1 }}>
									<Text style={styleHeader["input-label"]}>
										VOY N°
									</Text>
									<Text style={styleHeader.input}>S123</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								marginVertical: 12,
							}}
						>
							<View
								style={{
									borderBottom: "1px solid red",
									flex: 1,
								}}
							/>
							<Text
								style={{
									fontSize: 12,
									fontWeight: "500",
									color: "red",
								}}
							>
								REFRIGETERATED CONTAINER TEMPERATURE LOG SHEET
							</Text>
							<View
								style={{
									borderBottom: "1px solid red",
									flex: 1,
								}}
							/>
						</View>

    					{/* Table */}

    					<View style={tableStyles.table}>
    						<View style={tableStyles.row}>
    							{headers.map((header, index) => (
    								<View
    									key={index}
    									style={[
    										tableStyles.colHeader,
    										{
    											width: colWidths[index],
    										},
    									]}
    								>
    									<Text>{header}</Text>
    								</View>
    							))}
    						</View>

    						{/* Table Data */}
    						{data.map((row, rowIndex) => (
    							<View key={rowIndex} style={tableStyles.row}>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[0],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{row.id || " "}</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,

    										{
    											fontWeight: "600",
    											textAlign: "left",
    											width: colWidths[1],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{row.Container || "a"}</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[2],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{row.Position || "a"}</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[3],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{row.Temperature || "a"}</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[4],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>-21.2</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[5],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>-18.1</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[6],
    											borderRightWidth: 0,
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{"set point -18.0"} </Text>
    								</View>
    							</View>
    						))}

    						{Array.from({
    							length: 28 - data.length,
    						}).map((_, rowIndex) => (
    							<View key={rowIndex} style={tableStyles.row}>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[0],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>
    										{(lastRow.id || 0) + rowIndex + 1}
    									</Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[1],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[2],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[3],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[4],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[5],
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    								<View
    									style={[
    										tableStyles.tableCol,
    										{
    											width: colWidths[6],
    											borderRightWidth: 0,
    										},
    										odd(rowIndex),
    									]}
    								>
    									<Text>{""} </Text>
    								</View>
    							</View>
    						))}
    					</View>

    					{/* FOOTER */}

    					<View
    						style={{
    							display: "flex",
    							flexDirection: "row",
    							alignItems: "center",
    							gap: 10,
    							paddingVertical: 8,

    							marginLeft: 4,
    						}}
    					>
    						<Checkbox checked={true} label={"PLUG-IN"} />
    						<Checkbox checked={false} label={"PLUG-OUT"} />
    						<View
    							style={[
    								FooterStyle["header-form-hora"],
    								{ border: "0px solid red" },
    							]}
    						>
    							<View
    								style={{
    									...FooterStyle.form,
    									width: "50%",
    								}}
    							>
    								<Text style={FooterStyle["header-inputs"]}>
    									ARRIVAL TIME
    								</Text>
    								<Text
    									style={{
    										...FooterStyle["header-input-text"],
    										flex: 1,
    									}}
    								></Text>
    							</View>
    							<View
    								style={{
    									...FooterStyle.form,
    									width: "50%",
    								}}
    							>
    								<Text style={FooterStyle["header-inputs"]}>
    									DEPARTURE TIME
    								</Text>
    								<Text
    									style={{
    										...FooterStyle["header-input-text"],
    										flex: 1,
    									}}
    								></Text>
    							</View>
    						</View>
    					</View>

    					<View
    						style={{
    							...FooterStyle.header,
    							marginTop: 0,

    							height: 70,
    						}}
    					>
    						<View style={{ ...FooterStyle["header-form"] }}>
    							<View style={{ ...FooterStyle.form, flex: 3 }}>
    								<Text style={FooterStyle["header-inputs"]}>
    									DATE
    								</Text>
    								<Text
    									style={{
    										...FooterStyle["header-input-text"],
    										flex: 1,
    									}}
    								></Text>
    							</View>
    							<View style={{ ...FooterStyle.form, flex: 8 }}>
    								<Text style={FooterStyle["header-inputs"]}>
    									SIGNATURE/STAMP
    								</Text>
    								<Text
    									style={{
    										...FooterStyle["header-input-text"],
    										flex: 1,
    									}}
    								></Text>
    							</View>
    							<View style={{ ...FooterStyle.form, flex: 9 }}>
    								<Text style={FooterStyle["header-inputs"]}>
    									REEFERBRAS SIGNATURE/STAMP
    								</Text>
    								<Text
    									style={{
    										...FooterStyle["header-input-text"],
    										flex: 1,
    									}}
    								></Text>
    							</View>
    						</View>
    					</View>

    					<View
    						style={{
    							display: "flex",
    							justifyContent: "center",
    							alignItems: "center",
    							marginTop: 6,
    						}}
    					>
    						<Text style={{ fontSize: 8 }}>
    							página {1} de {data.length}
    						</Text>
    					</View>
    				</Page>
    			</Document>
