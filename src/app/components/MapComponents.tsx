
'use client';

import { useRef } from 'react';

// components
import MapEditor from './MapEditor';
import MapPlayer from './MapPlayer';
import MapView from './MapView';

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

export default function MapComponents({ statData }: { statData: StatData }) {

  const sourceRef = useRef<VectorSource | null>(null);
  const layerRef = useRef<VectorLayer | null>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | null>(null);

  // pre-process some stat data
  const statMinValue = getMinValue(statData.value);
  const statMaxValue = getMaxValue(statData.value);
  const statMinYear = getMinYear(statData.dimension[statData.role.time[0]].category.label);
  const statMaxYear = getMaxYear(statData.dimension[statData.role.time[0]].category.label);

  return (
    <main className='absolute inset-0 flex justify-end'>

      {/* Map */}
      <section className='absolute inset-0'>
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
        />
      </section>

      {/* Map UI */}
      <div className='flex flex-col gap-10 w-96 h-96 m-20 z-10'>
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
        />
        <MapEditor />
      </div>

    </main>
  );
}
