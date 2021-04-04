const script = require("../script");
const { sum, del, pro, minus } = script;

describe("sum должна возвращать", () => {
  it("3 при (1,2)", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("0 при (0,0)", () => {
    expect(sum(0, 0)).toBe(0);
  });
  it("wrong arguments при ('sd',2)", () => {
    expect(sum("sd", 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (undefined',2)", () => {
    expect(sum(undefined, 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (null',2)", () => {
    expect(sum(null, 2)).toBe("wrong arguments");
  });
});

describe("minus должна возвращать", () => {
  it("-1 при (1,2)", () => {
    expect(minus(1, 2)).toBe(-1);
  });
  it("0 при (0,0)", () => {
    expect(minus(0, 0)).toBe(0);
  });
  it("wrong arguments при ('sd',2)", () => {
    expect(minus("sd", 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (undefined',2)", () => {
    expect(minus(undefined, 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (null',2)", () => {
    expect(minus(null, 2)).toBe("wrong arguments");
  });
});

describe("del должна возвращать", () => {
  it("0.5 при (1,2)", () => {
    expect(del(1, 2)).toBe(0.5);
  });
  it("на ноль делить нельзя при (0,0)", () => {
    expect(del(0, 0)).toBe("на ноль делить нельзя");
  });
  it("wrong arguments при ('sd',2)", () => {
    expect(del("sd", 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (undefined',2)", () => {
    expect(del(undefined, 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (null',2)", () => {
    expect(del(null, 2)).toBe("wrong arguments");
  });
});

describe("pro должна возвращать", () => {
  it("2 при (1,2)", () => {
    expect(pro(1, 2)).toBe(2);
  });
  it("0 при (0,0)", () => {
    expect(pro(0, 0)).toBe(0);
  });
  it("wrong arguments при ('sd',2)", () => {
    expect(pro("sd", 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (undefined',2)", () => {
    expect(pro(undefined, 2)).toBe("wrong arguments");
  });
  it("wrong arguments при (null',2)", () => {
    expect(pro(null, 2)).toBe("wrong arguments");
  });
});
