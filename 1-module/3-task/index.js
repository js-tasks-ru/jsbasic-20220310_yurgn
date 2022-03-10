function ucFirst(str) {
  if (str == "") return "" 
  else if (!str.includes(" ") &&  str )  {
    return str[0].toUpperCase() + str.slice(1, str.lengh);
  } 
}
