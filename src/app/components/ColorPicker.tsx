'use client';

import './colorPicker.css';

import { useEffect, useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { HexColorPicker, HexColorInput } from "react-colorful";

export default function ColorPicker({
    currentColor,
    role,
    globalSetColor
}: {
    currentColor: string,
    role: string,
    globalSetColor: (role: string, color: string) => void
}) {

    const [triggerColor, setTriggerColor] = useState<string>(currentColor);
    const [localColor, setLocalColor] = useState<string>(currentColor);

    useEffect(() => {
        setTriggerColor(localColor);
    }, [localColor]);

    useEffect(() => {
        setLocalColor(currentColor);
        setTriggerColor(currentColor);
    }, [currentColor]);

    return (
        <Popover>
            <PopoverTrigger>
                <div className="inline-block border border-zinc-200 p-1 rounded-md">
                    <div className="w-16 h-8 rounded" style={{ backgroundColor: triggerColor }} />
                </div>
            </PopoverTrigger>

            <PopoverContent className="p-0 m-0 rounded-2xl w-[200px] ">
                <div className="custom-color-picker">
                    <HexColorPicker
                        color={localColor}
                        onChange={setLocalColor}
                        onTouchEnd={() => globalSetColor(role, localColor)}
                        onMouseUp={() => globalSetColor(role, localColor)}
                    />
                    <div className="custom-hexcolor-input max-w-full p-4">
                        <HexColorInput className="rounded-md border border-zinc-200 w-full py-2 px-4" color={localColor} onChange={setLocalColor} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}