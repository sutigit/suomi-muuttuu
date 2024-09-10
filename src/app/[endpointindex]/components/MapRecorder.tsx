import VideoIcon from "@/svg-icons/video";

export default function MapRecorder({ isRecording, setIsRecording }: { isRecording: boolean, setIsRecording: Function }) {
    return (
        <section className='p-8 bg-white w-full shadow-sm rounded-2xl border border-zinc-300'>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <VideoIcon width={16} height={16} />
                    <p>Video tallentaja</p>
                </div>
                <button
                    className="px-4 py-2 bg-black text-white rounded-md "
                    onClick={() => setIsRecording(!isRecording)}
                >Avaa</button>
            </div>
        </section>
    );
}