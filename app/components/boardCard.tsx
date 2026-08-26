import { useRouter } from "next/navigation"
import { Board } from "../lib/types"

interface BoardCardProps {
    board: Board
}

export default function BoardCard({ board }: BoardCardProps) {
    const router = useRouter();
    function handleClick() {
        sessionStorage.setItem('board', JSON.stringify(board));
        router.push('/board')
    }

    return (
        <div 
            onClick={() => handleClick()}
            className="group flex max-h-30 bg-header flex-col shadow-[0_0_6px_2px_rgba(0,0,0,0.4)] rounded-xl w-60 overflow-hidden">
            <img 
                className="flex-1 min-h-0 w-full object-cover object-center rounded-t-xl group-hover:brightness-50"
                src={'/image.png'} />
            <h1 className="px-2 py-2 font-semibold text-on-surface-text">{board.title}</h1>
        </div>
    )
}