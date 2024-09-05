import stat from '@/app/lib/endpoints/finland/data.json';
import Link from 'next/link'


export default function StatSelector() {

    return (
        <section className="absolute p-10 bg-white w-96 h-96 m-20 z-10">
            {
                stat.endpoints.map((endpoint, index) => {
                    return (
                        <Link key={index} href={`/${index}`}>
                            {endpoint.name}
                        </Link>
                    );
                })
            }
        </section>
    );
}