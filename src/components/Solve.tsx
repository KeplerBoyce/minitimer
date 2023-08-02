import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";


export default function Solve(props: {
    solve: SolveType,
    widths: string[],
    onClick: () => void,
    className?: string,
}) {
    const { solve, widths, onClick, className } = props;

    return (
        <>
            <div onClick={onClick} className={"flex text-lg text-light text-left " + className}>
                <span className={widths[0]}>{solve.index}</span>
                <span className={widths[1]}>{msToTime(solve.millis)}</span>
            </div>
        </>
    )
}
