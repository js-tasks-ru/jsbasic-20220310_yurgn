function showSalary(users, age) {
  return users
  .filter(item => item.age <= age)
  .map((item, index, arr) => index == (arr.length - 1) ? item.name + ", " + item.balance : item.name + ", " + item.balance + "\n")
  .join('') ;
}

