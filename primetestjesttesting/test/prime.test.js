const prime = require('../prime');

// test('checks if 2 is a prime number', () => {
//     expect(prime(2)).toBe(true);
// });

// test('checks if 3 is a prime number', () => {
//     expect(prime(3)).toBe(true);
// });



// test('checks if 13 is a prime number', () => {
//     expect(prime(13)).toBe(true);
// });

describe("prime",()=>{
  test("should return true if number is prime",()=>{
    expect(prime(3)).toBe(true);
  });
});

