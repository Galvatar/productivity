import { Card } from "@/app/lib/types";

interface CardProps {
    card: Card
}

export default function CardComponent({ card }: CardProps) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const json = JSON.stringify(card);
        e.dataTransfer.setData("text/json", json);
    };

    return (
        <div className="relative isolate"
            draggable="true"
            onDragStart={handleDragStart}
        >
            <div className="z-0 bg-gray-400/20 rounded-lg px-4 py-2 border border-black" >
                <h1 className="font-medium">
                    {card.title}
                </h1>
            </div>
            <span className="flex absolute top-0 -z-5 w-full h-full rounded-lg bg-gray-950" />
        </div>
    )
}