import { useContext, useRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { PenaltiesContext } from "../App";
import { SolveModifier } from "../util/types";


export default function PenaltyOptions(props: { modifier: SolveModifier, className?: string }) {
    const { modifier, className } = props;
    const {
        handleNoPenalty,
        handlePlusTwo,
        handleDNF,
        handleDelete,
    } = useContext(PenaltiesContext);

    const dummyFocusRef = useRef<HTMLButtonElement>(null);

    const focus = () => {
        dummyFocusRef.current?.focus();
    }

    return (
        <>
            <div className={"flex justify-center gap-1.5 text-black text-sm font-bold " + className}>
                <button
                    onClick={() => {
                        handleNoPenalty();
                        focus();
                    }}
                    className={"px-2 py-1 rounded-md "
                        + (modifier === "" ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300")}
                >
                    NONE
                </button>
                <button
                    onClick={() => {
                        handlePlusTwo();
                        focus();
                    }}
                    className={"px-2 py-1 rounded-md "
                        + (modifier === "+2" ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300")}
                >
                    +2
                </button>
                <button
                    onClick={() => {
                        handleDNF();
                        focus();
                    }}
                    className={"px-2 py-1 rounded-md "
                        + (modifier === "DNF" ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300")}
                >
                    DNF
                </button>
                <button
                    onClick={() => {
                        handleDelete();
                        focus();
                    }}
                    className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 font-bold text-light"
                >
                    <BsTrashFill />
                </button>
            </div>
            <button ref={dummyFocusRef} />
        </>
    )
}
