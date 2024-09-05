import { StatData, StatIndex, StatLabel } from './definitions';

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function interpolateNumToRGB(value: number, min: number, max: number, startRGB: number[], targetRGB: number[]): number[] {
    const ratio = (value - min) / (max - min);

    const r = Math.floor(startRGB[0] + (targetRGB[0] - startRGB[0]) * ratio);
    const g = Math.floor(startRGB[1] + (targetRGB[1] - startRGB[1]) * ratio);
    const b = Math.floor(startRGB[2] + (targetRGB[2] - startRGB[2]) * ratio);

    return [r, g, b];
}

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