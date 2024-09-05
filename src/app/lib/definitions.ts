export interface StatIndex {
    [key: string]: number;
}

export interface StatLabel {
    [key: string]: string;
}

export interface Dimension {
    [key: string]: {
        category: {
            index: StatIndex
            label: StatLabel
        }
    };
}

export interface StatData {
    role: {
        geo: string[],
        time: string[],
        metric: string[],
    },
    dimension: Dimension,
    id: string[],
    size: number[],
    value: number[],
}