'use client';

import React, { MutableRefObject, useEffect } from 'react';

// ol types
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

// ol imports
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';
import GeoJSON from 'ol/format/GeoJSON.js';

// utils
import { interpolateIntToRGB } from '../lib/utils';

// geojson
import geojson from '@/geojson/suomen_kunta_jako.json';

// themes
import { themes } from '../lib/themes';

export default function MapView({
    sourceRef,
    layerRef,
    viewRef,
    mapRef,
}: {
    sourceRef: MutableRefObject<VectorSource | null>,
    layerRef: MutableRefObject<VectorLayer | null>,
    viewRef: MutableRefObject<View | null>,
    mapRef: MutableRefObject<Map | null>,
}) {

    const statMin = 0;
    const statMax = 100;
    const statCurrent = 50;

    useEffect(() => {

        sourceRef.current = new VectorSource({
            features: new GeoJSON().readFeatures(geojson),
            attributions: '© <a href="https://www.maanmittauslaitos.fi/">Maanmittauslaitos</a>',
        })

        layerRef.current = new VectorLayer({
            source: sourceRef.current,
        });

        viewRef.current = new View({
            center: [0, 0],
            zoom: 1,
        });

        mapRef.current = new Map({
            layers: [layerRef.current],
            target: 'mapRef',
            view: viewRef.current,
        });


        // Fit country to the mapRef
        const extent = sourceRef.current.getExtent();
        viewRef.current.fit(extent, { size: mapRef.current.getSize(), padding: [80, 80, 80, 80] });

        // Remove controls
        mapRef.current.getControls().clear();

        // Initial fill
        const features = sourceRef.current.getFeatures();
        features.forEach((feature) => {
            feature.setStyle(new Style({
                fill: new Fill({ color: interpolateIntToRGB(statCurrent, statMin, statMax, themes.finland.secondary, themes.finland.primary) }),
            }));
        });

        return () => mapRef.current?.setTarget();
    }, []);

    return (
        <div className='w-full h-full' id="mapRef" />
    );
}