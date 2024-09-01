'use client';
import React, { useEffect } from 'react';

// ol imports
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

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

    // const filtered_geojson = geojson.features.filter((feature: Feature) => {
    //     return feature.properties.SEAWAREA === 0.0;
    // });

    // geojson.features = filtered_geojson;

    useEffect(() => {
        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geojson)
        })

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: {
                'fill-color': ['string', ['get', 'COLOR'], 'coral'],
                // 'stroke-color': 'white',
                // 'stroke-width': 1,
            },
        });

        const view = new View({
            center: [0, 0],
            zoom: 1,
        });

        const map = new Map({
            layers: [vectorLayer],
            target: 'map',
            view: view,
        });

        // Fit the country to the map
        const extent = vectorSource.getExtent();
        view.fit(extent, { size: map.getSize(), padding: [80, 80, 80, 80] });

        // Remove all interactions and controls
        map.getInteractions().clear();
        map.getControls().clear();


        // SOME COOL INTERACTIVITY SHIT ----

        // const featureOverlay = new VectorLayer({
        //     source: new VectorSource(),
        //     map: map,
        //     style: {
        //         'stroke-color': 'rgba(255, 255, 255, 0.7)',
        //         'stroke-width': 2,
        //     },
        // });

        // let highlight: any;
        // const displayFeatureInfo = function (pixel: any) {
        //     const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        //         return feature;
        //     });

        //     const info = document.getElementById('info');

        //     if (feature && info) {
        //         info.innerHTML = feature.get('ECO_NAME') || '&nbsp;';
        //     } else if (info) {
        //         info.innerHTML = '&nbsp;';
        //     }

        //     if (highlight && feature !== highlight) {
        //         if (highlight) {
        //             const source = featureOverlay.getSource()
        //             if (source) {
        //                 source.removeFeature(highlight);
        //             }
        //         }
        //         if (feature) {
        //             const source = featureOverlay.getSource()
        //             if (source) {
        //                 source.addFeature(feature as any);
        //             }
        //         }
        //         highlight = feature;
        //     }
        // };

        // map.on('pointermove', function (evt) {
        //     if (evt.dragging) {
        //         return;
        //     }
        //     const pixel = map.getEventPixel(evt.originalEvent);
        //     displayFeatureInfo(pixel);
        // });

        // map.on('click', function (evt) {
        //     displayFeatureInfo(evt.pixel);
        // });

        return () => map.setTarget(undefined);
    }, []);

    return (
        <div className='w-full h-full' id="map" />
    );
}