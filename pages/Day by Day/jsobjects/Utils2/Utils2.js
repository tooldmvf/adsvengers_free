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
		await storeValue('custom_off','false');
		await storeValue('custom_off2','false');
		await get_all_users.run();
		await TableTotal.tblSummary();
	},
}