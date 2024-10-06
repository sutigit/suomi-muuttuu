import { StatData, StatIndex, StatLabel } from '../definitions';

// STAT UTILITIES ---------------------------------------------------------
export class StatUtils {

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
    static natcodeToMetric(natcode: string, statData: StatData, year: number): number {
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
    static getMinValue(values: number[]): number {
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
    static getMaxValue(values: number[]): number {
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
    static getMinYear(years: StatLabel): number {
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
    static getMaxYear(years: StatLabel): number {
        return Math.max(...Object.keys(years).map(year => parseInt(year)));
    }

}