export default {
	upload: async () => {
		const res = await upload_a_file.run();
		await insert_invoice.run({url: res.signedUrl.split('?')[0]})
		await send_invoice_email.run({url: res.signedUrl.split('?')[0]})
		get_invoices.run()
	},
	
	delete : () => {
		return delete_a_file.run({path: Table1.triggeredRow.invoice_file_url.split('.com/')[1]})
		.then(() => delete_invoice.run())
		.then(() => get_invoices.run())

	},
}