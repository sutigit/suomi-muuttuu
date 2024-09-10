
'use client';

// react imports
import { useEffect, useRef, useState } from 'react';

// nextjs imports
import { useSearchParams } from 'next/navigation';

// my components
import MapEditor from './MapEditor';
import MapPlayer from './MapPlayer';
import MapView from './MapView';
import MapValues from './MapValues';
import MapRecorder from './MapRecorder';
import MapSearch from './MapSearch';
import StatSelector from './StatSelector';
import MapRecordingCanvas from './MapRecordingCanvas';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

// definitions
import { StatData, Endpoint } from '@/app/lib/definitions';

// utils
import {
  getMinValue,
  getMaxValue,
  getMinYear,
  getMaxYear
} from '@/app/lib/utils';
import clsx from 'clsx';

// themes
import { themes } from '@/app/lib/themes';


export default function MapComponents({
  statData,
  endpoints,
  endpointindex
}: {
  statData: StatData,
  endpoints: Endpoint[],
  endpointindex: number
}) {

  // ol refs
  const sourceRef = useRef<VectorSource | null>(null);
  const layerRef = useRef<VectorLayer | null>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | null>(null);

  // pre-process stat data
  const statMinValue = getMinValue(statData.value);
  const statMaxValue = getMaxValue(statData.value);
  const statMinYear = getMinYear(statData.dimension[statData.role.time[0]].category.label);
  const statMaxYear = getMaxYear(statData.dimension[statData.role.time[0]].category.label);

  // read url search params
  const searchParams = useSearchParams();

  // set initial app colors
  const [startColor, setStartColor] = useState<string>(themes.finland.secondary);
  const [endColor, setEndColor] = useState<string>(themes.finland.primary);
  const [bgColor, setBgColor] = useState<string>(themes.finland.background);

  // update colors from url search params
  useEffect(() => {
    const paramBg = searchParams.get('bg');
    const paramS = searchParams.get('s');
    const paramE = searchParams.get('e');
    setBgColor(paramBg ? '#' + paramBg : themes.finland.background);
    setStartColor(paramS ? '#' + paramS : themes.finland.secondary);
    setEndColor(paramE ? '#' + paramE : themes.finland.primary);
  }, [searchParams]);


  // TESTING NEW RECORDING SYSTEM
  const [isRecording, setIsRecording] = useState<boolean>(false);

  return (
    <main className='relative w-full h-full flex justify-between'>

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

      {/* Map Recording Canvas */}
      <section className={clsx('absolute inset-0 pointer-events-none', {'hidden':!isRecording})}>
        <MapRecordingCanvas />
      </section>

      {/* Stat Data Selector */}
      <div className={clsx('flex flex-col gap-5 w-96 h-96 m-20 z-10', {'hidden':isRecording})}>
        <StatSelector endpointindex={endpointindex} endpoints={endpoints} />
      </div>

      {/* Map UI */}
      <div className={clsx('flex flex-col gap-5 w-96 h-96 m-20 z-10', {'hidden':isRecording})}>

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

        <MapRecorder 
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />

        <MapEditor
          startColor={startColor}
          endColor={endColor}
          bgColor={bgColor}
        />

        <MapSearch />

      </div>

    </main>
  );
}
