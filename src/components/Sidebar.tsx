import { useEffect, useState } from "react";
import { SessionType, SolveType } from "../util/types";
import SessionModal from "./SessionModal";
import Solve from "./Solve";

export default function Sidebar(props: {solves?: SolveType[], setSolves: (solves: SolveType[]) => void, className?: string}) {
    const {solves, setSolves, className} = props;
    const [sessions, setSessions] = useState([undefined as unknown as SessionType]);//list of all sessions
    const [chosenSession, setChosenSession] = useState({} as SessionType);
    const [isOpen, setIsOpen] = useState(false);//for session modal

    useEffect(() => {
        if (!sessions[0]) {
            const ls = localStorage.getItem("sessions");
            if (ls !== null && ls !== "undefined") {
                setSessions(JSON.parse(ls));
                setChosenSession(JSON.parse(ls)[0]);
            } else {
                setSessions([{name: "Session 1", solves: [undefined as unknown as SolveType], cube: "3x3"}]);
                setChosenSession({name: "Session 1", solves: [undefined as unknown as SolveType], cube: "3x3"});
            }
        }
    });

    //remove solve at index
    const removeSolve = (index: number) => {
        if (solves) {
            setSolves([
                ...solves.slice(0, index - 1),
                ...solves.slice(index).map(x => {//update index of all later solves
                    x.index--;
                    return x;
                })
            ]);
        }
    }
    //removes currently selected sesssion
    const removeSession = () => {
        setSessions(sessions.filter(s => s !== chosenSession));
        setChosenSession(sessions[0]);//set chosen session to first in list
    }

    return (
        <div className={"w-72 h-full p-4 " + className} >
            <div className="flex justify-center text-4xl mb-4">
                <span className="text-green-500">mini</span>
                <span className="text-white">timer</span>
            </div>
            <div className="flex justify-center gap-2 mb-2">
                <button onClick={() => {}} className="bg-light px-1 rounded-lg">
                    <p className="text-2xl -translate-y-1">⌄</p>
                </button>
                <button onClick={() => setIsOpen(true)} className="bg-light px-3 py-1 rounded-lg">
                    {chosenSession.name}
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                    {chosenSession.cube}
                </button>
            </div>
            <div className="flex flex-col-reverse w-full">
                {solves?.map(s =>
                    <Solve
                        key={s.index}
                        solve={{...s}}
                        removeSolve={removeSolve}
                        widths={["w-1/5", "w-4/5"]}
                        className="px-2 hover:bg-dark-2 hover:cursor-pointer text-light text-lg font-mono"
                    />
                )}
                <div className="flex px-2 text-lg text-light font-bold text-left border-b border-light">
                    <span className="w-1/5 italic">#</span>
                    <span className="w-4/5">Time</span>
                </div>
            </div>
            <SessionModal session={chosenSession} removeSession={removeSession} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
