// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

export var baseUnit = 24;

export function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export function arcCommands (centerX, centerY, radius, startAngle, endAngle) {
  // handle that we can't draw a complete circle
  if (endAngle - startAngle >= 360) {
    endAngle = startAngle + 359.99;
  }
  var start = polarToCartesian(centerX, centerY, radius, endAngle);
  var end = polarToCartesian(centerX, centerY, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
};

export function translateEndAngle (startAngle, anglePer, value) {
  return Math.min(360, Math.max(0, startAngle + (anglePer * value)));
};
