const fetchProduct = require('../async.js');

describe('fetchProduct', () => {
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

  it('error1', () => {
    return fetchProduct('error').catch((err) => {
      expect(err).toBe('network error');
    });
  });

  // rejects 메소드 이용
  it('error2', () => {
    expect(fetchProduct('error')).rejects.toBe('network error');
  });
});
