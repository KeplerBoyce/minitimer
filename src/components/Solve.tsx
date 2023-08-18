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
        <div onClick={onClick} className={"flex text-lg text-light text-left " + className}>
            <p className={widths[0]}>{solve.index}</p>
            <p className={widths[1] + " text-right"}>{solve.modifier && `(${solve.modifier})`} {msToTime(solve.millis)}</p>
            <p className={widths[2] + " text-right"}>{msToTime(aoSmall(5, lastFive))}</p>
        </div>
    )
}
