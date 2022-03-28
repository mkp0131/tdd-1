// 스택 First in Last out
// 스택 구조: {size: 0, head: {value, next: 이전 스택}}

class Stack {
  // value;
  // next;
  #_size = 0;
  head;

  constructor() {
    this._size = 0;
  }

  size() {
    return this._size;
  }

  pop() {
    if (this.size < 1) throw new Error('size is 0');
    const node = this.head;
    this.head = node.next;
    this._size = this._size - 1;
    return node.value;
  }

  push(value) {
    const node = { value: value, next: this.head };
    this.head = node;
    this._size = this._size + 1;
  }

  peack() {
    return this.head.value;
  }
}

// const stack = new Stack();
// console.log(stack._size);
module.exports = Stack;
