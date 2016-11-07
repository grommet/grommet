// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

export default {
  // http://my.opera.com/GreyWyvern/blog/show.dml/1671288
  // Do not attempt to change '==' to '===' in the following
  // method. Avoid type comparison is done on purpose.
  compare (a, b) {
    function chunkify(t) {
      var tz = [], x = 0, y = -1, n = 0, i, j;
      while (t && (i = (j = t.charAt(x++)).charCodeAt(0))) {
        var m = (i == 46 || (i >=48 && i <= 57));
        if (m !== n) {
          tz[++y] = "";
          n = m;
        }
        tz[y] += j;
      }
      return tz;
    }

    var aa = chunkify(a);
    var bb = chunkify(b);

    for (var x = 0; aa[x] && bb[x]; x++) {
      if (aa[x] !== bb[x]) {
        var c = Number(aa[x]), d = Number(bb[x]);
        if (c == aa[x] && d == bb[x]) {
          return c - d;
        } else {
          return (aa[x] > bb[x]) ? 1 : -1;
        }
      }
    }
    return aa.length - bb.length;
  }
};
