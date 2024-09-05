'use client';

import stat from '@/app/lib/endpoints/finland/data.json';
import Link from 'next/link'
import clsx from 'clsx';
import { useParams } from 'next/navigation'

export default function StatSelector() {
    const params = useParams<{ endpointindex: string }>();

    return (
        <section className="absolute flex flex-col p-8 bg-white w-96 h-96 m-20 z-10 shadow rounded-2xl">
            {
                stat.endpoints.map((endpoint, index) => {
                    return (
                        <p key={index} className={clsx('flex p-4 rounded-md', {'font-medium bg-black text-white': parseInt(params.endpointindex) === index})}>
                            <Link href={`/${index}`}>
                                {endpoint.name}
                            </Link>
                        </p>
                    );
                })
            }
        </section>
    );
}