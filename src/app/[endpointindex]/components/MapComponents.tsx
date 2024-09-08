
'use client';

import { useEffect, useRef, useState } from 'react';

// components
import MapEditor from './MapEditor';
import MapPlayer from './MapPlayer';
import MapView from './MapView';
import MapValues from './MapValues';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

// definitions
import { StatData } from '@/app/lib/definitions';

// utils
import {
  getMinValue,
  getMaxValue,
  getMinYear,
  getMaxYear
} from '@/app/lib/utils';

// themes
import { themes } from '@/app/lib/themes';

import { useSearchParams } from 'next/navigation';

export default function MapComponents(
  {
    statData,
  }: {
    statData: StatData,
  }) {

  const sourceRef = useRef<VectorSource | null>(null);
  const layerRef = useRef<VectorLayer | null>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | null>(null);

  // pre-process some stat data
  const statMinValue = getMinValue(statData.value);
  const statMaxValue = getMaxValue(statData.value);
  const statMinYear = getMinYear(statData.dimension[statData.role.time[0]].category.label);
  const statMaxYear = getMaxYear(statData.dimension[statData.role.time[0]].category.label);

  const searchParams = useSearchParams();

  const [startColor, setStartColor] = useState<string>(themes.finland.secondary);
  const [endColor, setEndColor] = useState<string>(themes.finland.primary);
  const [bgColor, setBgColor] = useState<string>(themes.finland.background);

  useEffect(() => {
    const paramBg = searchParams.get('bg');
    const paramS = searchParams.get('s');
    const paramE = searchParams.get('e');

    setBgColor(paramBg ? '#'+paramBg : themes.finland.background);
    setStartColor(paramS ? '#'+paramS : themes.finland.secondary);
    setEndColor(paramE ? '#'+paramE : themes.finland.primary);

  }, [searchParams]);

  return (
    <main className='absolute inset-0 flex justify-end'>

      {/* Map */}
      <section className='absolute inset-0' style={{ backgroundColor: bgColor }}>
        <MapView
          sourceRef={sourceRef}
          layerRef={layerRef}
          viewRef={viewRef}
          mapRef={mapRef}
          statData={statData}
          statMinValue={statMinValue}
          statMaxValue={statMaxValue}
          statMinYear={statMinYear}
          statMaxYear={statMaxYear}
          startColor={startColor}
          endColor={endColor}
        />
      </section>

      {/* Map UI */}
      <div className='flex flex-col gap-8 w-96 h-96 m-20 z-10 relative'>

        <div className='absolute -translate-x-full'>
          <MapValues
            startColor={startColor}
            endColor={endColor}
          />
        </div>

        <MapPlayer
          sourceRef={sourceRef}
          layerRef={layerRef}
          viewRef={viewRef}
          mapRef={mapRef}
          statData={statData}
          statMinValue={statMinValue}
          statMaxValue={statMaxValue}
          statMinYear={statMinYear}
          statMaxYear={statMaxYear}
          startColor={startColor}
          endColor={endColor}
        />
        <MapEditor
          startColor={startColor}
          endColor={endColor}
          bgColor={bgColor}
        />
      </div>

    </main>
  );
}
