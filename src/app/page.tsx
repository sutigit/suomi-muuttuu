import Map from './components/MapComponent';

export default function App() {

  return (
    <main className='bg-zinc-300 w-screen h-screen'>

      {/* Background map */}
      <section className='absolute inset-0 w-screen h-screen'>
        <Map />
      </section>

      {/* MAP UI */}
      <div className='flex justify-between p-16'>

        {/* API selector */}
        <section className='z-10 p-10 bg-blue-200 w-96 h-96'>
          <button>Select</button>
        </section>

        {/* Editor */}
        <section className='flex flex-col gap-10 z-10 w-96 h-96'>
          {/* Player */}
          <div className='p-10 bg-blue-200 w-full'>
            <button className='bg-pink-600 p-5 text-white'>Play</button>
          </div>

          {/* Settings */}
          <div className='p-10 bg-blue-200 w-full h-96'>
            <p>Tarkkuus</p>
          </div>
        </section>

      </div>
    </main>
  );
}
