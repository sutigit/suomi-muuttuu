
import { getStat } from '@/app/lib/data';
import stat from '@/app/lib/endpoints/finland/data.json';

import StatSelector from './components/StatSelector';
import MapComponents from './components/MapComponents';

export default async function App() {


  const endpoints = stat.endpoints;


  const selection = 0;
  const statData = await getStat(endpoints[selection].url, endpoints[selection].body);

  return (
    <main className='relative w-screen h-screen bg-gray-200'>
      <StatSelector statData={statData} />
      <MapComponents statData={statData} />
    </main>
  );
}
