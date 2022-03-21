function getMinMax(str) {
  let arr = str
    .split(" ")
  	.filter(item => Number(item))
  	.map(item => Number(item))
  	.sort((a, b) => a - b)
  return {
    min: arr.shift(),
    max: arr.pop(),
	}
}
