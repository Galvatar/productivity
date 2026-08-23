import { UUID } from "crypto";

export interface Card {
    id: string
    title: string
    list_id: string
}

export interface List {
    id: string
    title: string
    cards: Card[]
}

export interface DropTarget {
    listId: string
    index: number
}

export interface Board {
    id: string
    title: string
    lists: List[]
}