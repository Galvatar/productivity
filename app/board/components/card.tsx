import { Card } from "@/app/lib/types";
import { useEffect, useState } from "react";

interface CardProps {
    card: Card
    onRename(title: string, target: string): void
    onDelete(target: string): void
}

export default function CardComponent({ card, onRename, onDelete }: CardProps) {
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(card.title);
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const json = JSON.stringify(card);
        e.dataTransfer.setData("text/json", json);
    };

    return (
        <div className="relative isolate"
            onContextMenu={(e) => {
                e.preventDefault();
                setEdit(true)
            }}
            draggable="true"
            onDragStart={handleDragStart}
        >
            <div className="z-0 bg-on-surface-container rounded-lg px-4 py-2 border border-black" >
                <h1 className="font-medium">
                    {card.title}
                </h1>
            </div>
            {edit &&
                <div className="absolute flex gap-2.5 w-full top-0">
                    <span onClick={() => {setEdit(false); setInput(card.title)}} className="fixed z-10 bg-black/50 h-screen w-screen top-0 left-0" />
                    <div className="w-full gap-2.5 flex items-start">
                        <div className="flex flex-col gap-2.5 relative z-20 w-full">
                            <textarea 
                                autoFocus
                                onFocus={(e) => e.currentTarget.select()}
                                placeholder="Card title..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="resize-none w-full bg-surface-container-low outline-none rounded-lg py-2 px-4"
                            />
                            <button 
                                onClick={() => {
                                    setEdit(false);
                                    onRename(input, card.id)
                                }}
                                className="bg-secondary w-fit text-on-secondary px-3 py-1.5 text-sm rounded-lg font-semibold">
                                Save
                            </button>
                        </div>
                        <div className="absolute flex z-20 left-full ml-2.5">
                            <button 
                                onClick={() => {
                                    setEdit(false);
                                    onDelete(card.id);
                                }}
                                className="flex items-center gap-1 text-stone-200 bg-surface-container-low border border-stone-600 rounded-lg px-2 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}