export default {
	
	InsertAccountsAPI: async () => {
		const new_Arr = [];
		var bm_res = await GetBusinesses.run();			
		for (let result of bm_res.data) {
			delete Object.assign(result, { bm_id: result.id })['id'];
			delete Object.assign(result, { bm_name: result.name })['name'];		
			result['fk_ts_id'] = '6719b3bc-e4b5-41dd-a04c-4323dc921a42';
			new_Arr.push(result);
		}		
		await insert_all_BM.run({bm_json: new_Arr});		
		
		for (let i = 0; i < new_Arr.length; i++) {
			let arr_act = [];
			const act_id = await GetAccounts.run({bizId: new_Arr[i].bm_id});
			var client_owner = '';
			
			if(act_id['client_ad_accounts']) client_owner = 'client_ad_accounts';
			if(act_id['owned_ad_accounts']) client_owner = 'owned_ad_accounts';
		
			if (client_owner.length > 0) {
				for (let result of act_id[client_owner].data) {
					delete Object.assign(result, { ad_account_id: result.id })['id'];
					delete Object.assign(result, { ad_account_name: result.name })['name'];	
					delete Object.assign(result, { fk_bm_id: result.owner })['owner'];						
					result['fk_bm_id'] = new_Arr[i].bm_id;
					arr_act.push(result);					
				}	
				await insert_all_AdAct.run({act_json: arr_act});	

				if (act_id[client_owner].paging.next) {					
					let seguita = true;
					let act_id2 = await GetAccountNextPage.run({next_page: act_id[client_owner].paging.next});
					for (let result of act_id2.data) {
						delete Object.assign(result, { ad_account_id: result.id })['id'];
						delete Object.assign(result, { ad_account_name: result.name })['name'];	
						delete Object.assign(result, { fk_bm_id: result.owner })['owner'];						
						result['fk_bm_id'] = new_Arr[i].bm_id;
						arr_act.push(result);					
					}	
					await insert_all_AdAct.run({act_json: arr_act});	

					var param_next_ow = act_id2.paging.next;					
					do {						
						let act_id3 = await GetAccountNextPage.run({next_page: param_next_ow});						
						for (let result of act_id3.data) {
							delete Object.assign(result, { ad_account_id: result.id })['id'];
							delete Object.assign(result, { ad_account_name: result.name })['name'];	
							delete Object.assign(result, { fk_bm_id: result.owner })['owner'];						
							result['fk_bm_id'] = new_Arr[i].bm_id;
							arr_act.push(result);					
						}	
						await insert_all_AdAct.run({act_json: arr_act});
						param_next_ow = act_id3.paging.next;
						if (!act_id3.paging.next) {
							seguita = false;
						}
					} while (seguita);	
				}
			}			
		}
	},
}