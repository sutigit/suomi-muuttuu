import { useState } from "react";

import ColorPicker from "@/app/components/ColorPicker";

export default function MapEditor() {
    const [startColor, setStartColor] = useState("#ff0000");
    const [endColor, setEndColor] = useState("#0000ff");


    return (
        <section className='flex flex-col gap-8 p-8 bg-white w-full h-96 shadow rounded-2xl'>
            <p>Värit</p>
            <ColorPicker color={startColor} setColor={setStartColor}></ColorPicker>
            <p>Taustaväri</p>
        </section>
    );
}