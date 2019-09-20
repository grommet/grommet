import { deepFreeze, deepMerge } from '..';

test('Object freezes', () => {
  const obj = deepFreeze({ a: 'b' });

  try {
    obj.a = 'c';
    fail('cannot change object');
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});

test('Object merges deep', () => {
  const obj = deepMerge(
    {
      name: 'Someone',
      address: {
        city: 'Palo Alto',
      },
    },
    {
      age: '15',
      address: {
        city: 'Mountain View',
        country: 'US',
      },
      profile: {
        username: 'someone',
      },
    },
  );

  expect(obj).toMatchSnapshot();
});

test('Object merges deep with freezed object', () => {
  const obj = deepMerge(
    deepFreeze({
      name: 'Someone',
      address: {
        city: 'Palo Alto',
      },
    }),
    deepFreeze({
      name: 'someone else',
      age: '15',
      address: {
        city: 'Mountain View',
        country: 'US',
      },
      profile: {
        username: 'someone',
      },
    }),
  );

  expect(obj).toMatchSnapshot();
});
