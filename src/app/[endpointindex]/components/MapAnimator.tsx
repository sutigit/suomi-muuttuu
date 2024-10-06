import React, { MutableRefObject, useEffect, useState, useRef } from 'react';

// shadcn
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// Media player icons
import PlayIcon from '@/svg-icons/play';
import PauseIcon from '@/svg-icons/pause';
import ToStartIcon from '@/svg-icons/to-start';
import RepeatIcon from '@/svg-icons/repeat';
import CaretDownIcon from '@/svg-icons/caret-down';



// utils
import { NumberUtils as nu } from '@/app/lib/utils/number-utils';
import { ColorUtils as clu } from '@/app/lib/utils/color-utils';
import { StatUtils as stu } from '@/app/lib/utils/stat-utils';

// definitions
import { StatData } from '../../lib/definitions';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';



export default function MapAnimator({
    sourceRef,
    layerRef,
    viewRef,
    mapRef,
    statData,
    statMinValue,
    statMaxValue,
    statMinYear,
    statMaxYear,
    startColor,
    endColor,
}: {
    sourceRef: MutableRefObject<VectorSource | null>,
    layerRef: MutableRefObject<VectorLayer | null>,
    viewRef: MutableRefObject<View | null>,
    mapRef: MutableRefObject<Map | null>,
    statData: StatData,
    statMinValue: number,
    statMaxValue: number,
    statMinYear: number,
    statMaxYear: number,
    startColor: string,
    endColor: string,
}) {

    // Initial styling
    const startColorRgb = clu.hexToRGB(startColor);
    const endColorRgb = clu.hexToRGB(endColor);

    // Handle player control states
    const [startYear, setStartMinYear] = useState<number>(statMinYear);
    const [targetYear, setTargetYear] = useState<number>(statMaxYear);
    const [currentYear, setCurrentYear] = useState<number>(statMinYear);
    const [speed, setSpeed] = useState<number>(1);
    const [sliderHandlePosition, setSliderHandlePosition] = useState<number>(0);

    function handleSelectStartYear(year: string) {
        stopAnimation();
        setStartMinYear(parseInt(year));
        setCurrentYear(parseInt(year));
    }

    function handleSelectTargetYear(year: string) {
        stopAnimation();
        setTargetYear(parseInt(year));
    }

    function handleSelectSpeed(speed: string) {
        stopAnimation();
        setSpeed(parseFloat(speed));
    }

    // Handle animation flow
    const [animating, setAnimating] = useState<boolean>(false);

    const intervalStartTimeRef = useRef<number | null>(null);
    const currentYearRef = useRef<number>(statMinYear);

    const intervalDuration = 200; // 4s for each year

    function animateFeatures(event: RenderEvent) {
        const frameStateTime = event.frameState?.time;
        if (!frameStateTime || !intervalStartTimeRef.current) {
            console.error('Invalid time');
            return;
        }


        const elapsedTime = frameStateTime - intervalStartTimeRef.current;

        // Animate as long as the current year is less than the target year
        if (currentYearRef.current < targetYear) {

            if (elapsedTime <= intervalDuration) {

                // Get all the features, which represent all municipalities in the map
                const municipalities = sourceRef.current?.getFeatures();
                // Paint the municipalities with the color based on the stat value
                municipalities?.forEach((municipality) => {

                    const natcode = municipality.get('NATCODE');
                    const currentYearStatValue = stu.natcodeToMetric(natcode, statData, currentYearRef.current);
                    const nextYearStatValue = stu.natcodeToMetric(natcode, statData, currentYearRef.current + 1);
                    const intermediateStatValue = nu.interpolateNumByTimeDiff(elapsedTime, intervalDuration, currentYearStatValue, nextYearStatValue);

                    const color = clu.interpolateNumToRGB(
                        intermediateStatValue,
                        statMinValue,
                        statMaxValue,
                        startColorRgb,
                        endColorRgb
                    )

                    municipality.setStyle(new Style({
                        fill: new Fill({ color: [color.r, color.g, color.b] }),
                    }));
                });
            }

            else {
                // Reset elapsed time
                intervalStartTimeRef.current = Date.now();

                // Update the current year
                currentYearRef.current += 1;
                setCurrentYear(currentYearRef.current);
            }

            // Re-render the map
            mapRef.current?.render();

            // // Handle map player state
            setSliderHandlePosition(prev => prev + 100 / nu.getDiffBetween(startYear, targetYear, 40));

        } else {
            stopAnimation();
        }
    }

    function startAnimation() {
        console.log("Starting animation...");
        setAnimating(true);
        setSliderHandlePosition(0);

        intervalStartTimeRef.current = Date.now();
        currentYearRef.current = startYear;

        if (layerRef.current) {
            layerRef.current.on('postrender', animateFeatures);

            // trigger postrender event by changing something: set style to null
            layerRef.current.setStyle();
        } else {
            console.error("Layer reference not found.");
        }
    }

    function stopAnimation() {
        console.log("Stopping animation...");
        setAnimating(false);

        if (layerRef.current) {
            layerRef.current.un('postrender', animateFeatures);
            console.log("Removed postrender event listener.");
        } else {
            console.log("Layer reference not found.");
        }
    }

    return (
        <section className='p-8 bg-white w-full shadow-sm rounded-2xl border border-zinc-300'>
            {/* Title */}
            <p className='font-medium mb-6'>Asukasluvut kunnittain</p>

            {/* Time selector */}
            <div className='flex justify-between'>

                {/* Set Min Year */}
                <Select defaultValue={startYear.toString()} onValueChange={handleSelectStartYear}>
                    <SelectTrigger className="w-24">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            nu.getRange(statMinYear, statMaxYear).map((year) => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>

                {/* Display current year */}
                <div className='flex flex-col items-center justify-center mt-2 text-sm'>
                    <span>{currentYear}</span>
                    <CaretDownIcon width={16} height={16} />
                </div>

                {/* Set Max Year */}
                <Select defaultValue={targetYear.toString()} onValueChange={handleSelectTargetYear}>
                    <SelectTrigger className="w-24">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            nu.getRange(statMinYear, statMaxYear).map((year) => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>


            {/* Time slider */}
            <div className='relative flex items-center h-6 w-full mt-3 mb-6'>

                { /* Slider bar */}
                <div className='w-full h-4 bg-zinc-200 flex'>

                    {/* Slider tics */}
                    {
                        nu.getRange(startYear, targetYear, 40).map((year) => (
                            <div key={year} className='border-r-2 border-white h-full' style={{ width: `${(100.0 / nu.getDiffBetween(startYear, targetYear, 40))}%` }} />
                        ))
                    }
                </div>

                {/* Slider handle */}
                <div className='absolute top-0 w-1 h-full rounded bg-black' style={{ left: `${sliderHandlePosition}%` }} />
            </div>



            {/* Media player */}
            <div className='flex justify-center gap-4 items-center'>

                {/* Play controls */}
                <div className='flex items-center gap-2'>
                    {/* Start from beginning */}
                    <button>
                        <ToStartIcon width={16} height={16} />
                    </button>

                    {/* Play / Pause */}
                    {animating ?
                        <button onClick={stopAnimation}>
                            <PauseIcon width={24} height={24} />
                        </button> :
                        <button onClick={startAnimation}>
                            <PlayIcon width={24} height={24} />
                        </button>
                    }
                </div>

                {/* Speed selector */}
                <div className='flex items-center gap-2'>
                    <p className='text-sm'>Nopeus:</p>
                    <Select defaultValue={speed.toString()} onValueChange={handleSelectSpeed}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                nu.getRange(0.25, 2, Infinity, 0.25).map((speed) => (
                                    <SelectItem key={speed} value={speed.toString()}>{speed}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}