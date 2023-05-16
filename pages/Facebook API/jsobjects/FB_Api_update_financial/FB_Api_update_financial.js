export default {

	after_make_com: async () => {
		
		storeValue('myProgress2',0);
		storeValue('myProgress3',0);
		
		var progress2 = 0;
		var progress3 = 0;
		var spentCur = 0;
		
		const res = await get_campaigns.run();	
		const totalRun = await Object.keys(res).length;
		
		
		for (const i in res) {			
			const res2 = await fb_campaign_insight.run({campaign_id: res[i].campaign_id, date_run: res[i].financial_date})
			if (res2.data.length > 0) {
				spentCur = res2.data[0].spend;
				if (res2.data[0].account_currency != 'EUR') {
					await fetch(`https://api.exchangerate-api.com/v4/latest/${res2.data[0].account_currency}`).then(response => {
               return response.json();
         })
         .then(data => {
            let rate = data.rates['EUR'];
            spentCur = rate * (res2.data[0].spend);
         })
				}
				
				await insert_raw_user_fb_fin_data.run({
					fk_user_id: res[i].fk_user_id,
					fk_bm_id: res[i].fk_bm_id,
					fk_ad_account_id: res[i].fk_ad_account_id,
					financial_date: res[i].financial_date,
					campaign_id: res[i].campaign_id,
					campaign_name: res[i].campaign_name,
					amount_spent: spentCur,
					campaign_offer_id: res[i].campaign_offer_id,
					spent_rate_fees: res[i].spent_rate_fees,
					off_cat_short: res[i].off_cat_short,
					net_name_short: res[i].net_name_short
				})
			}
			progress2++;
			await storeValue('myProgress2', (progress2/totalRun*100));
		}
		
		const res3 = await get_user_fin_pre_update.run();
		const totalRun2 = await Object.keys(res3).length;
		
		for (const x in res3) {			
			let spent_w_fees = await res3[x].amount_spent + (res3[x].amount_spent / 100 * res3[x].spent_rate_fees)
			await update_user_financial.run({
				fk_offer_id: res3[x].fk_offer_id,
				financial_date: res3[x].financial_date,
				fk_user_network_id: res3[x].fk_user_network_id,
				fk_user_id: res3[x].fk_user_id,
				spent_rate_fees: res3[x].spent_rate_fees,
				amount_spent: res3[x].fb_spent,
				amount_spent_plus_fee: spent_w_fees
			})
			await progress3++;
			await storeValue('myProgress3', (progress3/totalRun2*100));
		}
	},
	
	after_make_com_NO_FB: async () => {
		
		storeValue('myProgress3',0);
				
		var progress3 = 0;		
		
		const res3 = await get_user_fin_pre_update.run();
		const totalRun2 = await Object.keys(res3).length;
		
		for (const x in res3) {			
			let spent_w_fees = res3[x].amount_spent + (res3[x].amount_spent / 100 * res3[x].spent_rate_fees)
			await update_user_financial.run({
				fk_offer_id: res3[x].fk_offer_id,
				financial_date: res3[x].financial_date,
				fk_user_network_id: res3[x].fk_user_network_id,
				fk_user_id: res3[x].fk_user_id,
				spent_rate_fees: res3[x].spent_rate_fees,
				amount_spent: res3[x].fb_spent,
				amount_spent_plus_fee: spent_w_fees
			})
			await progress3++;
			await storeValue('myProgress3', (progress3/totalRun2*100));
		}
	},
}