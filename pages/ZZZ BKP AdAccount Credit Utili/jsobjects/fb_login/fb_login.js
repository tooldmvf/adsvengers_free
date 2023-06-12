export default {
	login_fb: async () => {
		if(!appsmith.URL.fullPath.includes('#access_token')) return;
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=');
			console.log(key, value);
			if (key == 'provider_token') storeValue(key, value);
		});
	}
}