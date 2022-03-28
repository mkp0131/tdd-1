# 유닛테스트와 TDD (웹개발자를 위한 테스트 마스터 클래스)

## 테스트란?

### 테스트 피라미드

E2E Test (end to end) > Integration Test > Unit Test

- Unit Test: 단위 테스트
- Integration Test: 통합 테스트 / 단위를 묶었을때 상호작용을 잘하는지 테스트
- E2E Test: UI 테스트 / 사용자 테스트 / Flow 테스트 / 사용자가 사용했을시 나타날 수 있는 오류 체크

### TDD

Test-driven development (테스트 주도 개발)

- 개발(코드 작성)전 테스트 코드를 먼저 작성
- 테스트 후 성공할때까지 반복
- 테스트 성공 후 리팩토링

> git 메인 repo 에 push 할때 테스트코드도 같이 첨부

### CI/CD

애플리케이션 개발 단계부터 배포까지 모든 단계들을 자동화를 통해 효율적이고 빠르게 사용자에게 배포하는 것

### CI (Continuous Integration): 지속적인 통합

버그 수정이나 새로 만드는 기능들이 메인 repo 에 주기적으로 빌드되고 테스트되어서 머지되는 것 (빌드 + 테스트)

#### 방법

1. 코드 변경사항을 주기적으로 빈번하게 머지해야한다. (최대한 작은 단위로 코드를 작성한다. 큰 단위로 작성시 conflict 해결로 시간을 다 허비할 수 있다.)
2. 통합을 위한 단계 (빌드, 테스트, 머지)의 자동화(머지가 되었으면 CI 스크립트를 통해서 여러가지 테스트들도 실행이 된다.)

#### 장점

1. 주기적으로 머지 하기 때문에 conflict 를 피해서, 개발의 생산성이 향상된다.
2. 머지된 파일은 자동으로 테스트 되기 때문에 버그 수정 용이, 문제점 빠르게 발견
3. 코드의 퀄리트 향상 (유닛테스트가 꼭 포함되기 때문에)

### CD (Continuous Delivery or Deployment): 지속적인 제공(배포)

`CI 완료 코드 -> Prepare Release -> Deploy Release` 에서
`Prepare Release -> Deploy Release` 의 중간단계

## JEST

CI/CD 테스트를 도와주는 라이브러리

### JEST 설치

```
npm i jest -g // 글로벌 설치
npm i jest --save-dev // 프로젝트 내에도 설치 (팀원들과 똑같은 개발환경)
```

### JEST TYPE 설정

- vscode 에서 jest 함수들의 타입(참조)을 보고 싶을때 type 을 설치

```
// 타입설치
npm i @types/jest --save-dev
```

- 프로젝트의 root 폴더에 jsconfig.json 파일 생성

```json
{
  "typeAcquisition": {
    "include": ["jest"]
  }
}
```

### JEST watch 기능

- `--watchAll` 명령어 추가 / 모든 파일을 다 체크한다.
- test, describe name 이 보이도록 하기위해 `--verbose` 명령어 추가

```json
"scripts": {
  "test": "jest --watchAll --verbose"
},
```

- `--watch` git commit 된 것을 제외한 파일들을 테스트하고 싶을 경우 사용. / commit 된 파일은 테스트하지 않는다.

### jest.config.js

- collectCoverage: false, // 테스트를 진행할때마다 커버리지 표를 보여준다. 많이보면 힘드니 false / 추후 명령어에서 --coverage 추가로 볼 수 있다.

### JEST init

- 사용할 프로젝트 에서 init 을 해준다.

```
jest --init
```

## 유닛 테스트

### 기본 Flow

코드 -> 요구사항 -> 요구사항 테스트 -> PASS or FAIL

- Test Runner: 테스트 실행 후 결과 생성
- Assertion: 테스트 조건, 비교를 통한 테스트 로직

### 방법

1. test 폴더를 생성
2. 파일명.test.js 형식으로 파일을 생성
3. 테스트 파일에 아래 코드 작성

```js
const add = require('../add.js');

test('add', () => {
  // 테스트 코드 작성
  expect(add(1, 2)).toBe(3);
});
```

4. expect 된 값이 맞는지 확인 메소드 리스트

```js
.toBe // 간단한 명확한 값
.not.toBe // 값이 아닌 경우
.toEqual // 값이 obj
```

> 참고문서: https://jestjs.io/docs/using-matchers

5. 🧤🧤🧤 각각의 테스트는 서로 독립적이어야한다. 즉, 그전 테스트에서 할당한 변수를 사용하면 안된다.
6. 공통적인 코드가 있다면 beforeEach, afterEach 를 활용한다.

```js
describe('Calculator', () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });
  // ...some code
}
```

```js
// 각각 테스트 마다 실행되는 함수
beforeEach: 각각의 테스트를 실행하기 전
afterEach: 각각의 테스트 실행 후

// 모든 테스트 단위로 실행
beforeAll: 모든 테스트가 실행하기 전(한번만)
afterAll: 모든 테스트가 실행 후(한번만)
```

> 참고문서: https://jestjs.io/docs/setup-teardown

- discribe, it 함수를 사용하여 테스트한다.

- 비동기 테스트시 프로미스를 return 한다.

```js
// 🧤🧤 비공기 테스트 여러가지 방법!
// 🧤 return 방식을 많이 사용한다.
// await, async 이용
it('ok', async () => {
  const result = await fetchProduct('ok');
  expect(result).toEqual({ item: 'Milk', price: 200 });
});

// done 함수이용
it('ok2', (done) => {
  fetchProduct('ok').then((res) => {
    expect(res).toEqual({ item: 'Milk', price: 200 });
    done();
  });
});

// reuturn 프로미스
it('ok3', () => {
  return fetchProduct('ok').then((res) => {
    expect(res).toEqual({ item: 'Milk', price: 200 });
  });
});

// resolves 메소드 이용
it('ok4', () => {
  expect(fetchProduct('ok')).resolves.toEqual({ item: 'Milk', price: 200 });
});

// rejects 메소드 이용
it('error2', () => {
  expect(fetchProduct('error')).rejects.toBe('network error');
});
```

## 🧤🧤🧤 Mock (모의 객체)

실제 객체를 만들어 사용하기에 시간, 비용 등의 Cost가 높거나 혹은 객체 서로간의 의존성이 강해 구현하기 힘들 경우 가짜 객체를 만들어 사용하는 방법

- jest.fn() 으로 모의 함수를 생성한다.
- jest.config.js 에서 clearMocks: false 가 되어있는 경우 fetchItems.mockClear(); 를 꼭 사용해야한다. (항상 하는게 좋음.)

```js
const check = require('../check.js');

// 모의 객체 Mock 을 생성
// Mock 으로 생성한 onSuccess, OnFail 이 실행이 되었는지 인자는 무언인지로 테스트를 진행

describe('mock', () => {
  let onSuccess;
  let onFail;

  // Mock 정의
  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it('should call onSuccess when predicate is true', () => {
    // check 함수 실행
    check(() => true, onSuccess, onFail);
    // 위에 check 함수 실행시 onSuccess 의 상태를 테스트
    expect(onSuccess.mock.calls.length).toBe(1); // 몇번 호출 되었는지
    // 🧤 calls 는 호출한 것은 담는 배열
    expect(onSuccess.mock.calls[0][0]).toBe('yes'); // 첫번째 arg 체크

    // ===========================
    // 위의 방법은 mock 의 calls 배열에 직접 접근하는 코드 - 가독성이 안좋다.
    // 아래 메소드 방식으로 리팩토링

    expect(onSuccess).toBeCalledTimes(1);
    expect(onSuccess).toBeCalledWith('yes');

    // ✋ if 문에서 다른 실행되지 않게 설정된 함수도 실행안되는지 테스트
    expect(onFail).toBeCalledTimes(0);
  });

  it('should call onFail when predicate is false', () => {
    check(() => false, onSuccess, onFail);

    expect(onFail).toBeCalledTimes(1);
    expect(onFail).toBeCalledWith('no');
    expect(onSuccess).toBeCalledTimes(0);
  });
});
```

### 🧤 전체 로직정리

- product_service_no_di 는 product_client 의 코드에 의존성이 있다.
- 유닛 테스트의 조건인 독립성이 없다.
- product_client 에 가짜 class 를 만들어주고,
- 또 product_client 내부에서 사용하는 fetchItems 라는 함수를 가짜 함수로 만들어준다.
- product_client 와 fetchItems 를 mockImplementation 로 연결해준다.

```js
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
```

### sub code (대리 코드) 활용

#### 위에 코드는 product_service_no_di 의 의존성으로 코드가 너무 복잡하다.

- 함수내에서 생성자로 실행시키는 것은 좋지 않다. 의존성이 생겨서 test 코드 작성시 복잡해짐.
- constructor 의 arg 로 받는 것으로 수정

```js
class ProductService {
  constructor(productClient) {
    // this.productClient = new ProductClient(); // ❗ BAD CODE!
    this.productClient = productClient;
  }
  // ...some code
}
```

- test 폴더 안에 stub_product_client.js 파일생성
- 대리로 사용할 코드를 작성

```js
class stubProductClient {
  async fetchItems() {
    return [
      { name: 'Milk1', available: true },
      { name: 'Milk2', available: false },
      { name: 'Milk3', available: false },
    ];
  }
}

module.exports = stubProductClient;
```

- 대리 코드 사용

```js
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
```
