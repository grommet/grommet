import { validEmail } from '../validation';

afterAll(() => {
  jest.clearAllMocks();
});

describe('Email validations', () => {
  test('validate emails', () => {
    expect(validEmail('shimrit.yacobi@hpe.com')).toBe(true);
    expect(validEmail('shimrit.yacobi@gmail.com')).toBe(true);
    expect(validEmail('123@Golang.co')).toBe(true);
    expect(validEmail('@Golang.co')).toBe(false);
    expect(validEmail('123@Golangco')).toBe(false);
    expect(validEmail('123Golang.co')).toBe(false);
  });
});
