export default {
	myFun2: async () => {
		await get_all_users.run();
		await get_user_offers_table.run();
	}
}