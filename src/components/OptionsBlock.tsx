import { TimerType, TIMER_TYPES } from "../util/types";
import Dropdown from "./Dropdown";


export default function OptionsBlock(props: {
    timerType: TimerType,
    changeTimerType: (x: TimerType) => void,
    className?: string,
}) {
    const { timerType, changeTimerType, className } = props;

    return (
        <div className={"flex items-end flex-col gap-2 w-min whitespace-nowrap " + className}>
            <Dropdown
                options={TIMER_TYPES}
                chosenIndex={TIMER_TYPES.indexOf(timerType)}
                setOption={i => changeTimerType(TIMER_TYPES[i])}
                align="right-0"
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white font-semibold"
            />
        </div>
    )
}
