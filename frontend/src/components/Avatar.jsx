export default function Avatar({name = "", size = "w-10 h-10"}) {
    const initials = name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

    const colors = [
        "bg-blue-600",
        "bg-red-500",
        "bg-green-600",
        "bg-purple-600",
        "bg-pink-500",
        "bg-orange-500",
        "bg-cyan-600",
        "bg-indigo-600",
    ];

    let hash = 0;
    for(let i = 0; i<name.length; i++){
        hash += name.charCodeAt(i);
    }

    const color = colors[hash % colors.length];

    return (
        <div
        className={`${size} ${color} rounded-full flex items-center justify-center text-white font-bold select-none`}>
            {initials}
        </div>
    );
}