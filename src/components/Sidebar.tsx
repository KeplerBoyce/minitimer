import { useEffect, useState } from "react";
import { SessionType, SolveType } from "../util/types";
import Dropdown from "./Dropdown";
import SessionModal from "./SessionModal";
import Solve from "./Solve";
import SolveModal from "./SolveModal";
import { BsFillGearFill } from "react-icons/bs";


export default function Sidebar(props: {
    solves: SolveType[],
    setSolves: (solves: SolveType[]) => void,
    className?: string,
}) {
    const {solves, setSolves, className} = props;
    const [sessions, setSessions] = useState<Array<SessionType>>([]);//list of all sessions
    const [chosenSession, setChosenSession] = useState({} as SessionType);
    const [solve, setSolve] = useState({} as SolveType);
    const [sessionModalOpen, setSessionModalOpen] = useState(false);//for session info modal
    const [solveModalOpen, setSolveModalOpen] = useState(false);//for solve info modal

    //load sessions from localStorage; if there are none, create an empty one
    useEffect(() => {
        const ls = localStorage.getItem("sessions");
        if (ls !== null && ls !== "undefined") {
            setSessions(JSON.parse(ls));
            setChosenSession(JSON.parse(ls)[0]);
        } else {
            setSessions([
                {name: "Funny session", solves: [undefined as unknown as SolveType], cube: "3x3"},
                {name: "Test", solves: [undefined as unknown as SolveType], cube: "3x3"},
                {name: "OH", solves: [undefined as unknown as SolveType], cube: "3x3"},
            ]);
            setChosenSession({name: "Test", solves: [undefined as unknown as SolveType], cube: "3x3"});
        }
    }, []);

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

    //handle clicking on solve to open modal
    const handleSolveClick = (index: number) => {
        setSolve(solves[index]);
        setSolveModalOpen(true);
    }

    return (
        <div className={"w-96 h-full p-4 " + className} >
            <div className="flex justify-center text-4xl mb-4">
                <span className="text-green-500">mini</span>
                <span className="text-white">timer</span>
            </div>

            <div className="flex justify-between items-center gap-2 mb-4">
                <div className="flex grow items-center gap-3">
                    <Dropdown
                        chosen={chosenSession.name}
                        options={sessions.map(s => s.name)}
                        setOption={x => setChosenSession(sessions.find(s => s.name === x) ?? chosenSession)}
                        menuClass="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded-lg text-white font-semibold"
                        listClass="bg-slate-200 rounded-lg mt-1"
                        buttonClass="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg"
                        activeClass="bg-slate-300 px-3 py-1 rounded-lg"
                    />
                </div>
                <button onClick={() => setSessionModalOpen(true)}>
                    <BsFillGearFill size="20px" color="#cbd5e1" />
                </button>
                <p className="bg-blue-500 text-white px-1.5 py-0.5 text-sm rounded-full font-semibold">
                    {chosenSession?.cube}
                </p>
            </div>

            <div className="flex flex-col-reverse w-full">
                {solves && solves.length > 0 ? (
                    solves.map((s, i) =>
                        <Solve
                            key={i}
                            solve={{...s}}
                            widths={["w-1/5", "w-2/5"]}
                            onClick={() => handleSolveClick(i)}
                            className="px-2 hover:bg-dark-2 hover:cursor-pointer text-light text-lg font-mono"
                        />
                    )
                ) : (
                    <p className="px-2 text-lg text-light italic">
                        Session empty
                    </p>
                )}
                <div className="flex px-2 text-lg text-light font-bold text-left border-b border-light">
                    <span className="w-1/5 italic">#</span>
                    <span className="w-4/5">Time</span>
                </div>
            </div>

            <SessionModal session={chosenSession} removeSession={removeSession} isOpen={sessionModalOpen} setIsOpen={setSessionModalOpen} />
            <SolveModal solve={solve} removeSolve={() => removeSolve(solve.index)} isOpen={solveModalOpen} setIsOpen={setSolveModalOpen} />
        </div>
    )
}
