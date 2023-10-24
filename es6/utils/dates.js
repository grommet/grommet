export var setHoursWithOffset = function setHoursWithOffset(date) {
  var newDate = new Date(date);
  if ((date == null ? void 0 : date.indexOf('T')) === -1) {
    var offset = newDate.getTimezoneOffset();
    var hour = newDate.getHours();
    newDate.setHours(hour, offset < 0 ? -offset : offset);
  }
  return newDate;
};