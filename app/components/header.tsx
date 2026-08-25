import Icon from "./icon";

export default function Header() {
    return (
        <div className="flex items-center bg-header w-full h-15 border-b border-icon/30 px-5 gap-2">
            <Icon />
            <h1 className="text-icon font-bold text-lg">
                Shello
            </h1>
        </div>
    )
}