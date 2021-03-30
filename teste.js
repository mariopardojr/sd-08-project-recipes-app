a = ['@wallace', '@rray', '@cigano'];

b = a
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

console.log(b);
