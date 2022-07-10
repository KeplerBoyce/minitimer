export default function Sidebar(props: {className: string}) {
    return (
        <div className={"w-72 h-full p-2 " + props.className} >
            <div className="flex justify-center text-3xl border-b-2">
                <span className="text-green-500">mini</span>
                <span className="text-white">timer</span>
            </div>
        </div>
    )
}