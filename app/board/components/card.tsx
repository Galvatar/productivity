interface CardProps {
    title: string
}

export default function Card({ title }: CardProps) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("started dragging", e);
        e.dataTransfer.setData("text/plain", title);
    };

    return (
        <div className="bg-gray-400/20 rounded-lg px-4 py-2" 
            draggable="true"
            onDragStart={handleDragStart}>
            <h1 className="font-semibold">
                {title}
            </h1>
        </div>
    )
}