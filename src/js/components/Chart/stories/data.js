// generate a data set
const dataSet = {
  generateData: (count = 5, max = 100, min = 0) => {
    const data = [];
    let date = new Date();
    const span = max - min;
    while (data.length < count) {
      const s = Math.sin(data.length / 2.0);
      const value = s * (span / 2) + (span / 2 + min);
      const nextDay = date.getDate() - 1;
      date = new Date(date);
      date.setDate(nextDay);
      data.unshift({ time: date.getTime(), value });
    }
    return data;
  },
};

export const { generateData } = dataSet;
