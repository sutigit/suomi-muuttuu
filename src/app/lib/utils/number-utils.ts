// NUMBER UTILITIES ---------------------------------------------------------
export class NumberUtils {

    /**
     * Returns the base 10 logarithm of a number, using the +1 trick to handle non-positive numbers.
     * The logarithm is calculated as `log10(num + 1)` to ensure valid results for non-negative numbers, including 0.
     * 
     * @param {number} num - The number to calculate the logarithm of (0 and positive numbers are allowed).
     * 
     * @returns {number} The base 10 logarithm of the input number with the +1 adjustment.
     * 
     * @throws {Error} If the input number is negative.
     * 
     * @example
     * 
     * log10Num(1000);
     * // returns 3.000434077479319 (since log10(1001) ≈ 3)
     * 
     * log10Num(0);
     * // returns 0 (since log10(0 + 1) = log10(1) = 0)
     */
    static log10Num(num: number): number {
        if (isNaN(num)) {
            throw new Error("log10Num: input must be a number");
        }

        if (num < 0) {
            throw new Error("log10Num: input must be a non-negative number");
        }

        return Math.log10(num + 1); // Apply the +1 trick to
    }

    /**
     * Returns an array of base 10 logarithms of the input numbers.
     * 
     * @param {number[]} arr - The array of numbers to calculate the logarithms of.
     * 
     * @returns {number[]} An array of base 10 logarithms of the input numbers.
     * 
     * @throws {Error} If any of the input numbers is not a positive number.
     * 
     * @example
     * 
     * log10Arr([1000, 100, 10, 1]);
     * 
     * // returns [3, 2, 1, 0]
     */
    static log10Arr(arr: number[]): number[] {
        return arr.map(this.log10Num);
    }


    /**
     * Returns the inverse of the base 10 logarithm of a number, accounting for the +1 trick used in the logarithmic transformation.
     * The inverse operation reverses the transformation where the log was applied to `num + 1`.
     * 
     * @param {number} num - The number to calculate the inverse logarithm of (expected to be a value transformed with the +1 trick).
     * 
     * @returns {number} The inverse of the base 10 logarithm of the input number, reversing the +1 adjustment.
     * 
     * @throws {Error} If the input number is not a non-negative number.
     * 
     * @example
     * 
     * inverseLog10Num(3);
     * // returns 999 (since log10(1000 + 1) = 3)
     */
    static inverseLog10Num(num: number): number {

        if (isNaN(num)) {
            throw new Error("inverseLog10Num: input must be a number");
        }

        if (num < 0) {
            throw new Error("inverseLog10Num: input must be a non-negative number");
        }

        return Math.pow(10, num) - 1; // Subtract 1 to reverse the +1 trick
    }

    /**
     * Returns an array of the inverses of the base 10 logarithms of the input numbers.
     * 
     * @param {number[]} arr - The array of numbers to calculate the inverse logarithms of.
     * 
     * @returns {number[]} An array of the inverses of the base 10 logarithms of the input numbers.
     * 
     * @throws {Error} If any of the input numbers is not a positive number.
     * 
     * @example
     * 
     * inverseLog10Arr([3, 2, 1, 0]);
     * // returns [1000, 100, 10, 1]
     */
    static inverseLog10Arr(arr: number[]): number[] {
        return arr.map(this.inverseLog10Num);
    }

    /**
     * Returns the absolute difference between two numbers.
     * 
     * @param {number} a - The first number.
     * 
     * @param {number} b - The second number.
     * 
     * @param {number} [max] - The maximum difference allowed.
     * 
     * @returns {number} The absolute difference between the two numbers.
     * 
     * @example
     * 
     * getDiffBetween(10, 5);
     * // returns 5
     */
    static getDiffBetween(a: number, b: number, max?: number): number {

        const diff = Math.abs(a - b);
        return max ? Math.min(diff, max) : diff;
    }

    /**
     * Returns an array of numbers between two numbers.
     * 
     * @param {number} a - The first number.
     * 
     * @param {number} b - The second number.
     * 
     * @param {number} [maxLength=Infinity] - The maximum length of the array.
     * 
     * @param {number} [increment=1] - The increment between the numbers.
     * 
     * @returns {number[]} An array of numbers between the two input numbers.
     * 
     * @example
     * 
     * getRange(0, 10, 5);
     * // returns [0, 2, 4, 6, 8, 10]
     */
    static getRange(a: number, b: number, maxLength: number = Infinity, increment: number = 1): number[] {

        const length = Math.min(maxLength, Math.floor(this.getDiffBetween(a, b) / increment) + 1);
        return Array.from({ length }, (_, i) => a + i * increment);
    }

    /**
     * Returns an intermediate number between two numbers based on the elapsed time.
     * 
     * @param {number} elapsedTime - The time elapsed since the start of the interval.
     * 
     * @param {number} intervalDuration - The total duration of the interval.
     * 
     * @param {number} start - The starting number.
     * 
     * @param {number} end - The ending number.
     * 
     * @returns {number} An intermediate number between the two input numbers.
     * 
     * @example
     * 
     * interpolateNumByTimeDiff(500, 1000, 0, 10);
     * // returns 5
     */
    static interpolateNumByTimeDiff(elapsedTime: number, intervalDuration: number, start: number, end: number): number {
        const diff = end - start;
        const diffRatio = elapsedTime / intervalDuration;
        const intermediateNumber = start + diff * diffRatio;
        return intermediateNumber;
    }
}