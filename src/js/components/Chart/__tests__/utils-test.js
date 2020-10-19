import { areNormalizedBoundsEquals, areNormalizedValuesEquals } from '../utils';

describe('utils', () => {
  test('areNormalizedValuesEquals', () => {
    expect(
      areNormalizedValuesEquals([{ value: [1] }], [{ value: [1] }]),
    ).toBeTruthy();
    expect(areNormalizedValuesEquals([{ value: [1] }], undefined)).toBeFalsy();
    expect(
      areNormalizedValuesEquals(
        [{ value: [1] }],
        [{ value: [1] }, { value: [2] }],
      ),
    ).toBeFalsy();
    expect(areNormalizedValuesEquals([], [])).toBeTruthy();
    expect(
      areNormalizedValuesEquals([{ test: 'test' }], [{ value: [2] }]),
    ).toBeFalsy();
    expect(
      areNormalizedValuesEquals([{ value: [1] }], [{ test: 'test' }]),
    ).toBeFalsy();
  });

  test('areNormalizedBoundsEquals', () => {
    expect(
      areNormalizedBoundsEquals(
        [
          [0, 1],
          [0, 1],
        ],
        [
          [0, 1],
          [0, 1],
        ],
      ),
    ).toBeTruthy();
    expect(
      areNormalizedBoundsEquals(
        [
          [0, 1],
          [0, 1],
        ],
        undefined,
      ),
    ).toBeFalsy();
    expect(
      areNormalizedBoundsEquals(undefined, [
        [0, 1],
        [0, 1],
      ]),
    ).toBeFalsy();
    expect(
      areNormalizedBoundsEquals(
        [],
        [
          [0, 1],
          [0, 1],
        ],
      ),
    ).toBeFalsy();
    expect(areNormalizedBoundsEquals([], [])).toBeFalsy();
  });
});
