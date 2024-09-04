export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export function interpolateIntToRGB(value: number, min: number, max: number, startRGB: number[], targetRGB: number[]): number[] {
    const ratio = (value - min) / (max - min) || 1;

    const r = Math.floor(startRGB[0] + (targetRGB[0] - startRGB[0]) * ratio);
    const g = Math.floor(startRGB[1] + (targetRGB[1] - startRGB[1]) * ratio);
    const b = Math.floor(startRGB[2] + (targetRGB[2] - startRGB[2]) * ratio);

    return [r, g, b];
}

export function getMinValue(values: number[]): number {
    return Math.min(...values);
}

export function getMaxValue(values: number[]): number {
    return Math.max(...values);
}