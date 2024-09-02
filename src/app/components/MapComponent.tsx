'use client';
import React, { useEffect, useRef, useState } from 'react';

// My imports
import { getRandomColor } from '../lib/utils';

// ol imports
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import RenderEvent from 'ol/render/Event';

// geojson
import geojson from '@/geojson/suomen_kunta_jako.json';

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

export default function MapComponent() {
    // Use refs for states so that they don't trigger re-renders to avoid losing ol components
    const animating = useRef(false);

    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson),
        attributions: '© <a href="https://www.maanmittauslaitos.fi/">Maanmittauslaitos</a>',
    })

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    const view = new View({
        center: [0, 0],
        zoom: 1,
    });

    let map: Map;

    useEffect(() => {
        map = new Map({
            layers: [vectorLayer],
            target: 'map',
            view: view,
        });

        // Fit country to the map
        const extent = vectorSource.getExtent();
        view.fit(extent, { size: map.getSize(), padding: [80, 80, 80, 80] });

        // Remove controls
        map.getControls().clear();

        // Initial fill
        const features = vectorSource.getFeatures();
        features.forEach((feature) => {
            feature.setStyle(new Style({
                fill: new Fill({ color: getRandomColor() }),
            }));
        });

        return () => map.setTarget(undefined);
    }, []);

    function fillFeatures(event: RenderEvent) {
        setTimeout(() => {
            const features = vectorSource.getFeatures();
            features.forEach((feature) => {
                feature.setStyle(new Style({
                    fill: new Fill({ color: getRandomColor() }),
                }));
            });
            map.render();
        }, 50)
    }

    function startAnimation() {
        animating.current = true;
        vectorLayer.on('postrender', fillFeatures);

        // trigger postrender event by changing something: set style to null
        vectorLayer.setStyle();
    }

    function stopAnimation() {
        animating.current = false;
        vectorLayer.un('postrender', fillFeatures);
        vectorLayer.setStyle(new Style({ fill: new Fill({ color: 'coral' }) }));
    }

    function animateMap() {
        if (animating.current) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    return (
        <div className='w-full h-full'>
            <button onClick={animateMap} className='bg-purple-500 text-white p-5'>Press me</button>
            <div className='w-full h-full' id="map" />
        </div>
    );
}