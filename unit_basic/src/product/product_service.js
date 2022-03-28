// 함수내에서 생성자로 실행시키는 것은 좋지 않다. 의존성이 생겨서 test 코드 작성시 복잡해짐.

class ProductService {
  constructor(productClient) {
    // this.productClient = new ProductClient(); // ❗ BAD CODE!
    this.productClient = productClient;
  }

  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;
