interface Feature {
    type: string;
    properties: {
        GML_ID: number;
        NATCODE: string;
        NAMEFIN: string;
        NAMESWE: string;
        LANDAREA: number;
        FRESHWAREA: number;
        SEAWAREA: number;
        TOTALAREA: number;
    },
    geometry: {
        type: string;
        coordinates: number[][][][];
    }
}