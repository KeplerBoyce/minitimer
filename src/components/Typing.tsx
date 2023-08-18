import { useContext, useState } from "react";
import { CubesContext, PenaltiesContext } from "../App";
import { timeToMs } from "../util/helpers";
import PenaltyOptions from "./PenaltyOptions";


export default function Typing(props: { scramble: string, callback: () => void, className?: string }) {
    const { scramble, callback, className } = props;
    const {
        solves,
        setSolves,
    } = useContext(CubesContext);

    const [time, setTime] = useState("0.00");

    const handleChange = (str: string) => {
        const strippedStr = str.replaceAll(/:|\./g, '').replace(/^0+/g, '');
        for (let c of strippedStr) {
            if (!"0123456789".split('').includes(c)) {
                return;
            }
        }
        let newStr;
        switch (strippedStr.length) {
            case 0:
                newStr = "0.00";
                break;
            case 1:
                newStr = "0.0" + strippedStr;
                break;
            case 2:
                newStr = "0." + strippedStr;
                break;
            case 3:
                newStr = strippedStr[0] + "." + strippedStr.slice(1);
                break;
            case 4:
                newStr = strippedStr.slice(0, 2) + "." + strippedStr.slice(2);
                break;
            default:
                newStr = strippedStr.slice(0, strippedStr.length - 4) + ":"
                    + strippedStr.slice(strippedStr.length - 4, strippedStr.length - 2) + "."
                    + strippedStr.slice(strippedStr.length - 2);
                break;
        }
        setTime(newStr);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (time !== "0.00") {
                setSolves([...solves, {
                    millis: timeToMs(time),
                    index: solves.length + 1,
                    timestamp: Date.now(),
                    modifier: "",
                    scramble: scramble,
                }]);
            }
            setTime("0.00");
            callback();
        }
    }

    return (
        <div className={"outline-none container px-6 h-full flex flex-col gap-6 justify-center items-center " + className}>
            <input
                type="text"
                name="time"
                value={time}
                onFocus={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                onClick={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                onKeyUp={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                onKeyDown={e => handleKeyDown(e as any)}
                onChange={e => handleChange(e.target.value)}
                className={"bg-dark-3 font-light font-mono rounded-xl w-full max-w-sm h-min px-2 pb-0.5 text-center "
                    + (time === "0.00" ? "text-gray-500" : "text-white")}
            />
            <PenaltyOptions
                modifier={solves.length > 0 ? solves[solves.length - 1].modifier : ""}
                className="mb-[10%]"
            />
        </div>
    )
}
