// generate a data set
var dataSet = {
  generateData: function generateData(count, max, min) {
    if (count === void 0) {
      count = 5;
    }
    if (max === void 0) {
      max = 100;
    }
    if (min === void 0) {
      min = 0;
    }
    var data = [];
    var date = new Date();
    var span = max - min;
    while (data.length < count) {
      var s = Math.sin(data.length / 2.0);
      var value = s * (span / 2) + (span / 2 + min);
      var nextDay = date.getDate() - 1;
      date = new Date(date);
      date.setDate(nextDay);
      data.unshift({
        time: date.getTime(),
        value: value
      });
    }
    return data;
  }
};
var generateData = dataSet.generateData;
export { generateData };