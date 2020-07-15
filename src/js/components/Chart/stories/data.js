// generate a data set
const dataSet = {
  generateData: (count, max) => {
    const data = [];
    let value = max / 2;
    let increase = true;
    let date = new Date();
    while (data.length < count) {
      if (increase) {
        value += (max - value) % Math.ceil(((data.length % (max / 4)) + 1) / 2);
        if (value >= max) {
          increase = false;
        }
      } else {
        value -= value % Math.ceil(((data.length % (max / 4)) + 1) / 2);
        if (value <= 0) {
          increase = true;
        }
      }
      const nextDay = date.getDate() - 1;
      date = new Date(date);
      date.setDate(nextDay);
      data.unshift({ time: date.getTime(), value });
    }
    return data;
  },
};

export const { generateData } = dataSet;
