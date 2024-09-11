import { StatData, StatIndex, StatLabel } from './definitions';
import { RgbColor } from "react-colorful";


// COLOR UTILITIES ---------------------------------------------------------

export function rgbToHex(color: RgbColor): string {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase();
}

export function hexToRGB(hex: string): RgbColor {
    const code = hex.replace('#', '');
    let bigint = parseInt(code, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}

export function interpolateNumToRGB(value: number, min: number, max: number, startRGB: RgbColor, targetRGB: RgbColor): RgbColor {
    const ratio = (value - min) / (max - min);

    const r = Math.floor(startRGB.r + (targetRGB.r - startRGB.r) * ratio);
    const g = Math.floor(startRGB.g + (targetRGB.g - startRGB.g) * ratio);
    const b = Math.floor(startRGB.b + (targetRGB.b - startRGB.b) * ratio);

    return { r, g, b };
}


// STAT UTILITIES ---------------------------------------------------------

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

export function getMinValue(values: number[]): number {
    return Math.min(...values);
}

export function getMaxValue(values: number[]): number {
    return Math.max(...values);
}

export function getMinYear(years: StatLabel): number {
    return Math.min(...Object.keys(years).map(year => parseInt(year)));
}

export function getMaxYear(years: StatLabel): number {
    return Math.max(...Object.keys(years).map(year => parseInt(year)));
}




// NUMBER UTILITIES ---------------------------------------------------------

export function getDiffBetween(a: number, b: number, max?: number): number {
    const diff = Math.abs(a - b);
    return max ? Math.min(diff, max) : diff;
}

export function getRange(a: number, b: number, maxLength: number = Infinity, increment: number = 1): number[] {
    const length = Math.min(maxLength, Math.floor(getDiffBetween(a, b) / increment) + 1);
    return Array.from({ length }, (_, i) => a + i * increment);
}