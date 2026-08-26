import { Card } from "@/app/lib/types";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import CardModal from "./cardModal";

interface CardProps {
    card: Card;
    onRename(title: string, target: string): void;
    onEditDescription(description: string, target: string): void;
    onDelete(target: string): void;
}

export default function CardComponent({ card, onRename, onDelete, onEditDescription }: CardProps) {
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState(false);
    const [input, setInput] = useState(card.title);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const parent = e.currentTarget.parentElement;
        if (parent) parent.classList.remove("hover:border-secondary", "group");

        const json = JSON.stringify(card);
        e.dataTransfer.setData("text/json", json);

        setTimeout(() => {
            if (parent) parent.classList.add("hover:border-secondary", "group");
        }, 0);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (cardRef.current) {
            setRect(cardRef.current.getBoundingClientRect());
        }
        setEdit(true);
    };

    return (
        <>
            <div className="group relative border-2 border-transparent hover:border-secondary rounded-[10px]">
                <div 
                    ref={cardRef}
                    className="relative"
                    onContextMenu={handleContextMenu}
                    onClick={() => setDescription(true)}
                    draggable={!edit}
                    onDragStart={handleDragStart}
                >
                    <div className="bg-on-surface-container rounded-lg px-4 py-2 border border-black">
                        <h1 className="font-medium">
                            {card.title}
                        </h1>
                    </div>
                </div>
                <button 
                    onClick={(e) => handleContextMenu(e)}
                    className="group-hover:flex hidden absolute z-10 right-2 top-2 p-1 text-gray-400 hover:bg-surface-container-low border border-gray-400/30 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                    </svg>
                </button>
            </div>
            {description && 
                <CardModal 
                    card={card}
                    onRename={(title, target) => onRename(title, target)}
                    onClose={() => setDescription(false)} 
                    onEditDescription={(d,t) => onEditDescription(d, t)}
                />
            }

            {edit && rect && createPortal(
                <div className="fixed inset-0 z-50">
                    {/* Dim Backdrop */}
                    <div 
                        onClick={() => { setEdit(false); setInput(card.title); }} 
                        className="fixed inset-0 bg-black/50" 
                    />

                    {/* Overlay positioned at identical screen coordinates */}
                    <div 
                        style={{
                            top: `${rect.top}px`,
                            left: `${rect.left}px`,
                            width: `${rect.width}px`,
                        }}
                        className="fixed z-50 flex items-start"
                    >
                        <div 
                            onClick={() => { 
                                setEdit(false); 
                                setInput(card.title); 
                            }} 
                            className="flex flex-col gap-2.5 relative w-full">
                            <textarea 
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                                onFocus={(e) => e.currentTarget.select()}
                                placeholder="Card title..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="resize-none w-full field-sizing-content bg-surface-container-low outline-none rounded-lg py-2 px-4 border border-black shadow-xl"
                            />
                            <button 
                                onClick={() => {
                                    setEdit(false);
                                    onRename(input, card.id);
                                }}
                                className="bg-secondary w-fit text-on-secondary px-3 py-1.5 text-sm rounded-lg font-semibold shadow-md">
                                Save
                            </button>
                        </div>

                        {/* Extended Delete Button */}
                        <div className="absolute left-full ml-2.5 top-0 flex">
                            <button 
                                onClick={() => {
                                    setEdit(false);
                                    onDelete(card.id);
                                }}
                                className="flex items-center gap-1 text-stone-200 bg-surface-container-low border border-stone-600 rounded-lg px-2 py-1 shadow-md whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}