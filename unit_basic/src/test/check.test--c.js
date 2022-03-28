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
