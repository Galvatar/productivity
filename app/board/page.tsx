"use client"

import { useState } from "react";
import AddList from "./components/addList";
import List from "./components/list";

export default function Board() {
    const [lists, setLists] = useState<string[]>([]);

    function handleNewList(title: string) {
        setLists([...lists, title])
    }

    return (
        <div className="flex w-full h-full p-8 gap-5">
            <img 
                className="fixed top-0 left-0 -z-10"
                src={'/image.png'} />
            {lists.map((title) => (
                <div key={title}>
                    <List title={title} />
                </div>
            ))}
            <AddList onAdd={(t) => handleNewList(t)} />
        </div>
    )
}