export default {
	
	ROI: () => {
    const roi =
      ((user_financial_period.data[0]?.amount_revenue_approved || 1) - (user_financial_period.data[0]?.spent_wfees || 0))/(user_financial_period.data[0]?.spent_wfees || 1) *100;
    return parseFloat(roi).toFixed(0);
  },
	
	GrossROI: () => {
    const roi =
      ((user_financial_period.data[0]?.tot_revenue || 1) - (user_financial_period.data[0]?.spent_wfees || 0))/(user_financial_period.data[0]?.spent_wfees || 1) *100;
    return parseFloat(roi).toFixed(0);
  },
	
	myCurrency: (input) => {
		const num = input;
		if (!num) return 0;
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(2) + 'K'; 
    }else if(num > 1000000){
        return (num/1000000).toFixed(2) + 'M'; 
    }else if(num <= 999 && num >= -999){
        return  num.toFixed(2); 
    }else if(num < -999 && num > -1000000){
        return (num/1000).toFixed(2) + 'K'; 
    }
	},
	
	store_user_profile1: async () => {
		
		await get_all_users.run();
		await setTimeout(() => {}, 1000);
		await user_financial_period.run();
		await user_financialNetwork.run();
		await user_financial_trend.run();
	},
}