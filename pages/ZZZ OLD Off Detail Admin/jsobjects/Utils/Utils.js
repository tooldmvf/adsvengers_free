export default {
	
	myCurrencyK: (input) => {
		const num = input;
		if (!num) return 0;
    if(num > 999 && num < 1000000){
        return '€' + (num/1000).toFixed(2) + 'K'; 
    }else if(num > 1000000){
        return '€' + (num/1000000).toFixed(2) + 'M'; 
    }else if(num <= 999 && num >= -999){
        return  '€' + num.toFixed(2); 
    }else if(num < -999 && num > -1000000){
        return '€' + (num/1000).toFixed(2) + 'K'; 
    }
	},
	
}