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
        if (lastFive.length == 0) return "--";
        let arr = lastFive.map(s => s.millis);
        arr = arr.filter(x => x !== Math.min(...arr) && x !== Math.max(...arr));
        return msToTime(arr.reduce((a, b) => a + b) / 3);
    }

    return (
        <div onClick={onClick} className={"flex text-lg text-light text-left " + className}>
            <span className={widths[0]}>{solve.index}</span>
            <span className={widths[1]}>{msToTime(solve.millis)}</span>
            <span className={widths[2]}>{ao5()}</span>
        </div>
    )
}
