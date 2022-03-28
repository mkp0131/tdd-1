const ProductClient = require('../product_client.js');
const ProductService = require('../product_service_no_di.js');

// 모듈내에 모든 함수를 모두 목 함수로 변경
// 자동으로 호이스팅 되어 맨위로 올라감
jest.mock('../product_client');

const items = [
  { name: 'Milk1', available: true },
  { name: 'Milk2', available: false },
  { name: 'Milk3', available: false },
];

const fetchItems = jest.fn(async () => {
  return items;
});
// ProductClient 의 함수를 내가 원하는 함수로 변경
ProductClient.mockImplementation(() => {
  return { fetchItems };
});

describe('Product service', () => {
  let prodcutService;

  beforeEach(() => {
    fetchItems.mockClear(); // mockclear 옵션이 설저안되어 있는 경우 필수
    ProductClient.mockClear(); // ProductClient 도 mock() 이기떄문에 클리어
    prodcutService = new ProductService();
  });

  it('should return true items', () => {
    return prodcutService.fetchAvailableItems().then((res) => {
      expect(res).toEqual([{ name: 'Milk1', available: true }]);
    });
  });

  it('just once call', async () => {
    await prodcutService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});

// 🧤 전체 로직정리
// product_service_no_di 는 product_client 의 코드에 의존성이 있다.
// 유닛 테스트의 조건인 독립성이 없다.
// product_client 에 가짜 class 를 만들어주고,
// 또 product_client 내부에서 사용하는 fetchItems 라는 함수를 가짜 함수로 만들어준다.
// product_client 와 fetchItems 를 mockImplementation 로 연결해준다.
