import { useState } from "react";
import { SolveType } from "../util/types";
import Solve from "./Solve";

export default function Sidebar(props: {solves?: SolveType[], className?: string}) {
    const {solves, className} = props;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={"w-72 h-full p-2 " + className} >
            <div className="flex justify-center text-4xl mb-2">
                <span className="text-green-500">mini</span>
                <span className="text-white">timer</span>
            </div>
            <table className="w-full">
                <tr className="text-lg text-light text-left border-b border-light">
                    <th className="italic">#</th>
                    <th>Time</th>
                </tr>
                {solves?.reverse().map((s, i) =>
                    <Solve
                        solve={{...s}}
                        index={solves.length - i}
                        onClick={() => {}}
                        className="hover:bg-dark-2 hover:cursor-pointer text-light text-lg font-mono"
                    />
                )}
            </table>
        </div>
    )
}
