const Stack = require('../stack.js');

// 내부 구현사항이 아닌, 인터페이스를 통해 접근하여 TEST 한다.
describe('stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('init', () => {
    expect(stack.size()).toBe(0);
  });

  it('push', () => {
    stack.push('one');
    expect(stack.size()).toBe(1);
  });

  describe('pop', () => {
    it('pop: return last push value', () => {
      stack.push('one');
      stack.push('two');
      const value = stack.pop();
      expect(value).toBe('two');
      expect(stack.size()).toBe(1);
    });

    it('pop: throw error if stack size is 0', () => {
      expect(() => stack.pop()).toThrow(Error);
    });
  });

  describe('peack', () => {
    it('peack: return last item but keep it in the stack', () => {
      stack.push('one');
      stack.push('two');
      const value = stack.peack();
      expect(value).toBe('two');
      expect(stack.size()).toBe(2);
    });

    it('peack: throw error if stack size is 0', () => {
      expect(() => stack.peack()).toThrow(Error);
    });
  });
});
