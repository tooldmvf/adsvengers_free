export default {
	logout_process: () => {
		clearStore();
		logout.run();
		navigateTo('Login');
	},
	
	check_login: async () => {
		if(!appsmith.store.access_token)
			navigateTo('Login');
	}
}