import { ColorUtils as clu } from "@/app/lib/utils/color";

export default function MapValues({
    statMinValue,
    statMaxValue,
    statMinYear,
    statMaxYear,
    startColor,
    endColor,
}: {
    statMinValue: number,
    statMaxValue: number,
    statMinYear: number,
    statMaxYear: number,
    startColor: string,
    endColor: string,
}) {

    function computeBackgroundColor(value: number) {
        const rgb = clu.interpolateNumToRGB(value, 0, 100, clu.hexToRGB(startColor), clu.hexToRGB(endColor));
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }



    return (
        <div className="flex flex-col items-end gap-4 px-12 rounded-lg">
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 10 000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{ backgroundColor: computeBackgroundColor(100) }} />
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 5000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{ backgroundColor: computeBackgroundColor(75) }} />
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 1000'}</p>
                <div className="w-6 h-4 shadow rounded" style={{ backgroundColor: computeBackgroundColor(50) }} />
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 500'}</p>
                <div className="w-6 h-4 shadow rounded" style={{ backgroundColor: computeBackgroundColor(25) }} />
            </div>
            <div className="flex gap-5 items-center text-sm">
                <p>{'> 100'}</p>
                <div className="w-6 h-4 shadow rounded" style={{ backgroundColor: computeBackgroundColor(0) }} />
            </div>
        </div>
    );
}