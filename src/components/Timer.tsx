import { useEffect, useState, KeyboardEvent } from "react";

export default function Timer(props: {className?: string}) {
    const {className} = props;
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

    const msToTime = (ms: number): string => {
        const milliseconds = Math.floor((ms % 1000) / 10),
            seconds = Math.floor((ms / 1000) % 60),
            minutes = Math.floor((ms / (1000 * 60)) % 60);
        return (minutes ? (
            minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds)
        ) : (
            seconds
        )) + "." + ((milliseconds < 10) ? "0" + milliseconds : milliseconds);
    }

    return (
        <div
            onKeyDown={e => handleKeyDown(e)}
            onKeyUp={e => handleKeyUp(e)}
            tabIndex={0}
            className={"outline-none container h-full flex flex-col gap-4 justify-center items-center " + className}
        >
            <p className={"text-9xl font-light font-mono pb-[10%] duration-150" + (held ? " text-green-500" : " text-white")}>
                {msToTime(millis)}
            </p>
        </div>
    )
}
