import { themes } from "@/app/lib/themes";
import { interpolateNumToRGB } from "@/app/lib/utils";

function computeBackgroundColor(value: number) {
    const rgb = interpolateNumToRGB(value, 0, 100, themes.finland.secondary, themes.finland.primary);
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export default function MapValues() {
    return (
        <div className="flex flex-col items-end gap-4 px-12 rounded-lg">
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 10 000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{backgroundColor: computeBackgroundColor(100)}}/>
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 5000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{backgroundColor: computeBackgroundColor(75)}}/>
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 1000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{backgroundColor: computeBackgroundColor(50)}}/>
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 500'}</p>
                <div className="w-6 h-4 shadow rounded" style={{backgroundColor: computeBackgroundColor(25)}}/>
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 100'}</p>
                <div className="w-6 h-4 shadow rounded" style={{backgroundColor: computeBackgroundColor(0)}}/>
            </div>
        </div>
    );
}