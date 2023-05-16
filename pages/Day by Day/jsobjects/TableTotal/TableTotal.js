export default {
	tblSummary: async (calcType='total', idField='id' ) => {
	
		const dataset = await SelectFinancialCopy.run();

		if (dataset && Object.keys(dataset).length === 0 && Object.getPrototypeOf(dataset) === Object.prototype) return;
		await storeValue('summaryRow', undefined);
		let summaryRow = {};
		//loop properties of first row, set summaryRow[prop] based on calcType
		Object.keys(dataset[0]).forEach(prop => {
			let values = dataset.map(r=>r[prop]);
			let thisType = typeof(values[0]);

			switch(thisType){
				case 'number':
				case 'boolean':
					summaryRow[prop] = prop == idField ? calcType : //display calcType in idField
					calcType == 'unique' ? _.uniq(values).length :
					calcType == 'min' ? _.min(values) :
					calcType == 'max' ? _.max(values) :					
					calcType == 'total' ? _.sum(values) :
					calcType == 'average' ? _.sum(values)/values.length :
					'number-error'
					break;      	
				case 'string':
					summaryRow[prop] = prop == idField ? calcType : //display calcType in idField
					calcType == 'unique' ? _.uniq(values).length :
					calcType == 'min' ? _.sortedUniq(values)[0] :
					calcType == 'max' ? _.sortedUniq(values).reverse()[0] :
					calcType == 'total' ? _.countBy(dataset,prop) :
					calcType == 'average' ? _.head(_.maxBy(Object.entries(_.countBy(dataset,prop)),_.last)) :
					'string-error'
					break;
				default:
					summaryRow[prop] = 'n/a'
					break;
			}

		});
    storeValue('custom_off','false');
		storeValue('custom_off2','false');
		await storeValue('summaryRow', summaryRow);
		return dataset.concat(summaryRow)
	},
}