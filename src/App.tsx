import { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import RightSidebar from"./components/RightSidebar";
import { CubesContextType, SessionType, SolveType, DEFAULT_CHOSEN_CUBE, DEFAULT_CUBES, DEFAULT_SESSION_INDEX } from "./util/types";


export const CubesContext = createContext({} as CubesContextType);

export default function App() {
    const [cubes, setCubes] = useState(DEFAULT_CUBES);
    const [chosenCube, setChosenCube] = useState(DEFAULT_CHOSEN_CUBE);
    const [sessionIndex, setSessionIndex] = useState(DEFAULT_SESSION_INDEX);
    
    //load info from localStorage or use defaults if localStorage is empty
    useEffect(() => {
        const ls = localStorage.getItem("cubes");
        const ls2 = localStorage.getItem("chosenCube");
        const ls3 = localStorage.getItem("sessionIndex");

        if (ls !== null) setCubes(JSON.parse(ls));
        if (ls2 !== null) setChosenCube(ls2);
        if (ls3 !== null) setSessionIndex(parseInt(ls3));
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

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("cubes", JSON.stringify(cubes))
    }, [cubes]);

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("chosenCube", chosenCube)
    }, [chosenCube]);

    useEffect(() => {
        if (cubes === DEFAULT_CUBES) return;
        localStorage.setItem("sessionIndex", sessionIndex.toString())
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
            <div className="flex w-full h-screen bg-dark-1">
                <Sidebar className="bg-dark-0 w-1/5 min-w-[20rem] grow" />
                <Timer className="w-3/5" />
                <RightSidebar className="bg-dark-0 w-1/5 min-w-[20rem] grow" />
            </div>
        </CubesContext.Provider>
    )
}
