
import { getStat } from '@/app/lib/data';
import stat from '@/app/lib/endpoints/finland/data.json';
import { StatData } from '@/app/lib/definitions';

import MapComponents from './components/MapComponents';
import StatSelector from './components/StatSelector';

export default async function GeoStatPage({ params }: { params: { endpointindex: string }}) {

  const statData: StatData | null = await getStat(stat.endpoints[parseInt(params.endpointindex)].url, stat.endpoints[parseInt(params.endpointindex)].body);

  if (!statData) {
    return <div>loading...</div>;
  }

  return (
    <section className='relative w-screen h-screen'>
      <StatSelector endpointindex={parseInt(params.endpointindex)} endpoints={stat.endpoints} />
      <MapComponents statData={statData} />
    </section>
  );

}
