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
		await Fetch_Month.run();
		await Fetch_Manager.run();
		await Fetch_MB_shares.run();
		await Fetch_MB_shares_TOT.run();
	}
}