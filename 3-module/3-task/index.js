function camelize(str) {
  let arr = str.split('-');
    arr.forEach((item, index) => {
    	if (!index == 0) {
    		arr[index] = item[0].toUpperCase() + item.slice(1, item.lengh);
    	}
    	});
    return arr.join('');
}
