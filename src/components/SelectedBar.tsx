import { BsTrashFill } from "react-icons/bs";

export default function SelectedBar(props: {selected: number[], deselectAll: () => void, deleteAll: () => void, className?: String}) {
    const { selected, deselectAll, deleteAll, className } = props;

    return (
        <div className={"flex justify-center items-center gap-1.5 py-2 h-14 " + className} >
            {selected.length > 0 ? <>
                <p className="text-center italic text-white text-xl">
                    {selected.length + (selected.length === 1 ? " solve" : " solves")} selected
                </p>
                <p className="text-white px-2">
                    •
                </p>
                <button
                    onClick={deselectAll}
                    className="h-full px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300 font-bold text-base text-black"
                >
                    Deselect
                </button>
                <button
                    onClick={deleteAll}
                    className="h-full px-2 py-1 rounded-md bg-slate-200 hover:bg-red-600 font-bold text-base text-black hover:text-light"
                >
                    <BsTrashFill />
                </button>
            </> : <p className="text-center italic text-white text-xl">
                No solves selected
            </p>}
        </div>
    )
}
