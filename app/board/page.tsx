"use client"

import { useEffect, useState } from "react";
import AddList from "./components/addList";
import ListComponent from "./components/list";
import { Board, Card, DropTarget, List } from "../lib/types";

export default function BoardPage() {
    const [lists, setLists] = useState<List[]>([]);
    const [draggedCard, setDraggedCard] = useState<Card | null>(null);
    const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
    const [board, setBoard] = useState<Board | null>(null);

    useEffect(() => {
        fetchInitialValues();
    }, [])

    useEffect(() => {
        if (lists.length > 0) save();
    }, [lists])

    function fetchInitialValues() {
        if (sessionStorage.getItem('board') != null) {
            const board: Board = JSON.parse(sessionStorage.getItem('board')!)
            setBoard(board);
            setLists(board.lists)
        }
    }

    function save() {
        if (!board) return;
        board.lists = lists
        sessionStorage.setItem('board', JSON.stringify(board))
        const boards: Board[] = JSON.parse(localStorage.getItem('boards') || '[]');
        const removed = boards.filter((b) => b.id !== board.id);
        localStorage.setItem('boards', JSON.stringify([...removed, board]))
    }

    function handleNewList(list: List) {
        setLists([...lists, list])
    }

    function addNewCard(card: Card, targetListId: string) {
        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.id === targetListId) {
                    const updatedCard = { ...card, list: targetListId };
                    return {
                        ...list,
                        cards: [...list.cards, updatedCard]
                    };
                }

                return list;
            })
        );
    }

    function handleListDelete(targetListId: string) {
        setLists((prevLists) => prevLists.filter((l) => l.id !== targetListId))
    }

    function handleListRename(title: string, targetListId: string) {
        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.id === targetListId) {
                    return {
                        ...list,
                        title: title
                    };
                }

                return list;
            })
        );
    }

    function handleDrop() {
        if (!draggedCard || !dropTarget) return;

        setLists((prev) =>
            prev.map((list) => {
                let newCards = list.cards.filter((c) => c.id !== draggedCard.id);

                if (list.id === dropTarget.listId) {
                    const updatedCard = { ...draggedCard, list_id: dropTarget.listId };
                    newCards.splice(dropTarget.index, 0, updatedCard);
                }

                return { ...list, cards: newCards };
            })
        );

        setDraggedCard(null);
        setDropTarget(null);
    }

    function handleCardRename(title: string, target: string) {
        setLists((prevLists) =>
            prevLists.map((list) => ({
                ...list,
                cards: list.cards.map((card) =>
                    card.id === target ? { ...card, title: title } : card
                ),
            }))
        );
    }

    function handleCardDescription(description: string, target: string) {
        setLists((prevLists) =>
            prevLists.map((list) => ({
                ...list,
                cards: list.cards.map((card) =>
                    card.id === target ? { ...card, description: description } : card
                ),
            }))
        );
    }

    function handleCardDelete(target: string) {
        setLists((prevLists) => 
            prevLists.map((list) => ({
                ...list,
                cards: list.cards.filter((card) => card.id !== target)
            }))
        );
    }

    return (
        <div className="flex w-full h-full p-3 gap-5 overflow-scroll">
            <img 
                className="fixed top-0 left-0 -z-10 h-full w-full object-cover object-center"
                src={'/image.png'} />
            {lists.map((list) => (
                <div key={list.id}>
                    <ListComponent 
                        list={list}
                        draggedCard={draggedCard}
                        dropTarget={dropTarget}
                        onDragStartCard={setDraggedCard}
                        onUpdateDropTarget={setDropTarget}
                        onDropCard={() => handleDrop()}
                        onCreateCard={(c, t) => addNewCard(c, t)}
                        onRenameList={(t, l) => handleListRename(t, l)}
                        onDeleteList={(t) => handleListDelete(t)}
                        onRenameCard={(title, target) => handleCardRename(title, target)}
                        onDeleteCard={(t) => handleCardDelete(t)}
                        onEditDescription={(d, t) => handleCardDescription(d, t)}
                    />
                </div>
            ))}
            <AddList onAdd={(t) => handleNewList(t)} />
        </div>
    )
}