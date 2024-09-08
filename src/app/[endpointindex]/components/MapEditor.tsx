// Components
import ColorPicker from "@/app/components/ColorPicker";

// Icons
import ArrowRightIcon from '@/svg-icons/arrow-right';

export default function MapEditor({
    startColor,
    endColor,
    bgColor,
}: {
    startColor: string,
    endColor: string,
    bgColor: string,
}) {
    
    function handleURLReplace(role: string, color: string) {
        const url = new URL(window.location.href);
        url.searchParams.set(role, color.replace('#', ''));
        window.history.replaceState(null, '', url.toString());
    }

    return (
        <section className='flex flex-col items-start gap-1 p-8 bg-white w-full h-96 shadow border border-zinc-200 rounded-2xl'>
            <p>Värit</p>
            <div className="flex gap-4 items-center">
                <ColorPicker currentColor={startColor} role='s' globalSetColor={handleURLReplace}></ColorPicker>
                <ArrowRightIcon width={18} height={18} />
                <ColorPicker currentColor={endColor} role='e' globalSetColor={handleURLReplace}></ColorPicker>
            </div>
            <p className="mt-2">Taustaväri</p>
            <ColorPicker currentColor={bgColor} role='bg' globalSetColor={handleURLReplace}></ColorPicker>
        </section>
    );
}