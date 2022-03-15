function isEmpty(obj) {
  let counter = 0;
  for (let key in obj) {
  counter++; 
  }
  return (counter == 0) ? true : false;
}
