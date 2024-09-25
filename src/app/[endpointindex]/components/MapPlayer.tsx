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
import {
    interpolateNumToRGB,
    natcodeToMetric,
    hexToRGB,
    getRange,
    getDiffBetween,
} from '../../lib/utils';

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



export default function MapPlayer({
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
    const startColorRgb = hexToRGB(startColor);
    const endColorRgb = hexToRGB(endColor);

    // Handle player control states
    const [localLeftSideYear, setLocalLeftSideMinYear] = useState<number>(statMinYear);
    const [localRightSideYear, setLocalRightSideMaxYear] = useState<number>(statMaxYear);
    const [currentYear, setCurrentYear] = useState<number>(statMinYear);
    const [speed, setSpeed] = useState<number>(1);
    const [sliderHandlePosition, setSliderHandlePosition] = useState<number>(0);

    function handleSelectLeftSideYear(year: string) {
        stopAnimation();
        setLocalLeftSideMinYear(parseInt(year));
        setCurrentYear(parseInt(year));
    }

    function handleSelectRightSideYear(year: string) {
        stopAnimation();
        setLocalRightSideMaxYear(parseInt(year));
    }

    function handleSelectSpeed(speed: string) {
        stopAnimation();
        setSpeed(parseFloat(speed));
    }

    // Handle animation flow
    const [animating, setAnimating] = useState<boolean>(false);

    const startTimeRef = useRef<number | null>(null);
    const currentYearRef = useRef<number>(statMinYear);
    const speedRef = useRef<number>(300);

    const yearGapTime = 4000; // 4s for each year

    function animateFeatures(event: RenderEvent) {
        const frameStateTime = event.frameState?.time;
        if (!frameStateTime || !startTimeRef.current) {
            console.error('Invalid time');
            return;
        }


        const elapsedTime = frameStateTime - startTimeRef.current;

        console.log('elapsedTime', elapsedTime);

        if (currentYearRef.current <= localRightSideYear) {

            if (elapsedTime > speedRef.current) {

                // Paints the map with the current year's data
                const features = sourceRef.current?.getFeatures();
                features?.forEach((feature) => {

                    const natcode = feature.get('NATCODE');
                    const statValue = natcodeToMetric(natcode, statData, currentYearRef.current);

                    const color = interpolateNumToRGB(
                        statValue,
                        statMinValue,
                        statMaxValue,
                        startColorRgb,
                        endColorRgb
                    )

                    feature.setStyle(new Style({
                        fill: new Fill({ color: [color.r, color.g, color.b] }),
                    }));
                });

                // Set the next year
                currentYearRef.current += 1;
                setCurrentYear(currentYearRef.current);

                // Handle map player state
                setSliderHandlePosition(prev => prev + 100/getDiffBetween(localLeftSideYear, localRightSideYear, 40));

                // Set new time for previous render time
                // startTimeRef.current = time;

                // Re-render the map
                mapRef.current?.render();
            }
        } else {
            stopAnimation();
        }

        mapRef.current?.render();

    }

    function startAnimation() {
        setAnimating(true);
        setSliderHandlePosition(0);

        startTimeRef.current = Date.now();
        currentYearRef.current = localLeftSideYear;
        layerRef.current?.on('postrender', animateFeatures);
        // trigger postrender event by changing something: set style to null
        layerRef.current?.setStyle();
    }

    function stopAnimation() {
        setAnimating(false);
        layerRef.current?.un('postrender', animateFeatures);
    }

    return (
        <section className='p-8 bg-white w-full shadow-sm rounded-2xl border border-zinc-300'>

            {/* Time selector */}
            <div className='flex justify-between'>

                {/* Set Min Year */}
                <Select defaultValue={localLeftSideYear.toString()} onValueChange={handleSelectLeftSideYear}>
                    <SelectTrigger className="w-24">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getRange(statMinYear, statMaxYear).map((year) => (
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
                <Select defaultValue={localRightSideYear.toString()} onValueChange={handleSelectRightSideYear}>
                    <SelectTrigger className="w-24">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getRange(statMinYear, statMaxYear).map((year) => (
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
                        getRange(localLeftSideYear, localRightSideYear, 40).map((year) => (
                            <div key={year} className='border-r-2 border-white h-full' style={{ width: `${(100.0 / getDiffBetween(localLeftSideYear, localRightSideYear, 40))}%` }} />
                        ))
                    }
                </div>

                {/* Slider handle */}
                <div className='absolute top-0 w-1 h-full rounded bg-black' style={{left: `${sliderHandlePosition}%`}}/>
            </div>



            {/* Media player */}
            <div className='flex justify-between items-center'>

                {/* Play controls */}
                <div className='flex items-center gap-3'>
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

                    {/* Repeat toggle */}
                    <button>
                        <RepeatIcon width={14} height={14} />
                    </button>
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
                                getRange(0.25, 2, Infinity, 0.25).map((speed) => (
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