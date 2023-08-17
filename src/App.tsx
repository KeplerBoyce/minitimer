import { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import { CubesContextType, SessionType, SolveType, DEFAULT_CHOSEN_CUBE, DEFAULT_CUBES, DEFAULT_SESSION_INDEX, DEFAULT_STATS } from "./util/types";
import Scramble from "./components/Scramble";
import { Scrambow } from "scrambow";
import StatsBlock from "./components/StatsBlock";
import { aoLarge, aoSmall } from "./util/helpers";


export const CubesContext = createContext({} as CubesContextType);

export default function App() {
    const [cubes, setCubes] = useState(DEFAULT_CUBES);
    const [chosenCube, setChosenCube] = useState(DEFAULT_CHOSEN_CUBE);
    const [sessionIndex, setSessionIndex] = useState(DEFAULT_SESSION_INDEX);
    const [scramble, setScramble] = useState("");

    const [currents, setCurrents] = useState(DEFAULT_STATS);
    const [bests, setBests] = useState(DEFAULT_STATS);

    const [scrollTrigger, setScrollTrigger] = useState(false);

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

        if (ls !== null) setCubes(JSON.parse(ls));
        if (ls2 !== null) setChosenCube(ls2);
        if (ls3 !== null) setSessionIndex(parseInt(ls3));

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

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("cubes", JSON.stringify(cubes))
        const tempSolves = cubes[chosenCube][sessionIndex].solves;
        setCurrents({
            single: tempSolves[tempSolves.length - 1].millis,
            ao5: aoSmall(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
            ao12: aoSmall(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
            ao50: aoLarge(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
            ao100: aoLarge(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
            ao1000: aoLarge(5, tempSolves.slice(tempSolves.length - 5, tempSolves.length)),
        });
    }, [cubes]);

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
            <div className="flex w-full h-screen bg-dark-0">
                <Sidebar
                    scrollTrigger={scrollTrigger}
                    setScrollTrigger={setScrollTrigger}
                    className="w-1/5 min-w-[20rem] grow bg-dark-1"
                />
                <div className="flex flex-col w-4/5">
                    <Scramble
                        scramble={scramble}
                        resetScramble={resetScramble}
                        className="text-white text-3xl bg-dark-2"
                    />
                    <div className="relative h-full">
                        <Timer
                            scramble={scramble}
                            callback={handleSolveEnd}
                            className="text-7xl w-full"
                        />
                        <StatsBlock
                            currents={currents}
                            bests={bests}
                            className="absolute bottom-4 right-4 bg-dark-2 rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </CubesContext.Provider>
    )
}
