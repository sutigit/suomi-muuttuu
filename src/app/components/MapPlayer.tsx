'use client';
'use client';

import React, { MutableRefObject, useRef } from 'react';

// My imports
import { getRandomColor } from '../lib/utils';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';

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

    function fillFeatures(event: RenderEvent) {
        setTimeout(() => {
            const features = sourceRef.current?.getFeatures();
            features?.forEach((feature) => {
                feature.setStyle(new Style({
                    fill: new Fill({ color: getRandomColor() }),
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
        layerRef.current?.setStyle(new Style({ fill: new Fill({ color: 'coral' }) }));
    }

    function animateMap() {
        if (animating.current) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    return (
        <section className='p-10 bg-blue-200 w-full z-10'>
            <button onClick={animateMap}>Play</button>
        </section>
    );
}