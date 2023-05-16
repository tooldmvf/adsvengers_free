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
		storeValue('row_selected',-1);
		await get_all_users.run();
		await SelectFinancialTot.run();
		await SelectOFFERSUser.run();
		await SelectUSERS.run();
	},
	
}