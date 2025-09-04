var sum_to_n_a = function (n) {
  // Solution 1: Using a for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // Solution 2: Using the arithmetic series formula
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  // Solution 3: Using recursion
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};
