const ProductService = require('../product_service.js');
const stubProductClient = require('./stub_product_client.js');

// stub 코드: 대리 코드 활용
describe('Product service - stub', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new stubProductClient());
  });

  it('true item return', () => {
    // const fetchItems = productService.fetchAvailableItems();
    return productService.fetchAvailableItems().then((res) => {
      expect(res).toEqual([{ name: 'Milk1', available: true }]);
    });
  });
});
