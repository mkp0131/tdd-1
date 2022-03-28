const Calculator = require('../Calculator.js');

describe('Calculator', () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });

  it('init', () => {
    expect(cal.value).toEqual(0);
  });

  it('set', () => {
    cal.set(10);
    expect(cal.value).toEqual(10);
  });

  it('clear', () => {
    cal.set(10);
    cal.clear();
    expect(cal.value).toEqual(0);
  });

  it('add', () => {
    cal.add(99);
    expect(cal.value).toEqual(99);
  });

  it('add-error', () => {
    expect(() => cal.add(101)).toThrow('Value can not be greater than 100');
  });

  it('subtract', () => {
    cal.subtract(10);
    expect(cal.value).toEqual(-10);
  });

  it('multiply', () => {
    cal.set(10);
    cal.multiply(10);
    expect(cal.value).toEqual(100);
  });

  describe('divide', () => {
    it('0 / 0 is NaN', () => {
      cal.divide(0);
      expect(cal.value).toEqual(NaN);
    });

    it('1 / 0 is Infinity', () => {
      cal.set(1);
      cal.divide(0);
      expect(cal.value).toEqual(Infinity);
    });

    it('15 / 3 is 5', () => {
      cal.set(15);
      cal.divide(3);
      expect(cal.value).toEqual(5);
    });
  });
});
