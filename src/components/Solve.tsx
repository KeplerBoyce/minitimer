import { aoSmall, msToTime } from "../util/helpers";
import { SolveType } from "../util/types";


export default function Solve(props: {
    solve: SolveType,
    solves: SolveType[],
    lastFive: SolveType[],
    widths: string[],
    onClick: () => void,
    className?: string,
}) {
    const { solve, solves, lastFive, widths, onClick, className } = props;

    const isPbSingle = () => {
        const times = solves.map(s => Math.floor(s.millis / 10) * 10);
        if (Math.floor(solve.millis / 10) * 10 > Math.min(...times)) {
            return false;
        }
        for (let i = 0; i < times.length; i++) {
            if (times[i] === Math.min(...times)) {
                return i === solve.index - 1;
            }
        }
        return false;
    }

    const isTiedPbSingle = () => {
        const times = solves.map(s => Math.floor(s.millis / 10) * 10);
        if (Math.floor(solve.millis / 10) * 10 > Math.min(...times)) {
            return false;
        }
        let passedPb = false;
        for (let i = 0; i < times.length; i++) {
            if (times[i] === Math.min(...times)) {
                if (!passedPb) {
                    passedPb = true;
                } else if (i === solve.index - 1) {
                    return true;
                }
            }
        }
        return false;
    }

    const isPbAo5 = () => {
        const times = solves.map(s => s.millis);
        let res = false;
        times.forEach((ms, i) => {
            if (ms === Math.min(...times)) {
                res = i === solve.index;
            }
        });
        return res;
    }
    
    return (
        <div onClick={onClick} className={"flex text-lg text-light text-right " + className}>
            <p className={widths[0]}>{solve.index}</p>
            <div className={widths[1] + " flex gap-1 justify-end items-center"}>
                {isPbSingle() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    PB
                </p>}
                {!isPbSingle() && isTiedPbSingle() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    Tied PB
                </p>}
                {solve.modifier && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-red-500 text-white text-xs font-sans font-bold rounded-full">
                    {solve.modifier}
                </p>}
                <p className="text-right">{msToTime(solve.millis - (solve.modifier === "DNF" ? 1e12 : 0))}</p>
            </div>
            <p className={widths[2]}>{msToTime(aoSmall(5, lastFive))}</p>
        </div>
    )
}
