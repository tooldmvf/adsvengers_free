export default {
	duplicate_date: async () => {
		const results  = SubTable.updatedRows ? SubTable.updatedRows.map(row => {return row.allFields}) : SubTable.updatedRow;
		const key_to_del = ['to_char','Approved Conv.','Rejected Conv.','Pending Conv.','Rejected Rate','customColumn2','roi','Pending Rev.','Approved Rev.','Rejected Rev.','network_other_name','offer_name','off_cat_name', 'offer_payout','user_aff_id','Date','ts_name','concat','fk_network_id','mediabuyer','Approv. Profit','Approv. ROI','Tot Profit','Tot ROI'];
		var new_array =[];
		var myNum = 0;
		
		if(results instanceof Array) {
			for(const element of results) {
				key_to_del.forEach(i => {
					delete element[i];
				});
				element["financial_date"] = DateToDuplicate.selectedDate;
				if (typeof element.amount_spent == 'string') myNum = Number(element.amount_spent.replace('€','')); else myNum = Number(element.amount_spent);			
				element["amount_spent"] = myNum;
				element["amount_spent_plus_fee"] = myNum+(myNum/element["spent_rate_fees"]);
				if (typeof element.amount_revenue == 'string') myNum = Number(element.amount_revenue.replace('€','')); else myNum = Number(element.amount_revenue);
				element["amount_revenue_approved"] = myNum;
				element["amount_revenue"] = myNum;
				element["conversions_approved"] = element.amount_conversion;	
				new_array.push(element);
			}		
		} else {
			var result = Object.assign({}, results);
			key_to_del.forEach(i => {
				delete result[i];
			});
			result["financial_date"] = DateToDuplicate.selectedDate;
			if (typeof result.amount_spent == 'string') myNum = Number(result.amount_spent.replace('€','')); else myNum = Number(result.amount_spent);			
			result["amount_spent"] = myNum;			
			result["amount_spent_plus_fee"] = myNum+(myNum/result["spent_rate_fees"]);
			if (typeof result.amount_revenue == 'string') myNum = Number(result.amount_revenue.replace('€','')); else myNum = Number(result.amount_revenue);
			result["amount_revenue_approved"] = myNum;
			result["amount_revenue"] = myNum;
			result["conversions_approved"] = result.amount_conversion;			
			new_array.push(result);
		}
		await storeValue('new_array', new_array);
		await clone_day.run();	
		await TableTotal.tblSummary();
	}
}