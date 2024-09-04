import React, { MutableRefObject, useRef } from 'react';

// My imports
import { interpolateIntToRGB } from '../lib/utils';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';

// themes
import { themes } from '../lib/themes';

export default function MapPlayer(
    {
        sourceRef,
        layerRef,
        mapRef,
    }: {
        layerRef: MutableRefObject<VectorLayer | null>;
        sourceRef: MutableRefObject<VectorSource | null>;
        mapRef: MutableRefObject<Map | null>;
    }
) {

    const animating = useRef(false);
    
    const statMin = 0;
    const statMax = 100;
    const statCurrent = 50;

    function fillFeatures(event: RenderEvent) {
        setTimeout(() => {
            const features = sourceRef.current?.getFeatures();
            features?.forEach((feature) => {
                feature.setStyle(new Style({
                    fill: new Fill({ color: interpolateIntToRGB(statCurrent, statMin, statMax, themes.finland.secondary, themes.finland.primary) }),
                }));
            });

            mapRef.current?.render();
        }, 50)
    }

    function startAnimation() {
        animating.current = true;

        layerRef.current?.on('postrender', fillFeatures);

        // trigger postrender event by changing something: set style to null
        layerRef.current?.setStyle();
    }

    function stopAnimation() {
        animating.current = false;
        layerRef.current?.un('postrender', fillFeatures);
    }

    function animateMap() {
        if (animating.current) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    return (
        <section className='p-10 bg-white w-full'>
            <button onClick={animateMap}>Play</button>
        </section>
    );
}