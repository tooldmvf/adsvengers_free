export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	async reload () {
		if(SelectMonth.selectedOptionValue.length > 0) {
			await resetWidget('Adjust');
			await Fetch_Adjustments.run();
			await resetWidget('AdjustProfit');
			await Fetch_Debt_Prev_Month.run();
			await Fetch_Data_Rev_TOT.run();
			await Fetch_Data_Rev.run();
			await Fetch_Data_Spent.run();
			await Fetch_Data_Spent_TOT.run();
			await Fetch_Data_Other_Prj.run();
			await Fetch_Data_Rev_Ai20.run();
		}
	}
}