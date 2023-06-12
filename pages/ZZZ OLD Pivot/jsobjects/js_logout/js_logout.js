export default {
	logout_process: () => {
		clearStore();
		logout.run();
		navigateTo('Login');
	}
}