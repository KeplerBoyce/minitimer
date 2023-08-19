import { useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_CUBES, SolveType, StatsType } from "../util/types";
import Dropdown from "./Dropdown";
import SessionModal from "./SessionModal";
import Solve from "./Solve";
import SolveModal from "./SolveModal";
import { BsPlus, BsFillGearFill, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import NewSessionModal from "./NewSessionModal";
import { CubesContext } from "../App";


export default function Sidebar(props: {
    scrollTrigger: boolean,
    setScrollTrigger: (x: boolean) => void,
    setCanStart: (x: boolean) => void,
    selected: number[],
    setSelected: (x: number[]) => void,
    className?: string,
}) {
    const { scrollTrigger, setScrollTrigger, setCanStart, selected, setSelected, className } = props;
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
    const [lastClicked, setLastClicked] = useState<number>();
    const [lastSelect, setLastSelect] = useState(false);
    const [shiftHeld, setShiftHeld] = useState(false);

    const [sessionModalOpen, setSessionModalOpen] = useState(false);//for session info modal
    const [newSessionModalOpen, setNewSessionModalOpen] = useState(false);//for new session modal
    const [solveModalOpen, setSolveModalOpen] = useState(false);//for solve info modal

    const solvesDivRef = useRef<HTMLDivElement>(null);

    function downHandler(e: KeyboardEvent) {
        if (e.key === 'Shift') {
            setShiftHeld(true);
        }
    }

    function upHandler(e: KeyboardEvent) {
        if (e.key === 'Shift') {
            setShiftHeld(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    //remove solve at index
    const removeSolve = (index: number) => {
        setSolves([
            ...solves.slice(0, solves.length - index),
            ...solves.slice(solves.length - index + 1).map(x => {//update index of all later solves
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
        if (shiftHeld && lastClicked) {
            const shiftArr = Array.from(Array(Math.max(lastClicked, index) + 1).keys()).slice(Math.min(lastClicked, index));
            if (lastSelect) {
                setSelected(Array.from(new Set([...selected, ...shiftArr])))
            } else {
                setSelected([...selected].filter(i => !shiftArr.includes(i)));
            }
        } else if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
            setLastSelect(false);
        } else {
            setSelected([...selected, index]);
            setLastSelect(true);
        }
        setLastClicked(index);
    }

    const openSolveModal = (index: number) => {
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
        <div className={"flex flex-col h-full max-h-screen p-4 pb-0 " + className}>
            <div className="flex justify-center text-4xl mb-4">
                <p className="text-green-500">mini</p>
                <p className="text-white">timer</p>
            </div>

            <div className="flex justify-between items-center gap-2 mb-4 max-w-full">
                <Dropdown
                    options={Object.keys(cubes)}
                    chosenIndex={Object.keys(cubes).indexOf(chosenCube)}
                    setOption={switchCube}
                    align="left-0"
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white font-semibold"
                />
                <div className="min-w-0">
                    <Dropdown
                        options={sessions.map(s => s.name)}
                        chosenIndex={sessionIndex}
                        setOption={x => setSessionIndex(x)}
                        align="left-0"
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

            <div className="flex px-2 pr-10 text-lg text-white font-bold text-right border-b border-white">
                <p className="w-2/12 italic">#</p>
                <p className="w-5/12">Time</p>
                <p className="w-5/12">Ao5</p>
            </div>
            <div ref={solvesDivRef} className="flex flex-col w-full overflow-y-auto">
                {solves.length > 0 ? <>
                    {solves.slice().reverse().map((s, i) =>
                        <div key={i} className={"flex w-full group "
                            + (selected.includes(s.index - 1) ? "bg-blue-500/50 hover:bg-blue-500/60" : "hover:bg-white/10")
                            + (i === solves.length - 1 ? " mb-3" : "")}
                        >
                            <Solve
                                solve={s}
                                solves={solves}
                                lastFive={solves.slice(s.index - 5, s.index)}
                                widths={["w-2/12", "w-5/12", "w-5/12"]}
                                onClick={() => handleSolveClick(s.index - 1)}
                                className={"grow w-full px-2 hover:cursor-pointer text-lg font-mono "
                                    + (selected.includes(s.index - 1) ? "text-white" : "text-light")}
                            />
                            <button
                                onClick={() => openSolveModal(s.index - 1)}
                                className="w-8 text-white"
                            >
                                <BsThreeDotsVertical className="hidden group-hover:block" />
                            </button>
                        </div>
                    )}
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
