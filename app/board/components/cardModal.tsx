import { Card } from "@/app/lib/types";
import { useEffect, useState } from "react";

interface CardModalProps {
    card: Card,
    onClose(): void
    onRename(title: string, target: string): void
    onEditDescription(description: string, target: string): void
}

export default function CardModal({ card, onClose, onRename, onEditDescription }: CardModalProps) {
    return (
        <div className="flex fixed flex-col z-25 h-screen w-screen top-0 left-0 border items-center pt-13">
            <div 
                onClick={onClose} 
                className="fixed -z-5 inset-0 bg-black/50" 
            />
            <div className="flex w-full max-w-150 flex-col rounded-2xl bg-on-surface-container">
                {/** Top Bar */}
                <div className="flex w-full justify-end px-6 py-4 border-b border-icon/50">
                    <button 
                        onClick={onClose}
                        className="flex w-8 h-8 items-center justify-center text-on-surface-text rounded-full hover:bg-surface-container-low/90 hover:text-on-surface-text/60 transition-colors duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </button>
                </div>
                <textarea   
                    value={card.title} 
                    onChange={(e) => onRename(e.target.value, card.id)} 
                    className="outline-none resize-none m-6 field-sizing-content text-on-surface-text text-3xl font-bold" />
                <div className="px-6 pb-6">
                    <span className="flex gap-3 text-sm font-black text-on-surface-text items-center">
                        <DescriptionIcon />
                        Description
                    </span>
                    <textarea   
                        value={card.description} 
                        onChange={(e) => onEditDescription(e.target.value, card.id)} 
                        placeholder="Add a more detailed description..."
                        className="outline-none min-h-15 text-sm w-11/12 placeholder:font-bold resize-none field-sizing-content ml-7 mt-5 text-on-surface-text font-medium border border-on-surface-text/60 rounded p-2" />
                </div>
            </div>
        </div>
    )
}

function DescriptionIcon() {
    return (
        <div className="flex flex-col w-4 h-4 justify-between">
            <span className="bg-icon w-full h-0.5" />
            <span className="bg-icon w-full h-0.5" />
            <span className="bg-icon w-1/2 h-0.5" />
        </div>
    )
}