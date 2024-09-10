import { useRef, useEffect } from "react";

export default function MapRecordingCanvas() {

    const canvas = useRef<HTMLCanvasElement | null>(null);
    const mapElement = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapElement.current = document.querySelector('#mapRef');
        
    }, []);

    function lol() {
        console.log('lol');
    }

    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-5/6 w-4/6 border border-zinc-600 rounded">
            <button onClick={lol} className="p-4 bg-black text-white pointer-events-auto">Nauhoita</button>
        </div>
    );
}