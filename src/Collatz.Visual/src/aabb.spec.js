import { assert } from "chai";
import { collision } from "./aabb";

describe("collision", () => {
    describe("when boxes overlap", () => {
        it("should return true", () => {
            const a = { tl: {x: 0, y: 0}, br: {x: 2, y: 2 } };
            const b = { tl: {x: 1, y: 1}, br: {x: 3, y: 3 } };
            const result = collision(a, b);
            assert.isTrue(result);
        });
    });

    describe("when boxes overlap", () => {
        it("should return false", () => {
            const a = { tl: {x: 0, y: 0}, br: {x: 2, y: 2 } };
            const b = { tl: {x: 10, y: 10}, br: {x: 12, y: 12 } };
            const result = collision(a, b);
            assert.isFalse(result);
        });
    });

    describe("when boxes share edge", () => {
        it("should return false", () => {
            const a = { tl: {x: 0, y: 0}, br: {x: 2, y: 2 } };
            const b = { tl: {x: 2, y: 0}, br: {x: 4, y: 2 } };
            const result = collision(a, b);
            assert.isFalse(result);
        });
    });

});