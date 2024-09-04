
'use client';

import { useRef } from 'react';

import MapEditor from './MapEditor';
import MapPlayer from './MapPlayer';
import MapView from './MapView';

// ol imports
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

export default function MapComponents({statData}: {statData: any}) {

  const sourceRef = useRef<VectorSource | null>(null);
  const layerRef = useRef<VectorLayer | null>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | null>(null);


  return (
    <main className='absolute inset-0 flex justify-end'>

      {/* Map */}
      <section className='absolute inset-0'>
        <MapView
          sourceRef={sourceRef}
          layerRef={layerRef}
          viewRef={viewRef}
          mapRef={mapRef}
        />
      </section>

      {/* Map UI */}
      <div className='flex flex-col gap-10 w-96 h-96 m-20 z-10'>
        <MapPlayer
          sourceRef={sourceRef}
          layerRef={layerRef}
          mapRef={mapRef}
        />
        <MapEditor />
      </div>

    </main>
  );
}
