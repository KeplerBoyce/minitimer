import { msToTime } from "../util/helpers";
import { StatsType } from "../util/types";


export default function StatsBlock(props: {currents: StatsType, bests: StatsType, className?: string}) {
    const { currents, bests, className } = props;

    return (
        <div className={"flex gap-4 p-4 text-light w-min whitespace-nowrap " + className}>
            <div className="flex flex-col gap-1 font-bold">
                <p className="text-white">Stats</p>
                {Object.keys(currents).map((k, i) =>
                    <p key={i}>{k}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 grow text-right">
                <p className="font-bold text-white">Current</p>
                {Object.values(currents).map((v, i) =>
                    <p key={i}>{v !== 0 ? msToTime(v) : "--"}</p>
                )}
            </div>
            <div className="flex flex-col gap-1 grow text-right">
                <p className="font-bold text-white">Best</p>
                {Object.values(bests).map((v, i) =>
                    <p key={i}>{v !== 0 ? msToTime(v) : "--"}</p>
                )}
            </div>
        </div>
    )
}
