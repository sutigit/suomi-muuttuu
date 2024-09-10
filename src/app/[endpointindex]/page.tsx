
import { getStat } from '@/app/lib/data';
import stat from '@/app/lib/endpoints/finland/data.json';
import { StatData } from '@/app/lib/definitions';

import MapComponents from './components/MapComponents';

export default async function GeoStatPage({ params }: { params: { endpointindex: string } }) {

  const statData: StatData | null = await getStat(stat.endpoints[parseInt(params.endpointindex)].url, stat.endpoints[parseInt(params.endpointindex)].body);

  if (!statData) {
    return <div>loading...</div>;
  }

  return (
    <section className='w-screen h-screen'>
      <MapComponents
        statData={statData}
        endpoints={stat.endpoints}
        endpointindex={parseInt(params.endpointindex)}
      />
    </section>
  );

}
