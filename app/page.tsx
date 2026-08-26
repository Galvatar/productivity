"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Board } from "./lib/types";
import BoardCard from "./components/boardCard";
import CreateBoard from "./components/createBoard";

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);
  useEffect(() => {
      fetchInitialValues();
  }, [])
  
  function fetchInitialValues() {
    if (localStorage.getItem('boards') != null) {
      const boards: Board[] = JSON.parse(localStorage.getItem('boards')!)
      setBoards(boards)
    }
  }

  function createBoard(newBoard: Board) {
    setBoards([...boards, newBoard])
  }

  return (
    <div className="flex flex-col flex-1 bg-header font-sans p-10 gap-5">
      <CreateBoard onCreate={(b) => createBoard(b)} />
      <div className="flex w-full flex-wrap gap-5">
        {boards && boards.map((board) => (
          <div key={board.id}>
            <BoardCard board={board} />
          </div>
        ))}
      </div>
    </div>
  );
}
