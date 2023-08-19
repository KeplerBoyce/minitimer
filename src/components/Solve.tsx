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
    
    const isOldPbSingle = () => {
        const times = solves.map(s => Math.floor(s.millis / 10) * 10);
        let pbSoFar = Number.MAX_VALUE;
        for (let i = 0; i < times.length; i++) {
            if (times[i] < pbSoFar) {
                if (i === solve.index - 1) {
                    return true;
                } else {
                    pbSoFar = times[i];
                }
            }
        }
        return false;
    }

    const isPbAo5 = () => {
        const ao5s = solves.map((_, i) => aoSmall(5, solves.slice(i - 4, i + 1))).map(a => Math.floor(a / 10) * 10);
        if (Math.floor(aoSmall(5, lastFive) / 10) * 10 > Math.min(...ao5s)) {
            return false;
        }
        let res = false;
        for (let i = 0; i < ao5s.length; i++) {
            if (ao5s[i] === Math.min(...ao5s)) {
                return i === solve.index - 1;
            }
        }
        return res;
    }

    const isTiedPbAo5 = () => {
        const ao5s = solves.map((_, i) => aoSmall(5, solves.slice(i - 4, i + 1))).map(a => Math.floor(a / 10) * 10);
        if (Math.floor(aoSmall(5, lastFive) / 10) * 10 > Math.min(...ao5s)) {
            return false;
        }
        let passedPb = false;
        for (let i = 0; i < ao5s.length; i++) {
            if (ao5s[i] === Math.min(...ao5s)) {
                if (!passedPb) {
                    passedPb = true;
                } else if (i === solve.index - 1) {
                    return true;
                }
            }
        }
        return false;
    }

    const isOldPbAo5 = () => {
        const ao5s = solves.map((_, i) => aoSmall(5, solves.slice(i - 4, i + 1))).map(a => Math.floor(a / 10) * 10);
        let pbSoFar = Number.MAX_VALUE;
        for (let i = 0; i < ao5s.length; i++) {
            if (ao5s[i] < pbSoFar) {
                if (i === solve.index - 1) {
                    return true;
                } else {
                    pbSoFar = ao5s[i];
                }
            }
        }
        return false;
    }
    
    return (
        <div onClick={onClick} className={"flex text-lg text-right " + className}>
            <p className={widths[0]}>{solve.index}</p>
            <div className={widths[1] + " flex gap-1 justify-end items-center"}>
                {isPbSingle() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    PB
                </p>}
                {!isPbSingle() && isTiedPbSingle() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    Tied PB
                </p>}
                {!isPbSingle() && isOldPbSingle() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-blue-500 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    Old PB
                </p>}
                {solve.modifier && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-red-500 text-white text-xs font-sans font-bold rounded-full">
                    {solve.modifier}
                </p>}
                <p className="text-right">{msToTime(solve.millis - (solve.modifier === "DNF" ? 1e12 : 0))}</p>
            </div>
            <div className={widths[2] + " flex gap-1 justify-end items-center"}>
                {isPbAo5() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    PB
                </p>}
                {!isPbAo5() && isTiedPbAo5() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-green-600 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    Tied PB
                </p>}
                {!isPbAo5() && isOldPbAo5() && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-blue-500 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    Old PB
                </p>}
                {aoSmall(5, lastFive) > 1e12 && aoSmall(5, lastFive) < 1e13 && <p className="flex justify-center items-center h-min px-1.5 py-0.5 bg-red-500 text-white text-xs font-sans font-bold rounded-full whitespace-nowrap">
                    DNF
                </p>}
                <p>{msToTime(aoSmall(5, lastFive) - (aoSmall(5, lastFive) > 1e12 ? 1e12 : 0))}</p>
            </div>
        </div>
    )
}
