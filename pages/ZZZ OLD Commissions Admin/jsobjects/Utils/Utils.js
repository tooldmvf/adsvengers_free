export default {
	
	ROI: () => {
    const roi =
      ((user_financial_period.data[0]?.amount_revenue_approved || 1) - (user_financial_period.data[0]?.spent || 0))/(user_financial_period.data[0]?.spent || 1) *100;
    return parseFloat(roi).toFixed(0);
  },
	
	RejRate: () => {
    const rejRate =
      (user_financial_period.data[0]?.conversions_rejected || 0)/(user_financial_period.data[0]?.tot_conversions || 1) *100;
    return parseFloat(rejRate).toFixed(1);
  },
	
	myCurrency: (input) => {
		const num = input;
		if (!num) return 0;
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(2) + 'K'; 
    }else if(num > 1000000){
        return (num/1000000).toFixed(2) + 'M'; 
    }else if(num < 998){
        return  num.toFixed(2); 
    }
	},

	insert_user_comm: async () => {
		const object = appsmith.store.offers;
		for (const i in object) {
			await insert_user_comm.run({fk_offer_id: object[i].offer_id});
		}
		await user_commissions.run();
	},
}