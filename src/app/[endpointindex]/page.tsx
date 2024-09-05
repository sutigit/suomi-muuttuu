
import { getStat } from '@/app/lib/data';
import stat from '@/app/lib/endpoints/finland/data.json';
import { StatData } from '@/app/lib/definitions';

import MapComponents from '@/app/components/MapComponents';

export default async function GeoStatPage({ params }: { params: { endpointindex: number } }) {

  const statData: StatData | null = await getStat(stat.endpoints[params.endpointindex].url, stat.endpoints[params.endpointindex].body);

  return statData ? <MapComponents statData={statData} /> : <div>loading...</div>;
  
}
