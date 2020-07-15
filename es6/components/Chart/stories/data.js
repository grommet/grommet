// generate a data set
var dataSet = {
  generateData: function generateData(count, max) {
    var data = [];
    var value = max / 2;
    var increase = true;
    var date = new Date();

    while (data.length < count) {
      if (increase) {
        value += (max - value) % Math.ceil((data.length % (max / 4) + 1) / 2);

        if (value >= max) {
          increase = false;
        }
      } else {
        value -= value % Math.ceil((data.length % (max / 4) + 1) / 2);

        if (value <= 0) {
          increase = true;
        }
      }

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