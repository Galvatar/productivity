import { useState } from "react";
import CardComponent from "./card";
import { Card, DropTarget, List } from "@/app/lib/types";
import Dropdown from "./dropdown";

interface ListProps {
    list: List
    draggedCard: Card | null;
    dropTarget: DropTarget | null;
    onDragStartCard: (card: Card) => void;
    onUpdateDropTarget: (target: DropTarget | null) => void;
    onDropCard: () => void;
    onCreateCard: (card: Card, target: string) => void;
    onRenameList: (title: string, list: string) => void;
    onDeleteList: (target: string) => void;
    onRenameCard: (title: string, target: string) => void;
    onDeleteCard: (target: string) => void;
}

export default function ListComponent({
  list,
  draggedCard,
  dropTarget,
  onDragStartCard,
  onUpdateDropTarget,
  onDropCard,
  onCreateCard,
  onRenameList,
  onDeleteList,
  onRenameCard,
  onDeleteCard
}: ListProps) {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);

    const handleCreate = (event?: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event && event.key !== 'Enter') return;
        event?.preventDefault();
        const newCard: Card = {
            id: crypto.randomUUID(),
            title: input,
            list_id: list.id
        }
        onCreateCard(newCard, list.id);
        setInput("");
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const data = e.dataTransfer.getData('text/json');

        if (data) {
            const card = JSON.parse(data);
            onDropCard();
        }
    };

    const handleCardDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedCard) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const targetIndex = e.clientY < midY ? index : index + 1;

        if (dropTarget?.listId !== list.id || dropTarget?.index !== targetIndex) {
            onUpdateDropTarget({ listId: list.id, index: targetIndex });
        }
    };

    const handleListDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedCard) return;

        if (dropTarget?.listId !== list.id) {
            onUpdateDropTarget({ listId: list.id, index: list.cards.length });
        }
    };

    const handleListDelete = () => {
        onDeleteList(list.id);
    }

    return (
        <div 
            onDragOver={handleListDragOver}
            onDrop={handleDrop}
            className="flex flex-col w-75 max-h-full bg-surface-container rounded-2xl shadow">
            <div className="flex justify-between items-center text-on-surface-text text-md pt-2.5 pb-2 pl-5 pr-2.5 ">
                <input 
                    className="font-black outline-none"
                    value={list.title} onChange={(e) => onRenameList(e.target.value, list.id)} />
                <div className="flex gap-3 items-center">
                    <h2 className="font-medium">
                        {list.cards.length}
                    </h2>
                    <Dropdown onDelete={() => handleListDelete()} />
                </div>
            </div>
            <div 
                className="flex flex-col px-2.5 gap-2.5 overflow-scroll">
                {list.cards.map((card, index) => {
                    const isTargetList = dropTarget?.listId === list.id;
                    const showPlaceholderHere = isTargetList && dropTarget?.index === index;
                    const isDraggedCard = draggedCard?.id === card.id;

                    return (
                        <div className="flex flex-col gap-2.5" key={card.id}>
                            {showPlaceholderHere && <Placeholder />}
                            <div
                                onDragStart={() => onDragStartCard(card)}
                                onDragOver={(e) => handleCardDragOver(e, index)}
                                onDragEnd={() => onDropCard()}
                                className={isDraggedCard ? 'opacity-30' : ''}
                            >
                                <CardComponent 
                                    card={card} 
                                    onRename={(title, target) => onRenameCard(title, target)}
                                    onDelete={(t) => onDeleteCard(t)}
                                />
                            </div>
                        </div>
                    )
                })}
                {dropTarget?.listId === list.id && dropTarget.index >= list.cards.length && (
                    <Placeholder />
                )}
            </div>
            {show ? 
            <div className="flex flex-col items-start px-2.5 py-2.5 gap-2.5">
                <div className="bg-on-surface-container px-4 py-2 rounded-lg w-full">
                    <textarea
                        onKeyDown={(e) => handleCreate(e)}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a title"
                        className="outline-none font-semibold w-full resize-none h-10"
                    />
                </div>
                <div className="flex w-full gap-1">
                    <button 
                        onClick={() => handleCreate()}
                        className="bg-blue-400 px-3 py-1.5 font-semibold text-blue-900 rounded-lg">
                        Add card
                    </button>
                    <div 
                        onClick={() => setShow(false)} 
                        className="flex w-8 items-center justify-center hover:bg-on-surface-container aspect-square rounded-lg">
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

function Placeholder() {
  return (
    <div className="h-10 w-full rounded-lg bg-gray-500/10 transition-all" />
  );
}