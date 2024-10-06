import { StatData, StatIndex, StatLabel } from './definitions';
import { RgbColor } from "react-colorful";


// COLOR UTILITIES ---------------------------------------------------------

/**
 * Returns a hex color code based on an RGB color.
 * 
 * @param {RgbColor} color - The RGB color to convert to a hex color code.
 * 
 * @returns {string} A hex color code based on the input RGB color.
 * 
 * @example
 * 
 * rgbToHex({ r: 255, g: 255, b: 255 });
 * // returns "#FFFFFF"
 */
export function rgbToHex(color: RgbColor): string {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase();
}

/**
 * Returns an RGB color based on a hex color code.
 * 
 * @param {string} hex - The hex color code to convert to an RGB color.
 * 
 * @returns {RgbColor} An RGB color based on the input hex color code.
 * 
 * @example
 * 
 * hexToRGB("#FFFFFF");
 * // returns { r: 255, g: 255, b: 255 }
 */
export function hexToRGB(hex: string): RgbColor {
    const code = hex.replace('#', '');
    let bigint = parseInt(code, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}

/**
 * Returns an RGB color based on a number between two numbers.
 * 
 * @param {number} value - The number to calculate the color for.
 * 
 * @param {number} min - The minimum number.
 * 
 * @param {number} max - The maximum number.
 * 
 * @param {RgbColor} startRGB - The starting RGB color.
 * 
 * @param {RgbColor} targetRGB - The target RGB color.
 * 
 * @returns {RgbColor} An RGB color based on the input number.
 * 
 * @example
 * 
 * interpolateNumToRGB(50, 0, 100, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
 * // returns { r: 128, g: 128, b: 128 }
 */
export function interpolateNumToRGB(value: number, min: number, max: number, startRGB: RgbColor, targetRGB: RgbColor): RgbColor {
    const ratio = (value - min) / (max - min);

    const r = Math.floor(startRGB.r + (targetRGB.r - startRGB.r) * ratio);
    const g = Math.floor(startRGB.g + (targetRGB.g - startRGB.g) * ratio);
    const b = Math.floor(startRGB.b + (targetRGB.b - startRGB.b) * ratio);

    return { r, g, b };
}



// STAT UTILITIES ---------------------------------------------------------

/**
 * Returns the metric value for a given national code, year, and stat data.
 * 
 * @param {string} natcode - The national code to get the metric value for.
 * 
 * @param {StatData} statData - The stat data to get the metric value from.
 * 
 * @param {number} year - The year to get the metric value for.
 * 
 * @returns {number} The metric value for the given national code, year, and stat data.
 * 
 * @example
 * 
 * natcodeToMetric("FI", statData, 2010);
 * // returns 100
 */
export function natcodeToMetric(natcode: string, statData: StatData, year: number): number {
    const role_geo: string = statData.role.geo[0];
    const role_time: string = statData.role.time[0];

    const geo_index: number = statData.dimension[role_geo].category.index["KU" + natcode];
    // const geo_label: string = statData.dimension[role_geo].category.label["KU" + natcode];

    const time_index: number = statData.dimension[role_time].category.index[year.toString()];

    const time_size = statData.size[statData.id.indexOf(role_time)];

    const value_index = geo_index * time_size + time_index;
    const statValue = statData.value[value_index];
    return statValue;
}

/**
 * Returns the minimum value in an array of numbers.
 * 
 * @param {number[]} values - The array of numbers to find the minimum value in.
 * 
 * @returns {number} The minimum value in the input array.
 * 
 * @example
 * 
 * getMinValue([10, 5, 20]);
 * // returns 5
 */
export function getMinValue(values: number[]): number {
    return Math.min(...values);
}

/**
 * Returns the maximum value in an array of numbers.
 * 
 * @param {number[]} values - The array of numbers to find the maximum value in.
 * 
 * @returns {number} The maximum value in the input array.
 * 
 * @example
 * 
 * getMaxValue([10, 5, 20]);
 * // returns 20
 */
export function getMaxValue(values: number[]): number {
    return Math.max(...values);
}

/**
 * Returns the minimum year in a dictionary of years.
 * 
 * @param {StatLabel} years - The dictionary of years to find the minimum year in.
 * 
 * @returns {number} The minimum year in the input dictionary.
 * 
 * @example
 * 
 * getMinYear({2010: "2010", 2011: "2011", 2012: "2012"});
 * // returns 2010
 */
export function getMinYear(years: StatLabel): number {
    return Math.min(...Object.keys(years).map(year => parseInt(year)));
}

/**
 * Returns the maximum year in a dictionary of years.
 * 
 * @param {StatLabel} years - The dictionary of years to find the maximum year in.
 * 
 * @returns {number} The maximum year in the input dictionary.
 * 
 * @example
 * 
 * getMaxYear({2010: "2010", 2011: "2011", 2012: "2012"});
 * // returns 2012
 */
export function getMaxYear(years: StatLabel): number {
    return Math.max(...Object.keys(years).map(year => parseInt(year)));
}




// NUMBER UTILITIES ---------------------------------------------------------

/**
 * Returns the base 10 logarithm of a number.
 * 
 * @param {number} num - The number to calculate the logarithm of.
 * 
 * @returns {number} The base 10 logarithm of the input number.
 * 
 * @throws {Error} If the input number is not a positive number.
 * 
 * @example
 * 
 * log10Num(1000);
 * // returns 3
 */
export function log10Num(num: number): number {

    if (num <= 0 || isNaN(num)) {
        throw new Error("log10Num: input must be a positive number");
    }

    return Math.log10(num);
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
export function log10Arr(arr: number[]): number[] {
    return arr.map(log10Num);
}

/**
 * Returns the inverse of the base 10 logarithm of a number.
 * 
 * @param {number} num - The number to calculate the inverse logarithm of.
 * 
 * @returns {number} The inverse of the base 10 logarithm of the input number.
 * 
 * @throws {Error} If the input number is not a positive number.
 * 
 * @example
 * 
 * inverseLog10Num(3);
 * // returns 1000
 */
export function inverseLog10Num(num: number): number {

    if (num <= 0 || isNaN(num)) {
        throw new Error("inverseLog10Num: input must be a positive number");
    }

    return Math.pow(10, num);
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
export function inverseLog10Arr(arr: number[]): number[] {
    return arr.map(inverseLog10Num);
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
export function getDiffBetween(a: number, b: number, max?: number): number {

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
export function getRange(a: number, b: number, maxLength: number = Infinity, increment: number = 1): number[] {

    const length = Math.min(maxLength, Math.floor(getDiffBetween(a, b) / increment) + 1);
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
export function interpolateNumByTimeDiff(elapsedTime: number, intervalDuration: number, start: number, end: number): number {
    const diff = end - start;
    const diffRatio = elapsedTime / intervalDuration;
    const intermediateNumber = start + diff * diffRatio;
    return intermediateNumber;
}