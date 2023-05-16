export default {
	signIn : () => {
		return sign_in.run()
		.then(data => {	
			delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			})
			storeValue('type', 'signin');
			storeValue('from_page', 'login');
			navigateTo('Dashboard');
		})
		.catch(e => {
			showAlert(`${e.message}: ${sign_in.data.error_description}`, 'warning')
		})
	},
	
	otherInfo : async () => {
		try {			
			const res_user = await get_user.run();
		  storeValue('id', res_user.id);
			await insert_user_profiles.run();
			storeValue('from_page', 'login');
			navigateTo('Dashboard');			
		} catch (e) {
			showAlert(`${e.message}: ${insert_user_profiles.data.error_description}`, 'warning');
		}
	},
	
	sign_up_continue: async () => {
		if(!appsmith.URL.fullPath.includes('#access_token')) {
			if (!appsmith.store.access_token) {
				return;
			} else {
				navigateTo('Dashboard');
				return;
			}
		}
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=');
			storeValue(key, value);
		});
		try {
			if(appsmith.store.type === 'recovery'){				
				storeValue('loginTab', 'New Pass');
			} else if (appsmith.store.type === 'signup') {
				storeValue('loginTab', 'Other Info');
			} else {
				await get_user.run();
				storeValue('from_page', 'login');
				navigateTo('Dashboard');
			}
		} catch (e) {
			showAlert(`${e.message}: ${sign_in.data.error_description}`, 'warning');
		}
	}
}