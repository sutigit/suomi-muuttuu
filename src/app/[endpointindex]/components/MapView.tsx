import React, { MutableRefObject, useEffect } from 'react';

// ol types
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

// ol imports
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import GeoJSON from 'ol/format/GeoJSON.js';

// utils
import { ColorUtils as clu } from '@/app/lib/utils/color';
import { StatUtils as stu } from '@/app/lib/utils/stat';

// geojson
import geojson from '@/geojson/suomen_kunta_jako.json';

// themes
import { themes } from '../../lib/themes';
import { StatData } from '../../lib/definitions';

export default function MapView({
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
        viewRef.current.fit(extent, { size: mapRef.current.getSize(), padding: [60, 60, 60, 60] });

        // Remove controls
        mapRef.current.getControls().clear();

        // Initial fill
        const features = sourceRef.current.getFeatures();

        const startColorRgb = clu.hexToRGB(startColor);
        const endColorRgb = clu.hexToRGB(endColor);

        features.forEach((feature) => {

            const natcode = feature.get('NATCODE');
            const statValue = stu.natcodeToMetric(natcode, statData, statMinYear);

            const color = clu.interpolateNumToRGB(
                statValue,
                statMinValue,
                statMaxValue,
                startColorRgb,
                endColorRgb,
            )

            feature.setStyle(new Style({
                fill: new Fill({ color: [color.r, color.g, color.b] }),
            }));
        });

        return () => mapRef.current?.setTarget();
    }, []);

    // Update mapRef on color change
    useEffect(() => {
        if (!sourceRef.current) return

        const features = sourceRef.current.getFeatures();

        const startColorRgb = clu.hexToRGB(startColor);
        const endColorRgb = clu.hexToRGB(endColor);

        features.forEach((feature) => {

            const natcode = feature.get('NATCODE');
            const statValue = stu.natcodeToMetric(natcode, statData, statMinYear);

            const color = clu.interpolateNumToRGB(
                statValue,
                statMinValue,
                statMaxValue,
                startColorRgb,
                endColorRgb,
            )

            feature.setStyle(new Style({
                fill: new Fill({ color: [color.r, color.g, color.b] }),
            }));
        });
    }, [startColor, endColor]);

    return (
        <div className='w-full h-full' id="mapRef" />
    );
}