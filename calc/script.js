const sum = (a, b) => {
    if (
      typeof a == "string" ||
      typeof b == "string" ||
      a == undefined ||
      a == null ||
      b == undefined ||
      b == null
    ) {
      return "wrong arguments";
    }
    return a + b;
  },
  minus = (a, b) => {
    if (
      typeof a == "string" ||
      typeof b == "string" ||
      a == undefined ||
      a == null ||
      b == undefined ||
      b == null
    ) {
      return "wrong arguments";
    }
    return a - b;
  },
  pro = (a, b) => {
    if (
      typeof a == "string" ||
      typeof b == "string" ||
      a == undefined ||
      a == null ||
      b == undefined ||
      b == null
    ) {
      return "wrong arguments";
    }
    return a * b;
  },
  del = (a, b) => {
    if (
      typeof a == "string" ||
      typeof b == "string" ||
      a == undefined ||
      a == null ||
      b == undefined ||
      b == null
    ) {
      return "wrong arguments";
    }
    if (b == 0) {
      return "на ноль делить нельзя";
    }
    return a / b;
  };

module.exports = {
  sum,
  minus,
  del,
  pro,
};
