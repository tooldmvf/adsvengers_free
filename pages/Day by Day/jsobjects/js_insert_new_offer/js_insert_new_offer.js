export default {
	insertFlow: async () => {
		if (appsmith.store.custom_off == 'true') {
			storeValue('custom_off','false');
			const newNet = await insert_new_network.run();
			const newUserNet = await insert_new_user_network.run({net_id: newNet[0].network_id});
			const newOffer = await insert_new_offer.run({user_net_id: newUserNet[0].user_network_id});
			await insert_user_financial.run({user_net_id: newUserNet[0].user_network_id, off_id: newOffer[0].offer_id});	
		} else {
			if (appsmith.store.custom_off2 == 'true') {
				const newOffer = await insert_new_offer.run({user_net_id: SelectNetwork.selectedOptionValue});
				await insert_user_financial.run({user_net_id: SelectNetwork.selectedOptionValue, off_id: newOffer[0].offer_id});
			} else {
				await insert_user_financial.run({user_net_id: SelectNetwork.selectedOptionValue, off_id: SelectOffer.selectedOptionValue});
			}
		}
		await get_all_networks.run();
		await TableTotal.tblSummary();
	},
}