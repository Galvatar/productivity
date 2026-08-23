import Icon from "./icon";

export default function Header() {
    return (
        <div className="flex items-center bg-stone-900 w-full h-15 border-b border-stone-500 px-5 gap-2">
            <Icon />
            <h1 className="text-stone-400 font-bold text-lg">
                Shello
            </h1>
        </div>
    )
}