import { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import BottomBar from"./components/BottomBar";
import { CubesContextType, SessionType, SolveType, DEFAULT_CHOSEN_CUBE, DEFAULT_CUBES, DEFAULT_SESSION_INDEX } from "./util/types";
import Scramble from "./components/Scramble";
import { Scrambow } from "scrambow";


export const CubesContext = createContext({} as CubesContextType);

export default function App() {
    const [cubes, setCubes] = useState(DEFAULT_CUBES);
    const [chosenCube, setChosenCube] = useState(DEFAULT_CHOSEN_CUBE);
    const [sessionIndex, setSessionIndex] = useState(DEFAULT_SESSION_INDEX);
    const [scramble, setScramble] = useState("");

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

    //Save solves to localStorage whenever solves updates
    useEffect(() => {
        localStorage.setItem("solves", JSON.stringify(cubes));
    }, [cubes]);

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

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("cubes", JSON.stringify(cubes))
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
                <Sidebar className="w-1/5 min-w-[20rem] grow bg-dark-1" />
                <div className="flex flex-col w-4/5">
                    <Scramble
                        scramble={scramble}
                        resetScramble={resetScramble}
                        className="text-white text-3xl bg-dark-2"
                    />
                    <Timer
                        scramble={scramble}
                        callback={resetScramble}
                        className="text-7xl w-4/5"
                    />
                    <BottomBar className="text-white text-xl bg-dark-2" />
                </div>
            </div>
        </CubesContext.Provider>
    )
}
