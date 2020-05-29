"use strict";

exports.__esModule = true;
exports.data = void 0;
var data = [];
exports.data = data;

for (var i = 0; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    percent: Math.abs(v * 100)
  });
}