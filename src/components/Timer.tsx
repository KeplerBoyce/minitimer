import { useEffect, useState, KeyboardEvent } from "react";
import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";

export default function Timer(props: {solves?: SolveType[], setSolves: (solves: SolveType[]) => void, className?: string}) {
    const {solves, setSolves, className} = props;
    const [millis, setMillis] = useState(0);
    const [timer, setTimer] = useState({isActive: false, start: 0});
    const [held, setHeld] = useState(false);
    const [stopping, setStopping] = useState(false);

    //starting timer
    const handleKeyUp = (e: KeyboardEvent) => {
        if (!timer.isActive && !stopping && e.code === "Space") {
            setHeld(false);
            setTimer({isActive: true, start: Date.now()});
        } else {
            setStopping(false);
        }
    }
    //stopping timer
    const handleKeyDown = (e: KeyboardEvent) => {
        if (timer.isActive) {
            setStopping(true);
            setTimer({isActive: false, start: timer.start});
            //annoying if in case solves is undefined
            if (solves) {
                setSolves([...solves, {
                    millis: millis,
                    timestamp: timer.start,
                    flags: 0,
                    scramble: "heeheeheehaw",
                }]);
            } else {
                setSolves([{
                    millis: millis,
                    timestamp: timer.start,
                    flags: 0,
                    scramble: "heeheeheehaw",
                }]);
            }
        } else if (e.code === "Space") {
            setHeld(true);
            setMillis(0);
        }
    }
    //increase timer in increments of 10ms while running
    useEffect(() => {
        if (timer.isActive) {
            setTimeout(() => {
                setMillis(Date.now() - timer.start);
            }, 10)
        }
    }, [timer, millis]);

    return (
        <div
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
            className={"outline-none container h-full flex flex-col gap-4 justify-center items-center " + className}
        >
            <p className={"text-9xl font-light font-mono pb-[10%] duration-150" + (held ? " text-green-500" : " text-white")}>
                {msToTime(millis)}
            </p>
        </div>
    )
}
