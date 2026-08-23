import { List } from "@/app/lib/types";
import { useState } from "react";

interface AddListProps {
    onAdd(list: List): void
}

export default function AddList({ onAdd }: AddListProps) {
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(false);

    return (
        <div onClick={() => setShow(true)} className={`flex h-fit items-center ${show ? 'bg-stone-950' : 'px-3 py-2.5 bg-white/25 hover:bg-white/20'} min-w-75 rounded-2xl cursor-pointer`}>
            {show ?
            <div className="flex w-full flex-col items-start px-2.5 py-2.5 gap-2.5">
                <div className="bg-gray-400/20 px-3.5 py-1 rounded-md w-full border border-gray-400">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter list name..."
                        className="outline-none font-semibold w-full resize-none"
                    />
                </div>
                <div className="flex w-full justify-between">
                    <button 
                        onClick={() => {
                            const newList: List = {
                                id: crypto.randomUUID(),
                                title: title,
                                cards: []
                            }
                            onAdd(newList)
                            setTitle("");
                            setShow(false);
                        }}
                        className="bg-blue-400 px-3 py-1.5 font-semibold text-blue-900 rounded-lg">
                        Add list
                    </button>
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow(false)
                        }}
                        className="flex items-center justify-center hover:bg-gray-400/20 aspect-square w-10 rounded-lg">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            :
            <div className="flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/>
                </svg>
                <h2 
                    className="font-bold text-lg">
                    Add another list
                </h2>
            </div>}
        </div>
    )
}