const deepCopy = require('./deepcopy');

describe('deepCopy 함수 테스트', () => {
  test('기본형 복사', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(null)).toBeNull();
  });

  test('객체 복사', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepCopy(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.b).not.toBe(obj.b);
  });

  test('배열 복사', () => {
    const arr = [1, [2, 3]];
    const clone = deepCopy(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
    expect(clone[1]).not.toBe(arr[1]);
  });

  test('Date 복사', () => {
    const date = new Date();
    const clone = deepCopy(date);
    expect(clone).toEqual(date);
    expect(clone).not.toBe(date);
  });

  test('RegExp 복사', () => {
    const regex = /abc/g;
    const clone = deepCopy(regex);
    expect(clone).toEqual(regex);
    expect(clone).not.toBe(regex);
  });

  test('Map 복사', () => {
    const map = new Map([
      ['x', { y: 1 }],
      ['z', 2]
    ]);
    const clone = deepCopy(map);
    expect(clone).toEqual(map);
    expect(clone).not.toBe(map);
    expect(clone.get('x')).not.toBe(map.get('x'));
  });

  test('Set 복사', () => {
    const set = new Set([{ a: 1 }, { b: 2 }]);
    const clone = deepCopy(set);
    expect(clone).toEqual(set);
    expect(clone).not.toBe(set);
  });

  test('순환 참조 복사', () => {
    const obj = { name: 'loop' };
    obj.self = obj;
    const clone = deepCopy(obj);
    expect(clone).toEqual(obj);
    expect(clone.self).toBe(clone);
  });
});