import stat from '@/app/lib/endpoints/finland/data.json';

export default function StatSelector({ statData }: { statData: any }) {

    return (
        <section className="absolute p-10 bg-white w-96 h-96 m-20 z-10">
            {
                stat.endpoints.map((endpoint, index) => {
                    return (
                        <p key={index}>{endpoint.query_name}</p>
                    );
                })
            }
        </section>
    );
}