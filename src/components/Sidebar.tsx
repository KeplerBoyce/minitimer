import { useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_CUBES, SolveType } from "../util/types";
import Dropdown from "./Dropdown";
import SessionModal from "./SessionModal";
import Solve from "./Solve";
import SolveModal from "./SolveModal";
import { BsPlus, BsFillGearFill } from "react-icons/bs";
import NewSessionModal from "./NewSessionModal";
import { CubesContext } from "../App";


export default function Sidebar(props: {
    scrollTrigger: boolean,
    setScrollTrigger: (x: boolean) => void,
    setCanStart: (x: boolean) => void,
    className?: string,
}) {
    const { scrollTrigger, setScrollTrigger, setCanStart, className } = props;
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

    const solvesDivRef = useRef<HTMLDivElement>(null);

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
        if (sessions.length === 1) {
            setSessions(DEFAULT_CUBES[chosenCube]);
            setSessionIndex(0);
        } else {
            setSessionIndex(Math.max(0, sessionIndex - 1));
        }
        setSessions(sessions.filter(s => s.index !== sessionIndex));
    }

    const addSession = (name: string) => {
        setSessions([...sessions, {
            name,
            index: sessions.length,
            solves: [],
            cube: chosenCube,
        }]);
        setSessionIndex(sessions.length);
    }

    const switchCube = (x: number) => {
        setChosenCube(Object.keys(cubes)[x]);
        setSessionIndex(0);
    }

    //handle clicking on solve to open modal
    const handleSolveClick = (index: number) => {
        setSolve(solves[index]);
        setSolveModalOpen(true);
    }

    useEffect(() => {
        if (scrollTrigger && solvesDivRef.current) {
            solvesDivRef.current.scrollTo({ top: 0 });
            setScrollTrigger(false);
        }
    }, [scrollTrigger]);

    useEffect(() => {
        if (sessionModalOpen || newSessionModalOpen || solveModalOpen) {
            setCanStart(false);
        } else if (!sessionModalOpen && !newSessionModalOpen && !solveModalOpen) {
            setCanStart(true);
        }
    }, [sessionModalOpen, newSessionModalOpen, solveModalOpen]);

    return (
        <div className={"flex flex-col h-full max-h-screen p-4 " + className}>
            <div className="flex justify-center text-4xl mb-4">
                <p className="text-green-500">mini</p>
                <p className="text-white">timer</p>
            </div>

            <div className="flex justify-between items-center gap-2 mb-4 max-w-full">
                <Dropdown
                    options={Object.keys(cubes)}
                    chosenIndex={Object.keys(cubes).indexOf(chosenCube)}
                    setOption={switchCube}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white font-semibold"
                />
                <div className="min-w-0">
                    <Dropdown
                        options={sessions.map(s => s.name)}
                        chosenIndex={sessionIndex}
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

            <div className="flex px-2 pr-6 text-lg text-light font-bold text-left border-b border-light">
                <p className="w-1/5 italic">#</p>
                <p className="w-2/5 text-right">Time</p>
                <p className="w-2/5 text-right">Ao5</p>
            </div>
            <div ref={solvesDivRef} className="flex flex-col w-full overflow-y-auto">
                {solves.length > 0 ? <>
                    {
                        solves.reverse().map((s, i) =>
                            <Solve
                                key={i}
                                solve={s}
                                lastFive={solves.slice(s.index - 5, s.index)}
                                widths={["w-1/5", "w-2/5", "w-2/5"]}
                                onClick={() => handleSolveClick(i)}
                                className="px-2 pr-6 hover:bg-dark-2 hover:cursor-pointer text-light text-lg font-mono"
                            />
                        )
                    }
                </> : <p className="px-2 text-lg text-light italic">
                    Session empty
                </p>}
            </div>

            <SessionModal
                session={sessions[sessionIndex]}
                removeSession={removeSession}
                isOpen={sessionModalOpen}
                setIsOpen={setSessionModalOpen}
            />
            <SolveModal
                solve={solve}
                removeSolve={() => removeSolve(solve.index)}
                session={sessions[sessionIndex]}
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
