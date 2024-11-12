export default {
	logout_process: () => {
		clearStore();
		logout.run();
		navigateTo('Login');
	},
	
	check_login: async () => {
		if(!appsmith.store.access_token)
			navigateTo('Login');
		
		get_all_users.run().then(() => {
								console.log("ok");							
		}).catch((err) => {
			console.log(err.message);
			clearStore();
			logout.run();
			navigateTo('Login');
		})
	}
}