'use client';

import { HexColorPicker } from "react-colorful";

export default function ColorPicker({color, setColor}: {color: string, setColor: (color: string) => void}) {
    return <HexColorPicker color={color} onChange={setColor} />;
}