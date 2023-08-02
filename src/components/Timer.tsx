import { useEffect, useState, KeyboardEvent } from "react";
import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";


export default function Timer(props: {
    solves: SolveType[],
    setSolves: (solves: SolveType[]) => void,
    className?: string,
}) {
    const {solves, setSolves, className} = props;
    const [millis, setMillis] = useState(0);//duration of ongoing solve in milliseconds
    const [timer, setTimer] = useState({ isActive: false, start: 0 });//whether timer is running and start timestamp
    const [held, setHeld] = useState(false);//whether spacebar is held
    const [stopping, setStopping] = useState(false);//true if holding spacebar after stopping solve

    //starting timer
    const handleKeyUp = (e: KeyboardEvent) => {
        if (!timer.isActive && !stopping && e.code === "Space") {
            setHeld(false);
            setTimer({ isActive: true, start: Date.now() });
        } else {
            setStopping(false);
        }
    }
    //stopping timer
    const handleKeyDown = (e: KeyboardEvent) => {
        if (timer.isActive) {
            setStopping(true);
            setTimer({ isActive: false, start: timer.start });
            //annoying if in case solves is undefined
            if (solves) {
                setSolves([...solves, {
                    millis: millis,
                    index: solves.length + 1,
                    timestamp: timer.start,
                    flags: 0,
                    scramble: "heeheeheehaw",
                }]);
            } else {
                setSolves([{
                    millis: millis,
                    index: 1,
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
        } else if (solves.length > 0 && !held) {//timer display continues changing for a moment after stopping; this corrects it
            if (solves[solves.length - 1].millis !== millis) {
                setMillis(solves[solves.length - 1].millis);
            }
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
