import Map from './components/MapComponent';

export default function App() {

  return (
    <main className='bg-zinc-300 w-scree h-screen flex justify-center items-center'>
      <section style={{width: 600, height: '100vh'}}>
        <Map />
      </section>
    </main>
  );
}
