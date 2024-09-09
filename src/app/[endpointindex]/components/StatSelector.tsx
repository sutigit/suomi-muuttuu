
'use client';

import clsx from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';

// definitions
import { Endpoint} from '@/app/lib/definitions';

export default function StatSelector({ endpointindex, endpoints }: { endpointindex: number, endpoints: Endpoint[] }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    
    function redirect(index: number) {
        const url = new URL('/' + index.toString(), window.location.origin);

        if (searchParams.get('bg') !== null) url.searchParams.set('bg', searchParams.get('bg') as string);
        if (searchParams.get('s') !== null) url.searchParams.set('s', searchParams.get('s') as string);
        if (searchParams.get('e') !== null) url.searchParams.set('e', searchParams.get('e') as string);

        router.push(url.toString());
    }

    return (
        <section className="absolute flex flex-col p-8 bg-white w-96 h-96 m-20 z-10 shadow-sm border border-zinc-300 rounded-2xl">
            {
                endpoints.map((endpoint, index) => {

                    return (
                        <p key={index} className={clsx('flex p-4 rounded-md', {'font-medium bg-black text-white': endpointindex === index})}>
                            <button onClick={() => redirect(index)}>
                                {endpoint.name}
                            </button>
                        </p>
                    );
                })
            }
        </section>
    );
}