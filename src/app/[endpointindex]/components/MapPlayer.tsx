import React, { MutableRefObject, useEffect, useRef } from 'react';

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
import ToEndIcon from '@/svg-icons/to-end';
import CaretDownIcon from '@/svg-icons/caret-down';


// utils
import { interpolateNumToRGB, natcodeToMetric, hexToRGB } from '../../lib/utils';

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

    const lastTimeRef = useRef<number | null>(null);
    const currentYearRef = useRef<number>(statMinYear);
    const speedRef = useRef<number>(300);

    const [animating, setAnimating] = React.useState<boolean>(false);
    const startColorRgb = hexToRGB(startColor);
    const endColorRgb = hexToRGB(endColor);


    function animateFeatures(event: RenderEvent) {
        const time = event.frameState?.time;
        if (!time || !lastTimeRef.current) {
            console.error('No time');
            return;
        }

        const elapsedTime = time - lastTimeRef.current;

        if (currentYearRef.current <= statMaxYear) {

            if (elapsedTime > speedRef.current) {

                console.log('Animating', currentYearRef.current);
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

                currentYearRef.current += 1;
                lastTimeRef.current = time;
                mapRef.current?.render();
            }
        } else {
            stopAnimation();
        }

        mapRef.current?.render();

    }

    function startAnimation() {
        setAnimating(true);

        lastTimeRef.current = Date.now();
        currentYearRef.current = statMinYear;
        layerRef.current?.on('postrender', animateFeatures);
        // trigger postrender event by changing something: set style to null
        layerRef.current?.setStyle();
    }

    function stopAnimation() {
        setAnimating(false);
        layerRef.current?.un('postrender', animateFeatures);
    }

    return (
        <section className='p-8 bg-white w-full shadow rounded-2xl border border-zinc-200'>

            {/* Time selector */}
            <div className='flex justify-between'>

                <Select>
                    <SelectTrigger className="w-24">
                        <SelectValue placeholder="1987" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1987">1997</SelectItem>
                        <SelectItem value="1988">1988</SelectItem>
                    </SelectContent>
                </Select>

                <div className='flex flex-col items-center justify-center mt-2 text-sm'>
                    <span>2012</span>
                    <CaretDownIcon width={16} height={16} />
                </div>

                <Select>
                    <SelectTrigger className="w-24">
                        <SelectValue placeholder="2022" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Time slider */}
            <div className='relative flex items-center h-3 w-full  mt-2 mb-5 px-2'>
                <div className='w-full h-1 bg-black rounded-sm' />
                <div className='absolute top-0 left-0 w-3 h-full rounded border border-black bg-black' />
            </div>

            {/* Media player */}
            <div className='flex gap-5 justify-center items-center'>

                {/* Skip to left end */}
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

                {/* Skip to right end */}
                <button>
                    <ToEndIcon width={16} height={16} />
                </button>

                {/* Speed selector */}
                <Select>
                    <SelectTrigger className="w-24">
                        <SelectValue placeholder="1 x" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0.5">0.5 x</SelectItem>
                        <SelectItem value="0.75">0.75 x</SelectItem>
                        <SelectItem value="1">1 x</SelectItem>
                        <SelectItem value="1.25">1.25 x</SelectItem>
                        <SelectItem value="1.5">1.5 x</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>
    );
}