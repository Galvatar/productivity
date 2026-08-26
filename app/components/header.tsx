"use client"

import { useRouter } from "next/navigation";
import Icon from "./icon";
import CreateBoard from "./createBoard";

export default function Header() {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center bg-header w-full border-b border-icon/30 px-5 py-2">
            <div 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 py-1 px-3 hover:bg-surface-container-low rounded-lg cursor-pointer">
                <Icon />
                <h1 className="text-icon font-bold text-lg">
                    Shello
                </h1>
            </div>
        </div>
    )
}