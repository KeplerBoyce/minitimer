import { useState } from "react";
import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";
import SolveModal from "./SolveModal";

export default function Solve(props: {solve: SolveType, removeSolve: (index: number) => void, widths: string[], className?: string}) {
    const {solve, removeSolve, widths, className} = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={"flex text-lg text-light text-left " + className}>
                <span className={widths[0]}>{solve.index}</span>
                <span className={widths[1]}>{msToTime(solve.millis)}</span>
            </div>
            <SolveModal solve={solve} removeSolve={() => removeSolve(solve.index)} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}