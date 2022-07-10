import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";

export default function Solve(props: {solve: SolveType, index: number, className?: string}) {
    const {solve, index, className} = props;

    return (
        <tr className={className}>
            <td>{index}</td>
            <td>{msToTime(solve.millis)}</td>
        </tr>
    )
}