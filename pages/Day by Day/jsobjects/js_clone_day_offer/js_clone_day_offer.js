export default {
	insertFlow: async () => {
		await clone_user_financial.run({user_net_id: SelectNetworkClone.selectedOptionValue, off_id: SelectOfferClone.selectedOptionValue});
		await TableTotal.tblSummary();
	},
}