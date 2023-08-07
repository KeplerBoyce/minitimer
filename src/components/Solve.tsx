import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";


export default function Solve(props: {
    solve: SolveType,
    lastFive: SolveType[],
    widths: string[],
    onClick: () => void,
    className?: string,
}) {
    const { solve, lastFive, widths, onClick, className } = props;

    const ao5 = () => {
        if (lastFive.length < 5) return "--";
        const arr = lastFive.map(s => s.millis);
        arr.splice(arr.indexOf(Math.min(...arr)), 1);
        arr.splice(arr.indexOf(Math.max(...arr)), 1);
        return msToTime(arr.reduce((a, b) => a + b) / 3);
    }

    return (
        <div onClick={onClick} className={"flex text-lg text-light text-left " + className}>
            <p className={widths[0]}>{solve.index}</p>
            <p className={widths[1]}>{msToTime(solve.millis)}</p>
            <p className={widths[2]}>{ao5()}</p>
        </div>
    )
}
