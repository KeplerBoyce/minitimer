import { useContext, useState } from "react";
import { SolveType } from "../util/types";
import Dropdown from "./Dropdown";
import SessionModal from "./SessionModal";
import Solve from "./Solve";
import SolveModal from "./SolveModal";
import { BsPlus, BsFillGearFill } from "react-icons/bs";
import NewSessionModal from "./NewSessionModal";
import { CubesContext } from "../App";


export default function Sidebar(props: {className?: string}) {
    const { className } = props;
    const {
        cubes,
        chosenCube,
        sessionIndex,
        sessions,
        solves,
        setChosenCube,
        setSessionIndex,
        setSessions,
        setSolves,
    } = useContext(CubesContext);

    const [solve, setSolve] = useState({} as SolveType);

    const [sessionModalOpen, setSessionModalOpen] = useState(false);//for session info modal
    const [newSessionModalOpen, setNewSessionModalOpen] = useState(false);//for new session modal
    const [solveModalOpen, setSolveModalOpen] = useState(false);//for solve info modal

    //remove solve at index
    const removeSolve = (index: number) => {
        setSolves([
            ...solves.slice(0, index - 1),
            ...solves.slice(index).map(x => {//update index of all later solves
                x.index--;
                return x;
            })
        ]);
    }
    //removes currently selected sesssion
    const removeSession = () => {
        setSessions(sessions.filter(s => s.index !== sessionIndex));
        setSessionIndex(Math.max(0, sessionIndex - 1));//set chosen session to first in list
    }

    const addSession = (name: string) => {
        setSessions([...sessions, {
            name,
            index: sessions.length,
            solves: [],
            cube: chosenCube,
        }]);
    }

    //handle clicking on solve to open modal
    const handleSolveClick = (index: number) => {
        setSolve(cubes[chosenCube][sessionIndex].solves[index]);
        setSolveModalOpen(true);
    }

    return (
        <div className={"h-full p-4 " + className} >
            <div className="flex justify-center text-4xl mb-4">
                <span className="text-green-500">mini</span>
                <span className="text-white">timer</span>
            </div>

            <div className="flex justify-between items-center gap-2 mb-4 max-w-full">
                <Dropdown
                    chosen={chosenCube}
                    options={Object.keys(cubes)}
                    setOption={x => setChosenCube(Object.keys(cubes)[x])}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white font-semibold"
                />
                <div className="min-w-0">
                    <Dropdown
                        chosen={cubes[chosenCube][sessionIndex].name}
                        options={cubes[chosenCube].map(s => s.name)}
                        setOption={x => setSessionIndex(x)}
                        className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded-lg text-white font-semibold overflow-x-hidden text-ellipsis max-w-full"
                    />
                </div>
                <button onClick={() => setNewSessionModalOpen(true)}>
                    <BsPlus size="30px" color="#cbd5e1" />
                </button>
                <div className="grow" />
                <button onClick={() => setSessionModalOpen(true)}>
                    <BsFillGearFill size="20px" color="#cbd5e1" />
                </button>
            </div>

            <div className="flex flex-col-reverse w-full">
                {solves.length > 0 ? (
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

            <SessionModal
                session={cubes[chosenCube][sessionIndex]}
                removeSession={removeSession}
                isOpen={sessionModalOpen}
                setIsOpen={setSessionModalOpen}
            />
            <SolveModal
                solve={solve}
                removeSolve={() => removeSolve(solve.index)}
                isOpen={solveModalOpen}
                setIsOpen={setSolveModalOpen}
            />
            <NewSessionModal
                addSession={addSession}
                isOpen={newSessionModalOpen}
                setIsOpen={setNewSessionModalOpen}
            />
        </div>
    )
}
