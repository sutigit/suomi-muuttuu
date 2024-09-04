'use client';

import { useRef } from 'react';

import MapEditor from './components/MapEditor';
import MapPlayer from './components/MapPlayer';
import MapView from './components/MapView';
import StatSelector from './components/StatSelector';

// ol imports
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

export default function App() {

  const sourceRef = useRef<VectorSource | null>(null);
  const layerRef = useRef<VectorLayer | null>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | null>(null);


  return (
    <main className='bg-zinc-300 w-screen h-screen'>

      {/* Background Map */}
      <section className='absolute inset-0 w-screen h-screen'>
        <MapView
          sourceRef={sourceRef}
          layerRef={layerRef}
          viewRef={viewRef}
          mapRef={mapRef}
        />
      </section>

      {/* App UI */}
      <div className='flex justify-between p-16'>

        <section className='z-10'>
          <StatSelector />
        </section>

        <div className='flex flex-col gap-10 w-96 h-96 z-10'>
          <MapPlayer
            sourceRef={sourceRef}
            layerRef={layerRef}
            mapRef={mapRef}
          />
          <MapEditor />
        </div>

      </div>
    </main>
  );
}
