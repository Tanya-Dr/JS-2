const script = require('../script');
const sum = script.sum;
const dif = script.dif;
const product = script.product;
const division = script.division;

describe("Функция sum()", () => {
    it("должна возвращать 5 при аргументах (3,2)", () => {
        expect(sum(3,2)).toBe(5);
    });

    it("должна возвращать NaN при одном из аргументов null (или при двух)", () => {
        expect(sum(null,2)).toBeNaN();
        expect(sum(2,null)).toBeNaN();
        expect(sum(null,null)).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа string (или при двух)", () => {
        expect(sum('test',2)).toBeNaN();
        expect(sum(2,'test')).toBeNaN();
        expect(sum('test','test')).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа undefined (или при двух)", () => {
        expect(sum(undefined,2)).toBeNaN();
        expect(sum(2,undefined)).toBeNaN();
        expect(sum(undefined,undefined)).toBeNaN();
    });
});

describe("Функция dif()", () => {
    it("должна возвращать 1 при аргументах (3,2)", () => {
        expect(dif(3,2)).toBe(1);
    });

    it("должна возвращать -1 при аргументах (4,5)", () => {
        expect(dif(4,5)).toBe(-1);
    });

    it("должна возвращать NaN при одном из аргументов null (или при двух)", () => {
        expect(dif(null,2)).toBeNaN();
        expect(dif(2,null)).toBeNaN();
        expect(dif(null,null)).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа string (или при двух)", () => {
        expect(dif('test',2)).toBeNaN();
        expect(dif(2,'test')).toBeNaN();
        expect(dif('test','test')).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа undefined (или при двух)", () => {
        expect(dif(undefined,2)).toBeNaN();
        expect(dif(2,undefined)).toBeNaN();
        expect(dif(undefined,undefined)).toBeNaN();
    });
});

describe("Функция product()", () => {
    it("должна возвращать 6 при аргументах (3,2)", () => {
        expect(product(3,2)).toBe(6);
    });

    it("должна возвращать 2.4 при аргументах (1.2,2)", () => {
        expect(product(1.2,2)).toBe(2.4);
    });

    it("должна возвращать 0 при одном из аргументов = 0", () => {
        expect(product(0,2)).toBe(0);
        expect(product(2,0)).toBe(0);
    });

    it("должна возвращать само число при умножении на 1", () => {
        expect(product(1,2)).toBe(2);
        expect(product(2,1)).toBe(2);
    });

    it("должна возвращать NaN при одном из аргументов null (или при двух)", () => {
        expect(product(null,2)).toBeNaN();
        expect(product(2,null)).toBeNaN();
        expect(product(null,null)).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа string (или при двух)", () => {
        expect(product('test',2)).toBeNaN();
        expect(product(2,'test')).toBeNaN();
        expect(product('test','test')).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа undefined (или при двух)", () => {
        expect(product(undefined,2)).toBeNaN();
        expect(product(2,undefined)).toBeNaN();
        expect(product(undefined,undefined)).toBeNaN();
    });
});

describe("Функция division()", () => {
    it("должна возвращать 2 при аргументах (6,3)", () => {
        expect(division(6,3)).toBe(2);
    });

    it("должна возвращать 0.5 при аргументах (1,2)", () => {
        expect(division(1,2)).toBe(0.5);
    });

    it("должна возвращать 0 при первом аргументе = 0", () => {
        expect(division(0,2)).toBe(0);;
    });

    it("должна возвращать бесконечность при делении на 0", () => {
        expect(division(2,0)).toBe(Infinity);
    });

    it("должна возвращать само число при делении на 1", () => {
        expect(division(2,1)).toBe(2);
    });

    it("должна возвращать 1 при делении на само себя", () => {
        expect(division(2,2)).toBe(1);
    });

    it("должна возвращать NaN при одном из аргументов null (или при двух)", () => {
        expect(division(null,2)).toBeNaN();
        expect(division(2,null)).toBeNaN();
        expect(division(null,null)).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа string (или при двух)", () => {
        expect(division('test',2)).toBeNaN();
        expect(division(2,'test')).toBeNaN();
        expect(division('test','test')).toBeNaN();
    });

    it("должна возвращать NaN при одном из аргументов типа undefined (или при двух)", () => {
        expect(division(undefined,2)).toBeNaN();
        expect(division(2,undefined)).toBeNaN();
        expect(division(undefined,undefined)).toBeNaN();
    });
});
