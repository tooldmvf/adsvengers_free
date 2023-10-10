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
		await Tab4Offer.run();
		await TotalLine.run();
		await SelectFinancial.run();
		await GetUserAccount.run();
	},
	
	chart : () => {
		//const mbuyer = TotalLineDaysUser.data.map(e => ({value: e.last_name}));
		const spent = TotalLineDaysUser.data.map(e => ({value: e.amount_spent_plus_fee}));
		const category = TotalLineDaysUser.data.map(e => ({value: moment(e.financial_date).format('YYYY-MM-DD')}));
		
		const categories = [{category}];
		const dataset = [
			{seriesname: 'Spent', data: spent }
		];
		
		return {dataset, categories};
	}
}