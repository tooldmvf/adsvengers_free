export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	async sendEmail () {
		if(Number(AmountInvoice.text.replace(/[^0-9.-]+/g,"")) > 0) {
		  await Send_Confirmation.run();
		} else {
		  await Send_Confirmation_NEG.run();
		}
		Fetch_Adjustments.run();
	},
	
	async myFun1 (currentRow) {
		await storeValue("rowUpdate",currentRow);
		await Save_Data_Rev.run({currentRow});
		await Fetch_Data_Rev.run();
		await Fetch_Data_Rev_TOT.run();
	},
	
	async myFun2 (currentRow) {
		await storeValue("rowUpdate",currentRow);
		await Save_Data_Spent.run({currentRow});
		await Fetch_Data_Spent.run();
		await Fetch_Data_Spent_TOT.run();
	},
	
	async reload () {
		if(SelectMonth.selectedOptionValue.length > 0) {
			await resetWidget('NumberSlider1'); 
			await resetWidget('Adjust');
			await Fetch_Adjustments.run();
			await resetWidget('AdjustProfit');
			await Fetch_Commission_fee.run();
			await Fetch_Debt_Prev_Month.run();
			await Fetch_Data_Rev_TOT.run();
			await Fetch_Data_Spent_TOT.run();
			await Fetch_Data_Rev.run();
			await Fetch_Data_Spent.run();
			await Fetch_Data_Other_Prj.run();
			await Fetch_Data_Rev_Ai20.run();
		}
	}
}