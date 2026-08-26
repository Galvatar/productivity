import { useState } from "react";
import { Board } from "../lib/types";

interface CreateBoardProps {
    onCreate(board: Board): void
}

export default function CreateBoard({ onCreate }: CreateBoardProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    function handleCreate() {
        setOpen(false);
        const newBoard: Board = {
            id: crypto.randomUUID(),
            title: title,
            lists: []
        }
        setTitle("")
        onCreate(newBoard)
        const boards: Board[] = JSON.parse(localStorage.getItem('boards') || '[]');
        localStorage.setItem('boards', JSON.stringify([...boards, newBoard]));
    }
    
    return (
        <div className="relative flex flex-col items-end">
            <button 
                onClick={() => setOpen(true)}
                className="px-3 py-1 font-semibold rounded hover:bg-blue-300 bg-secondary text-on-secondary transition-colors duration-75">
                Create
            </button>
            {open && 
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute shadow-[0_0_6px_2px_rgba(0,0,0,0.4)] w-75 flex flex-col top-full mt-3 bg-surface-container-low rounded-lg text-on-surface-text">
                    <span onClick={() => setOpen(!open)} className="fixed z-20 h-screen w-screen top-0 left-0" />
                    <div className="flex flex-col z-25">
                        <div className="flex justify-between p-3">
                            <span />
                            <h1 className="font-bold text-md text-nowrap">
                                Create Board
                            </h1>
                            <button 
                                onClick={() => setOpen(false)}
                                className="p-1.5 hover:bg-gray-400/20 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col px-3">
                            <h2 className="text-sm font-semibold">
                                Board Title
                                <span className="text-red-500">*</span>
                            </h2>
                            <input 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full outline-none p-1 ring-inset ${title.length == 0 ? 'ring ring-red-400' : 'ring-2 ring-secondary'} rounded transition-colors`}
                            />
                            {title.length == 0 && 
                            <h2>
                                👋 Board title is required
                            </h2>}
                        </div>
                        <button 
                            onClick={handleCreate}
                            className={`m-3 hover:bg-blue-300 rounded-lg ${title.length == 0 ? 'border border-on-surface-text/50 text-on-surface-text/50 bg-on-surface-text/20' : 'bg-secondary text-on-secondary'} font-semibold py-1 transition-colors`}>
                            Create
                        </button>
                    </div>
                </div>}
        </div>
    )
}