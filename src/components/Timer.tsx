import { useEffect, useState, KeyboardEvent, useContext } from "react";
import { msToTime } from "../util/helpers";
import { CubesContext, PenaltiesContext } from "../App";
import useEventListener from "@use-it/event-listener";
import PenaltyOptions from "./PenaltyOptions";


export default function Timer(props: {scramble: string, callback: () => void, canStart: boolean, className?: string}) {
    const { scramble, callback, canStart, className } = props;
    const {
        solves,
        setSolves,
    } = useContext(CubesContext);

    const [millis, setMillis] = useState(0);//duration of ongoing solve in milliseconds
    const [timer, setTimer] = useState({ isActive: false, start: 0 });//whether timer is running and start timestamp
    const [held, setHeld] = useState(false);//whether spacebar is held
    const [stopping, setStopping] = useState(false);//true if holding spacebar after stopping solve

    //starting timer
    const handleKeyUp = (e: KeyboardEvent) => {
        if (!canStart) return;
        if (!timer.isActive && !stopping && e.code === "Space") {
            setHeld(false);
            setTimer({ isActive: true, start: Date.now() });
        } else {
            setStopping(false);
        }
    }
    //stopping timer
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!canStart) return;
        if (timer.isActive) {
            setStopping(true);
            setTimer({ isActive: false, start: timer.start });
            setSolves([...solves, {
                millis: millis,
                index: solves.length + 1,
                timestamp: timer.start,
                modifier: "",
                scramble: scramble,
            }]);
            callback();
        } else if (e.code === "Space") {
            setHeld(true);
            setMillis(0);
        }
    }

    useEventListener('keyup', e => handleKeyUp(e as any));
    useEventListener('keydown', e => handleKeyDown(e as any));

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
        <div className={"outline-none container px-6 h-full flex flex-col gap-6 justify-center items-center " + className}>
            <p className={"font-light font-mono duration-150" + (held ? " text-green-500" : " text-white")}>
                {msToTime(millis)}
            </p>
            <PenaltyOptions
                modifier={solves.length > 0 ? solves[solves.length - 1].modifier : ""}
                className="mb-[10%]"
            />
        </div>
    )
}
