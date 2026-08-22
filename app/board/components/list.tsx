import { useState } from "react";
import Card from "./card";

interface ListProps {
    title: string
    onItemsDropped?: (itemData: string) => void;
}

export default function List({ title }: ListProps) {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const [cards, setCards] = useState<string[]>([])

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const data = e.dataTransfer.getData('text/plain');
        console.log('Dropped data:', data);

        if (data) {
            setCards([...cards, data]);
        }
    };

    return (
        <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col w-75 bg-stone-950 rounded-2xl">
            <div className="justify-between pt-4 pb-2 px-6">
                <h1 className="font-black text-lg text-gray-300">
                    {title}
                </h1>
            </div>
            <div 
                className="flex flex-col px-2.5 gap-2.5">
                {cards.map((card) => (
                    <div key={card}>
                        <Card title={card} />
                    </div>
                ))}
            </div>
            {show ? 
            <div className="flex flex-col items-start px-2.5 py-2.5 gap-2.5">
                <div className="bg-gray-400/20 px-4 py-2 rounded-lg w-full">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a title"
                        className="outline-none font-semibold w-full resize-none h-10"
                    />
                </div>
                <div className="flex w-full justify-between">
                    <button 
                        onClick={() => {
                            setCards([...cards, input])
                            setInput("");
                            setShow(false);
                        }}
                        className="bg-blue-400 px-3 py-1.5 font-semibold text-blue-900 rounded-lg">
                        Add card
                    </button>
                    <div 
                        onClick={() => setShow(false)} 
                        className="flex items-center justify-center hover:bg-gray-400/20 aspect-square rounded-lg">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            :
            <div className="flex items-center px-2.5 py-2.5 justify-between">
                <button 
                    onClick={() => setShow(true)}
                    className="flex items-center p-2 text-gray-400 hover:bg-gray-400/20 rounded-lg w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/>
                    </svg>
                    <h2 className="font-bold">
                        Add a card
                    </h2>
                </button>
            </div>
            }
        </div>
    )
}