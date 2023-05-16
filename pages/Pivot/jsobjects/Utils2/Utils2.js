export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	onPageLoad: async () => {
		await get_all_users.run();
		await Tab1Month.run();
		storeValue('pivotTab','Month');
	}
}