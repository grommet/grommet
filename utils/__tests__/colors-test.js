"use strict";

var _ = require("..");

describe('colorIsDark', function () {
  test('#666666', function () {
    var dark = (0, _.colorIsDark)('#666666');
    expect(dark).toBe(true);
  });
  test('#66666699', function () {
    var dark = (0, _.colorIsDark)('#66666699');
    expect(dark).toBe(true);
  });
  test('#666', function () {
    var dark = (0, _.colorIsDark)('#666');
    expect(dark).toBe(true);
  });
  test('rgba(102, 102, 102)', function () {
    var dark = (0, _.colorIsDark)('rgba(102, 102, 102)');
    expect(dark).toBe(true);
  });
  test('rgba(102, 102, 102, 0.5)', function () {
    var dark = (0, _.colorIsDark)('rgba(102, 102, 102, 0.5)');
    expect(dark).toBe(true);
  });
  test('#999999', function () {
    var dark = (0, _.colorIsDark)('#999999');
    expect(dark).toBe(false);
  });
  test('#99999999', function () {
    var dark = (0, _.colorIsDark)('#99999999');
    expect(dark).toBe(false);
  });
  test('#999', function () {
    var dark = (0, _.colorIsDark)('#999');
    expect(dark).toBe(false);
  });
  test('rgba(153, 153, 153)', function () {
    var dark = (0, _.colorIsDark)('rgba(153, 153, 153)');
    expect(dark).toBe(false);
  });
  test('rgba(153, 153, 153, 0.5)', function () {
    var dark = (0, _.colorIsDark)('rgba(153, 153, 153, 0.5)');
    expect(dark).toBe(false);
  });
  test('#FFFFFF11', function () {
    var dark = (0, _.colorIsDark)('#FFFFFF11');
    expect(dark).toBe(undefined);
  });
  test('#FFF1', function () {
    var dark = (0, _.colorIsDark)('#FFF1');
    expect(dark).toBe(undefined);
  });
  test('#11111111', function () {
    var dark = (0, _.colorIsDark)('#11111111');
    expect(dark).toBe(undefined);
  });
  test('rgba(102, 102, 102, 0.4)', function () {
    var dark = (0, _.colorIsDark)('rgba(102, 102, 102, 0.4)');
    expect(dark).toBe(undefined);
  });
});
describe('getRGBA', function () {
  test('#666666', function () {
    var rgba = (0, _.getRGBA)('#666666');
    expect(rgba).toBe('rgba(102, 102, 102, 1)');
  });
  test('#66666699', function () {
    var rgba = (0, _.getRGBA)('#66666699');
    expect(rgba).toBe('rgba(102, 102, 102, 0.6)');
  });
  test('#666666 0.4', function () {
    var rgba = (0, _.getRGBA)('#666666', 0.4);
    expect(rgba).toBe('rgba(102, 102, 102, 0.4)');
  });
});