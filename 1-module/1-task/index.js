function factorial(n) {
  let fact = n ;
  if ( n === 0 ) {return fact = 1;}
  
  for ( let i = 1 ; i < n ; i++) {
      fact *= (n - i) ;
  }
  return fact;
}
