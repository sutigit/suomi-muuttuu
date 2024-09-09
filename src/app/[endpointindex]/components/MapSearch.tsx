import Search from '@/svg-icons/search';

export default function MapEditor() {
    return (
        <section className='flex flex-col items-start gap-1 p-8 bg-white w-full h-96 shadow-sm border border-zinc-300 rounded-2xl'>
            <div className="flex gap-4 items-center">
                <Search width={16} height={16}/>
                <p>Etsi kartasta</p>
            </div>
        </section>
    );
}