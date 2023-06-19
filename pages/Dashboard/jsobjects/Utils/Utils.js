export default {
	
	ROI: () => {
    const roi =
      ((user_financial_period.data[0]?.amount_revenue_approved || 1) - (user_financial_period.data[0]?.spent_wfees || 0))/(user_financial_period.data[0]?.spent_wfees || 1) *100;
    return parseFloat(roi).toFixed(1);
  },
	
	GrossROI: () => {
    const roi =
      ((user_financial_period.data[0]?.tot_revenue || 1) - (user_financial_period.data[0]?.spent_wfees || 0))/(user_financial_period.data[0]?.spent_wfees || 1) *100;
    return parseFloat(roi).toFixed(1);
  },
	
	GrossROI_h: () => {
    const roi =
      ((user_financial_period.data[0]?.tot_revenue_h || 1) - (user_financial_period.data[0]?.spent_wfees || 0))/(user_financial_period.data[0]?.spent_wfees || 1) *100;
    return parseFloat(roi).toFixed(1);
  },
	
	RejRate: () => {
    const rejRate =
      (user_financial_period.data[0]?.conversions_rejected || 0)/((user_financial_period.data[0]?.tot_conversions + user_financial_period.data[0]?.conversions_rejected) || 1) *100;
    return parseFloat(rejRate).toFixed(1);
  },
	
	RejRateH: () => {
    const rejRate =
      (user_financial_period.data[0]?.conversions_rejected_h || 0)/((user_financial_period.data[0]?.tot_conversions_h + user_financial_period.data[0]?.conversions_rejected_h) || 1) *100;
    return parseFloat(rejRate).toFixed(1);
  },
	
	RejRate24h: () => {
    const rejRate =
      (user_financial_rej_rate_24h.data[0]?.conversions_rejected || 0)/((user_financial_rej_rate_24h.data[0]?.tot_conversions + user_financial_rej_rate_24h.data[0]?.conversions_rejected) || 1) *100;
    return parseFloat(rejRate).toFixed(1);
  },
	
	ApprRate: () => {
    const apprRate =
      (user_financial_period.data[0].conversions_approved / ((user_financial_period.data[0]?.tot_conversions || 1) + (user_financial_period.data[0]?.conversions_rejected || 1))) *100;
    return parseFloat(apprRate).toFixed(1);
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
	
	store_user_profile: () => {
		if (appsmith.store.from_page != 'login') {
			console.log('primo if')
	    get_all_users.run()
				.then(user_financial_period.run())
				.then(user_financialNetwork.run())
				.then(user_financialOffers.run())
				.then(user_financial_rej_rate_24h.run())
				.then(user_financial_active_offers.run())
				.then(user_financial_trend.run());
			return;
		}
		return get_user.run()
		.then(dat => {
			storeValue('id', dat.id);
			storeValue('myUser', dat.id);
			storeValue('myUsers', [dat.id]);			
			storeValue('myEmail', dat.email);			
			get_user_profile.run({user_id: dat.id})
			.then(data =>  {
				storeValue('first_name', (data[0].first_name ? data[0].first_name : get_user.data.user_metadata.full_name.split(' ')[0]));
				storeValue('last_name', (data[0].last_name ? data[0].last_name : get_user.data.user_metadata.full_name.split(' ')[1]));
				storeValue('role_level', data[0].role_level);		
				update_profile.run();
				storeValue('type', undefined);
				storeValue('from_page', undefined);
			})
			.then(get_all_users.run())
			  .then(user_financial_period.run())
				.then(user_financialNetwork.run())
				.then(user_financialOffers.run())
				.then(user_financial_rej_rate_24h.run())
				.then(user_financial_active_offers.run())
				.then(user_financial_trend.run());
		});
	},
	
	store_user_profile1: async () => {
		
		if (appsmith.store.from_page != 'login') {
	    const result = await get_all_users.run();
			await setTimeout(() => {}, 2000);
			await user_financial_period.run();
			await user_financialNetwork.run();
			await user_financialOffers.run();
			await user_financial_rej_rate_24h.run();
			await user_financial_active_offers.run();
			await user_financial_trend.run();
			return;
		}
		const user = await get_user.run();
	
		storeValue('id', user.id);
		storeValue('myUser', user.id);
		storeValue('myUsers', [user.id]);
		storeValue('myEmail', user.email);			
		const user_prof = await get_user_profile.run({user_id: user.id});

		storeValue('first_name', (user_prof[0].first_name ? user_prof[0].first_name : user.data.user_metadata.full_name.split(' ')[0]));
		storeValue('last_name', (user_prof[0].last_name ? user_prof[0].last_name : user.data.user_metadata.full_name.split(' ')[1]));
		storeValue('role_level', user_prof[0].role_level);		
		await update_profile.run();
		storeValue('type', undefined);
		storeValue('from_page', undefined);

		const result2 = await get_all_users.run();
		await setTimeout(() => {}, 2000);
		await user_financial_period.run();
		await user_financialNetwork.run();
		await user_financialOffers.run();
		await user_financial_rej_rate_24h.run();
		await user_financial_active_offers.run();
		await user_financial_trend.run();
	},
}