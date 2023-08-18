import { aoSmall, msToTime } from "../util/helpers";
import { SolveType } from "../util/types";


export default function Solve(props: {
    solve: SolveType,
    lastFive: SolveType[],
    widths: string[],
    onClick: () => void,
    className?: string,
}) {
    const { solve, lastFive, widths, onClick, className } = props;
    
    return (
        <div onClick={onClick} className={"flex text-lg text-light text-right " + className}>
            <p className={widths[0]}>{solve.index}</p>
            <div className={widths[1] + " flex gap-1 justify-end items-center"}>
                {solve.modifier && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-red-500 text-white text-xs font-sans font-bold rounded-full">
                    {solve.modifier}
                </p>}
                <p className="text-right">{msToTime(solve.millis)}</p>
            </div>
            <p className={widths[2]}>{msToTime(aoSmall(5, lastFive))}</p>
        </div>
    )
}
