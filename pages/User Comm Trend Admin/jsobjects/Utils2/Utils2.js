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
		await Fetch_Data_Factory.run();
		await Fetch_Data_Factory_Tot.run();
	},
	
}