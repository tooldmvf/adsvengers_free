export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	onLoad: async () => {
		await get_all_users.run();
		await BMTOT.run();
		await BM.run();
	}
}