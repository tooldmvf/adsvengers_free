export default {
	insert_raw_wf_off3: async () => {
		const object = await get_all_wf_offers.run();
		for (const i in object) {
		  const res = await get_wf_offers.run({off_id: object[i].offer_id, user_key: object[i].user_api_key});
			if(res.data.readCampaigns.length > 0) {
				await insert_wf_raw_offers.run({name: res.data.readCampaigns[0].name, id: res.data.readCampaigns[0].id, categories: res.data.readCampaigns[0].categories, status: res.data.readCampaigns[0].status, payout: res.data.readCampaigns[0].DefaultCommission.amount});
			}
		}
		await update_wf_categ.run();
		await get_user_offers_table.run();
	},
	
	insert_wf_offer: async () => {
		const object = await get_WF_api_key.run();
		const res = await get_all_wf_offers_QL.run({user_key: object[0].user_api_key});
	
		for (let i = 0; i < Object.keys(res.data.readCampaigns).length; i++) {
			let cat_short = 'G';
			
			if (res.data.readCampaigns[i].categories.includes('nutra') 
					|| res.data.readCampaigns[i].categories.includes('beauty') 
					|| res.data.readCampaigns[i].categories.includes('health')) cat_short = 'N';
			if (res.data.readCampaigns[i].name.toLowerCase().includes('leggin') 
					|| res.data.readCampaigns[i].name.toLowerCase().includes('jeggi')) cat_short = 'A';
			await insert_offer_network.run({offer_id_net: res.data.readCampaigns[i].id,
																			offer_name_net: res.data.readCampaigns[i].name,
																			fk_network_id: object[0].network_id,
                                      off_category_net: res.data.readCampaigns[i].categories,
                                      off_cat_short: cat_short,
                                      payout: res.data.readCampaigns[i].DefaultCommission.amount})
    }
		await get_offer_net.run();
	},
	
	insert_squid_offer: async () => {
		const object = await get_SQID_api_key.run();
		const res = await get_squid_offers.run({api_key: object[0].user_api_key, x_user_id: object[0].user_aff_id});
		for (const i in res.offers) {
			let cat_short = 'N';
			let new_name = res.offers[i].name.split('&quot;').join('')
			await console.log(new_name);
			await insert_offer_network.run({offer_id_net: res.offers[i].id,
                                      offer_name_net: new_name,
                                      fk_network_id: object[0].network_id,
                                      off_category_net: res.offers[i].category,
                                      off_cat_short: cat_short,
                                      payout: res.offers[i].payout})
		}
		await get_offer_net.run();
	},
	
	insert_ai20_offer: async () => {
		const object = await get_ai20_api_key.run();
		const res = await get_ai20_offers.run({api_key: object[0].user_api_key});
		const res2 = JSON.parse(res).status;
		var groupByArr = function (xs, key1, key2) {
				return xs.reduce(function (rv, x) {
						(rv[x[key1] + ',' + x[key2]] = rv[x[key1] + ',' + x[key2]] || []).push(x);
						return rv;
				}, {});
		};
		const result = groupByArr(res2, 'off_id','off_name');		
		const arr_off_id = Object.keys(result);
	  
		for (const i in arr_off_id) {
			//console.log(result[arr_off_id[i]][0].off_categories[0].name);
			let cat_short = 'G';
      if (result[arr_off_id[i]][0].off_categories[0].name.toLowerCase().includes('nutra') 
          || result[arr_off_id[i]][0].off_categories[0].name.toLowerCase().includes('cosmetic') ) cat_short = 'N';
      if (result[arr_off_id[i]][0].off_categories[0].name.toLowerCase().includes('cloth') 
          || result[arr_off_id[i]][0].off_categories[0].name.toLowerCase().includes('shoe')) cat_short = 'A';
      await insert_offer_network.run({offer_id_net: arr_off_id[i].split(',')[0],
                                      offer_name_net: arr_off_id[i].split(',')[1],
                                      fk_network_id: object[0].network_id,
                                      off_category_net: '',
                                      off_cat_short: cat_short,
                                      payout: result[arr_off_id[i]][0].off_payout})
		}
		await get_offer_net.run();
	},
	
	insert_ai20_offer_v2: async () => {
		const object = await get_ai20_api_key.run();
		const res = await get_ai20_offers_v2.run({api_key: object[0].user_api_key});
		const res2 = JSON.parse(res);
		
		for (const i in res2) {
			var cat_short = '';
			var cat_long = '';
			
			if (res2[i]["off_categories"] !== undefined) {	
				cat_long = _.map(res2[i].off_categories,'name').join(",");
				cat_short = 'G';
				if (cat_long.toLowerCase().includes('nutra') || cat_long.toLowerCase().includes('cosmetic') ) cat_short = 'N';
				if (cat_long.toLowerCase().includes('cloth') || cat_long.toLowerCase().includes('shoe')) cat_short = 'A';
			}		
    	await insert_offer_network.run({offer_id_net: res2[i].off_id,
																			offer_name_net: res2[i].name,
																			fk_network_id: object[0].network_id,
																			off_category_net: cat_long,
																			off_cat_short: cat_short,
																			payout: res2[i].payout_cod}) 																
		}
		await get_offer_net.run();
	},
	
	insert_ai20_offer_SI: async () => {
		const object = await get_ai20_api_key.run();
		const res = await get_ai20_offers_si.run({api_key: object[0].user_api_key});
		const res2 = JSON.parse(res);
		
		return res2
		
		for (const i in res2) {
			var cat_short = '';
			var cat_long = '';
			
			if (res2[i]["off_categories"] !== undefined) {	
				cat_long = _.map(res2[i].off_categories,'name').join(",");
				cat_short = 'G';
				if (cat_long.toLowerCase().includes('nutra') || cat_long.toLowerCase().includes('cosmetic') ) cat_short = 'N';
				if (cat_long.toLowerCase().includes('cloth') || cat_long.toLowerCase().includes('shoe')) cat_short = 'A';
			}		
    	await insert_offer_network.run({offer_id_net: res2[i].off_id,
																			offer_name_net: res2[i].name,
																			fk_network_id: object[0].network_id,
																			off_category_net: cat_long,
																			off_cat_short: cat_short,
																			payout: res2[i].payout_cod}) 																
		}
		await get_offer_net.run();
	},
}