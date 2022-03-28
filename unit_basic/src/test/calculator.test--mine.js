const Calculator = require('../Calculator.js');

test('Calculator', () => {
  const cal = new Calculator();
  // 테스트 코드 작성
  cal.set(10);
  expect(cal).toEqual({ value: 10 });

  cal.clear();
  expect(cal).toEqual({ value: 0 });

  cal.add(99);
  expect(cal).toEqual({ value: 99 });

  expect(() => cal.add(100)).toThrow(Error);

  cal.subtract(10);
  expect(cal).toEqual({ value: 89 });

  cal.multiply(10);
  expect(cal).toEqual({ value: 890 });

  cal.divide(10);
  expect(cal).toEqual({ value: 89 });
});
