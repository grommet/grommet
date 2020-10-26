import { areNormalizedBoundsEquals, areNormalizedValuesEquals } from '../utils';

describe('utils', () => {
  test('areNormalizedValuesEquals', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');

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

    expect(warnSpy).toBeCalledTimes(6);
    expect(warnSpy).toHaveBeenCalledWith(
      `This function will be removed in the upcoming releases.
Please get in touch with us if you have concerns.`,
    );
  });

  test('areNormalizedBoundsEquals', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');

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

    expect(warnSpy).toBeCalledTimes(5);
    expect(warnSpy).toHaveBeenCalledWith(
      `This function will be removed in the upcoming releases.
Please get in touch with us if you have concerns.`,
    );
  });
});
