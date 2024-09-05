import React, { MutableRefObject, useRef } from 'react';

// My imports
import { interpolateNumToRGB, natcodeToMetric } from '../lib/utils'; 4

// definitions
import { StatData } from '../lib/definitions';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';

// themes
import { themes } from '../lib/themes';

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
}) {

    const animating = useRef<boolean>(false);
    const lastTime = useRef<number | null>(null);
    const currentYear = useRef<number>(statMinYear);
    const speed = useRef<number>(300);


    function animateFeatures(event: RenderEvent) {
        const time = event.frameState?.time;
        if (!time || !lastTime.current) {
            console.error('No time');
            return;
        }

        const elapsedTime = time - lastTime.current;

        if (currentYear.current <= statMaxYear) {

            if (elapsedTime > speed.current) {

                console.log('Animating', currentYear.current);
                const features = sourceRef.current?.getFeatures();

                features?.forEach((feature) => {

                    const natcode = feature.get('NATCODE');
                    const statValue = natcodeToMetric(natcode, statData, currentYear.current);

                    const color = interpolateNumToRGB(
                        statValue,
                        statMinValue,
                        statMaxValue,
                        themes.finland.secondary,
                        themes.finland.primary
                    )

                    feature.setStyle(new Style({
                        fill: new Fill({ color: color }),
                    }));
                });

                currentYear.current += 1;
                lastTime.current = time;
                mapRef.current?.render();
            }
        } else {
            stopAnimation();
        }

        mapRef.current?.render();

    }

    function startAnimation() {
        animating.current = true;

        lastTime.current = Date.now();
        currentYear.current = statMinYear;
        layerRef.current?.on('postrender', animateFeatures);
        // trigger postrender event by changing something: set style to null
        layerRef.current?.setStyle();
    }

    function stopAnimation() {
        animating.current = false;
        layerRef.current?.un('postrender', animateFeatures);
    }

    function animateMap() {
        if (animating.current) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    return (
        <section className='p-8 bg-white w-full shadow rounded-2xl'>
            <button className='p-8 bg-black text-white' onClick={animateMap}>Play</button>
        </section>
    );
}