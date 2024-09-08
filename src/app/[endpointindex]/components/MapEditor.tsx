import { useState } from "react";

import ColorPicker from "@/app/components/ColorPicker";

export default function MapEditor() {
    const [startColor, setStartColor] = useState({ r: 255, g: 255, b: 255 });
    const [endColor, setEndColor] = useState({ r: 0, g: 31, b: 66 });


    return (
        <section className='flex flex-col gap-8 p-8 bg-white w-full h-96 shadow rounded-2xl'>
            <p>Värit</p>
            <ColorPicker color={startColor} setColor={setStartColor}></ColorPicker>
            <p>Taustaväri</p>
        </section>
    );
}