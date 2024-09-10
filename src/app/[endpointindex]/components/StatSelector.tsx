
import clsx from 'clsx';

// nextjs imports
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
        <section className="p-8 bg-white w-full shadow-sm rounded-2xl border border-zinc-300">
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