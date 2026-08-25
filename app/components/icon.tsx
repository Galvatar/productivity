export default function Icon() {
    return (
        <div className="flex flex-col aspect-square w-8 h-8 bg-icon rounded-lg p-1.5 gap-0.5">
            <span className="w-full h-2 bg-header rounded-t" />
            <div className="flex justify-between h-full w-full">
                <span className="h-full w-1.5 bg-header rounded-b-xs" />
                <span className="h-full w-1.5 bg-header rounded-b-xs" />
            </div>
        </div>
    )
}