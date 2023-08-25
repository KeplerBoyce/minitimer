import { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import { CubesContextType, SessionType, SolveType, DEFAULT_CHOSEN_CUBE, DEFAULT_CUBES, DEFAULT_SESSION_INDEX, DEFAULT_STATS, DEFAULT_TIMER_TYPE, TimerType, PenaltiesContextType, SolveModifier } from "./util/types";
import Scramble from "./components/Scramble";
import { Scrambow } from "scrambow";
import StatsBlock from "./components/StatsBlock";
import { aoLarge, aoSmall } from "./util/helpers";
import OptionsBlock from "./components/OptionsBlock";
import Typing from "./components/Typing";
import SelectedBar from "./components/SelectedBar";


export const CubesContext = createContext({} as CubesContextType);
export const PenaltiesContext = createContext({} as PenaltiesContextType);

export default function App() {
    const [cubes, setCubes] = useState(DEFAULT_CUBES);
    const [chosenCube, setChosenCube] = useState(DEFAULT_CHOSEN_CUBE);
    const [sessionIndex, setSessionIndex] = useState(DEFAULT_SESSION_INDEX);
    const [scramble, setScramble] = useState("");

    const [currents, setCurrents] = useState(DEFAULT_STATS);
    const [bests, setBests] = useState(DEFAULT_STATS);

    const [scrollTrigger, setScrollTrigger] = useState(false);
    const [canStart, setCanStart] = useState(true);
    const [selected, setSelected] = useState([] as number[]);

    const [timerType, setTimerType] = useState(DEFAULT_TIMER_TYPE);

    const cubeToScrambler: {[cube: string]: string} = {
        "2x2": "222",
        "3x3": "333",
        "4x4": "444",
        "5x5": "555",
        "6x6": "666",
        "7x7": "777",
        "Clock": "clock",
        "Megaminx": "megaminx",
        "Pyraminx": "pyraminx",
        "Skewb": "skewb",
        "Square-1": "square1",
    };
    
    //load info from localStorage or use defaults if localStorage is empty
    useEffect(() => {
        const ls = localStorage.getItem("cubes");
        const ls2 = localStorage.getItem("chosenCube");
        const ls3 = localStorage.getItem("sessionIndex");
        const ls4 = localStorage.getItem("timerType");

        if (ls !== null) setCubes(JSON.parse(ls));
        if (ls2 !== null) setChosenCube(ls2);
        if (ls3 !== null) setSessionIndex(parseInt(ls3));
        if (ls4 !== null) setTimerType(ls4 as TimerType);

        resetScramble();
    }, []);

    const setSessions = (x: SessionType[]) => {
        const newCubes = {...cubes};
        newCubes[chosenCube] = x;
        setCubes(newCubes);
    }

    const setSolves = (x: SolveType[]) => {
        const newCubes = {...cubes};
        newCubes[chosenCube][sessionIndex].solves = x;
        setCubes(newCubes);
    }

    const resetScramble = () => setScramble(
        new Scrambow().setType(cubeToScrambler[chosenCube]).get()[0].scramble_string
    );

    const handleSolveEnd = () => {
        resetScramble();
        setScrollTrigger(true);
    }

    const changeTimerType = (x: TimerType) => {
        localStorage.setItem("timerType", x);
        setTimerType(x);
    };

    const setLastModifier = (mod: string) => {
        const newSolves = cubes[chosenCube][sessionIndex].solves;
        if (newSolves[newSolves.length - 1].modifier === mod) {
            return;
        }
        if (mod === "+2") {
            newSolves[newSolves.length - 1].millis += 2000;
        } else if (newSolves[newSolves.length - 1].modifier === "+2") {
            newSolves[newSolves.length - 1].millis -= 2000;
        }
        if (mod === "DNF") {
            newSolves[newSolves.length - 1].millis += 1e12;
        } else if (newSolves[newSolves.length - 1].modifier === "DNF") {
            newSolves[newSolves.length - 1].millis -= 1e12;
        }
        newSolves[newSolves.length - 1].modifier = mod as SolveModifier;
        setSolves(newSolves);
    }

    const deleteLast = () => {
        const newSolves = cubes[chosenCube][sessionIndex].solves;
        newSolves.splice(newSolves.length - 1);
        setSolves(newSolves);
    }

    const deselectAll = () => {
        setSelected([]);
    }

    const deleteAllSelected = () => {
        let newSolves = cubes[chosenCube][sessionIndex].solves;
        newSolves = newSolves.filter(x => !selected.includes(x.index - 1)).map((x, i) => {
            x.index = i + 1;
            return x;
        });
        deselectAll();
        setSolves(newSolves);
    }

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("cubes", JSON.stringify(cubes))
    }, [cubes]);

    useEffect(() => {
        const tempSolves = cubes[chosenCube][sessionIndex].solves;
        setCurrents({
            single: tempSolves[tempSolves.length - 1]?.millis ?? Number.MAX_VALUE,
            ao5: aoSmall(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
            ao12: aoSmall(12, tempSolves.slice(tempSolves.length - 12, tempSolves.length)),
            ao50: aoLarge(50, tempSolves.slice(tempSolves.length - 50, tempSolves.length)),
            ao100: aoLarge(100, tempSolves.slice(tempSolves.length - 100, tempSolves.length)),
            ao1000: aoLarge(1000, tempSolves.slice(tempSolves.length - 1000, tempSolves.length)),
        });
        let single = Number.MAX_VALUE,
            ao5 = Number.MAX_VALUE,
            ao12 = Number.MAX_VALUE,
            ao50 = Number.MAX_VALUE,
            ao100 = Number.MAX_VALUE,
            ao1000 = Number.MAX_VALUE;
        cubes[chosenCube][sessionIndex].solves.forEach((_, i) => {
            const thisSingle = tempSolves[i].millis,
                thisAo5 = aoSmall(5, tempSolves.slice(i - 4, i + 1)),
                thisAo12 = aoSmall(12, tempSolves.slice(i - 11, i + 1)),
                thisAo50 = aoLarge(50, tempSolves.slice(i - 49, i + 1)),
                thisAo100 = aoLarge(100, tempSolves.slice(i - 99, i + 1)),
                thisAo1000 = aoLarge(1000, tempSolves.slice(i - 999, i + 1));
            if (thisSingle < single) single = thisSingle;
            if (thisAo5 < ao5) ao5 = thisAo5;
            if (thisAo12 < ao12) ao12 = thisAo12;
            if (thisAo50 < ao50) ao50 = thisAo50;
            if (thisAo100 < ao100) ao100 = thisAo100
            if (thisAo1000 < ao1000) ao1000 = thisAo1000;
        });
        setBests({single, ao5, ao12, ao50, ao100, ao1000});
    }, [chosenCube, sessionIndex]);

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("chosenCube", chosenCube)
        resetScramble();
    }, [chosenCube]);

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("sessionIndex", sessionIndex.toString())
        resetScramble();
    }, [sessionIndex]);

    useEffect(() => {
        deselectAll();
    }, [chosenCube, sessionIndex]);

    return (
        <CubesContext.Provider value={{
            cubes,
            chosenCube,
            sessionIndex,
            sessions: cubes[chosenCube],
            solves: cubes[chosenCube][sessionIndex].solves,
            setCubes,
            setChosenCube,
            setSessionIndex,
            setSessions,
            setSolves,
        }}>
        <PenaltiesContext.Provider value={{
            handleNoPenalty: () => setLastModifier(""),
            handlePlusTwo: () => setLastModifier("+2"),
            handleDNF: () => setLastModifier("DNF"),
            handleDelete: deleteLast,
        }}>
            <div className="flex w-full h-screen bg-dark-0">
                <Sidebar
                    scrollTrigger={scrollTrigger}
                    setScrollTrigger={setScrollTrigger}
                    setCanStart={setCanStart}
                    selected={selected}
                    setSelected={setSelected}
                    className="w-min grow bg-dark-1"
                />
                <div className="flex flex-col w-4/5">
                    <Scramble
                        scramble={scramble}
                        resetScramble={resetScramble}
                        className="text-white text-3xl bg-dark-2"
                    />
                    <div className="relative h-full">
                        {timerType === "typing" ?
                            <Typing
                                scramble={scramble}
                                callback={handleSolveEnd}
                                className="text-5xl"
                            />
                        :
                            <Timer
                                scramble={scramble}
                                callback={handleSolveEnd}
                                canStart={canStart}
                                className="text-7xl w-full"
                            />
                        }
                        <OptionsBlock
                            timerType={timerType}
                            changeTimerType={changeTimerType}
                            className="absolute top-4 right-4"
                        />
                        <StatsBlock
                            currents={currents}
                            bests={bests}
                            className="absolute bottom-4 right-4 bg-dark-2 rounded-xl"
                        />
                    </div>
                    <SelectedBar
                        selected={selected}
                        deselectAll={deselectAll}
                        deleteAll={deleteAllSelected}
                        className="bg-dark-3"
                    />
                </div>
            </div>
        </PenaltiesContext.Provider>
        </CubesContext.Provider>
    )
}
