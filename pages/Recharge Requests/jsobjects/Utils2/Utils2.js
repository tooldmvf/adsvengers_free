export default {
	myCurrency: (input) => {
		const num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
    return formatter.format(num); 
	},
	
	myCurrency2: (input,curr) => {
		var num = input;
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: curr,
		});
    return formatter.format(num); 
	},
	
	myCurrency3: async () => {
		var num = UsersLogTot.data.filter(t => t.recharge_currency == 'USD')[0].recharge_amount
		const val = await Eur_value.run();
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
		num *= val.eur;
		num += UsersLogTot.data.filter(t => t.recharge_currency == 'EUR')[0].recharge_amount
		await storeValue('myTot',formatter.format(num))
    //return formatter.format(num); 
	}
}