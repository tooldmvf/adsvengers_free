export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	async myFun1 (currentRow) {
		await storeValue("rowUpdate",currentRow);
		await Save_Data_Rev.run({currentRow});
		await Fetch_Data_Rev.run();
		await Fetch_Data_All.run();
	},
	
	async myFun2 (currentRow) {
		await storeValue("rowUpdate",currentRow);
		await Save_Data_Spent.run({currentRow});
		await Fetch_Data_Spent.run();
		await Fetch_Data_Spent_TOT.run();
	}
}