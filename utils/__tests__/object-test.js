"use strict";

var _ = require("..");

test('Object freezes', function () {
  var obj = (0, _.deepFreeze)({
    a: 'b'
  });

  try {
    obj.a = 'c';
    fail('cannot change object');
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});
test('Object merges deep', function () {
  var obj = (0, _.deepMerge)({
    name: 'Someone',
    address: {
      city: 'Palo Alto'
    }
  }, {
    age: '15',
    address: {
      city: 'Mountain View',
      country: 'US'
    },
    profile: {
      username: 'someone'
    }
  });
  expect(obj).toMatchSnapshot();
});
test('Object merges deep with freezed object', function () {
  var obj = (0, _.deepMerge)((0, _.deepFreeze)({
    name: 'Someone',
    address: {
      city: 'Palo Alto'
    }
  }), (0, _.deepFreeze)({
    name: 'someone else',
    age: '15',
    address: {
      city: 'Mountain View',
      country: 'US'
    },
    profile: {
      username: 'someone'
    }
  }));
  expect(obj).toMatchSnapshot();
});