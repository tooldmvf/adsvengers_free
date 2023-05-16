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
		await TotalLine.run();
		await Tab4OfferDay.run();
		SelectFinancial.run();
		get_all_networks.run();
		get_ts.run();
	},
}