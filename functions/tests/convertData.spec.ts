/**
 * 
 * test for;
 * value without field name; number, string, boolean, array, object(map), null.
 */
import { describe, it } from "mocha";
import { expect } from "chai";
import { convertData } from "../src/libraries";

describe("convertData", () => {
    it("should return null", () => {
        expect(convertData(null)).to.be.null;
    });

    it("Scalar should return the value in data field: number", () => {
        expect(convertData(123)._data).equal({ _data: 123 }._data);
    });

    it("Scalar should return the value in data field: string", () => {
        expect(JSON.stringify(convertData("abc"))).equal(JSON.stringify({ _data: "abc" }));
    });

    it("Scalar should return the value in data field: boolean", () => {
        expect(convertData(true)._data).equal({ _data: true }._data);
    });

    it("Scalar should return the value in data field: even if the value is an array", () => {
        const arr = [1, 2, 3];
        expect(JSON.stringify(convertData(arr))).equal(JSON.stringify({ _data: arr }));
    });

    it("should return object(map)", () => {
        const obj = { a: 1, b: 2 };
        expect(JSON.stringify(convertData(obj))).equal(JSON.stringify(obj));
    });

});

