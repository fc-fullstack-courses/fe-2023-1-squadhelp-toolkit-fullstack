function sum(a, b) {
  return Number(a) + Number(b);
}

describe('sum tests', () => {
  test('2 + 2 must be equal 4', () => {
    expect(sum(2, 2)).toBe(4);
  });

  test('2 + 2 must not be equal 9', () => {
    expect(sum(2, 2)).not.toBe(9);
  });

  test('2:string + 2:string must be equal 4', () => {
    expect(sum('2', '2')).toBe(4);
  });

  test('0.1 + 0.2 must be ~= 0.3', () => {

    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
})