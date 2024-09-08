'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { RgbColorPicker, RgbColor} from "react-colorful";

export default function ColorPicker({ color, setColor }: { color: RgbColor, setColor: (color: RgbColor) => void }) {
    return (
        <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent className="p-0 m-0 rounded-xl w-[202px] h-[200px]">
                < RgbColorPicker color={color} onChange={setColor} />
            </PopoverContent>
        </Popover>
    )
}