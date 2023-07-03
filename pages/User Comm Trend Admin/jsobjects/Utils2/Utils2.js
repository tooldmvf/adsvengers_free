export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	onLoadPage: async () => {
		await get_all_users.run();
		await Fetch_Data_All.run();
		await Fetch_Data_Graphs.run();
		await Fetch_Data_Tot.run();
		await Fetch_Debt_Factory.run();
		await Fetch_Invoices_Factory.run();
		await Fetch_Mail_Sent.run();
		await Fetch_Profit_Factory.run();
		await Fetch_Profit_Factory_Tot.run();
		await Fetch_Revenue_Factory.run();
		await Fetch_Roi_Factory.run();
		await Fetch_Spent_Factory.run();
	},
	
}