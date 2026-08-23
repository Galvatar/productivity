"use client"

import { useState } from "react";
import AddList from "./components/addList";
import ListComponent from "./components/list";
import { Card, List } from "../lib/types";

export default function Board() {
    const [lists, setLists] = useState<List[]>([]);

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

    function handleDrop(card: Card, targetListId: string) {
        const sourceListId = card.list_id;

        if (sourceListId === targetListId) return;

        setLists((prevLists) =>
            prevLists.map((list) => {
                card.list_id = targetListId;
                if (list.id === sourceListId) {
                    return {
                        ...list,
                        cards: list.cards.filter((c) => c.id !== card.id)
                    };
                }

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

    return (
        <div className="flex w-full h-screen p-8 gap-5 overflow-scroll">
            <img 
                className="fixed top-0 left-0 -z-10"
                src={'/image.png'} />
            {lists.map((list) => (
                <div key={list.id}>
                    <ListComponent list={list} 
                        onItemsDropped={(c, target) => handleDrop(c, target)}
                        addCard={(c, t) => addNewCard(c, t)}
                    />
                </div>
            ))}
            <AddList onAdd={(t) => handleNewList(t)} />
        </div>
    )
}