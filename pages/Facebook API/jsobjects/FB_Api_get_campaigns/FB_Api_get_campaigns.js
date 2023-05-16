export default {
	
	fill_camp_table: async () => {
		storeValue('myProgress1',0);
	
		await truncate_raw_user_fb_campaign.run();
		
		const res = await get_user_fb_account.run();
		const totalRun = await Object.keys(res).length;
		var progress = 0;

		for (const i in res) {
			const res2 = await fb_campaign_list.run({ad_account_id: res[i].ad_account_id})	
			if ('data' in res2) {
				for (const ii in res2.data) { 	
					if(res2.data[ii].name.includes('|') && res2.data[ii].name.includes(' -') && (res2.data[ii].name.substring(2,3) === '|' && res2.data[ii].name.substring(4,5) === '|')) {
						
						var campaign_offer_id = res2.data[ii].name.substring(5,res2.data[ii].name.search('-')).trim();
						var off_cat_short = res2.data[ii].name.substring(3,4).trim();
						var net_name_short = res2.data[ii].name.substring(0,2).trim();						
						
						await insert_raw_user_fb_camp.run({
							fk_user_id: res[i].fk_user_id,
							fk_bm_id: res[i].fk_bm_id,
							fk_ad_account_id: res[i].ad_account_id,
							campaign_id: res2.data[ii].id,
							campaign_offer_id: campaign_offer_id,
							campaign_name: res2.data[ii].name,
							spent_rate_fees: res[i].spent_rate_fees,
							off_cat_short: off_cat_short,
							net_name_short: net_name_short
						})
						await console.log(res[i].ad_account_id);
						await delete_raw_user_fb_fin_data.run({
							fk_user_id: res[i].fk_user_id,
							fk_bm_id: res[i].fk_bm_id,
							fk_ad_account_id: res[i].ad_account_id,
							campaign_id: res2.data[ii].id
						})
					}
					
				}	
			}
			progress++;
			await storeValue('myProgress1', (progress/totalRun*100));
		}
		await get_raw_user_fb_campaign.run();
	},
}