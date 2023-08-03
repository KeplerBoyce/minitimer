import { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import RightSidebar from"./components/RightSidebar";
import { CubesContextType, CubesType, DEFAULT_CUBES, SessionType, SolveType } from "./util/types";


export const CubesContext = createContext({} as CubesContextType);

export default function App() {
    const [cubes, setCubes] = useState({} as CubesType);
    const [chosenCube, setChosenCube] = useState("");
    const [sessionIndex, setSessionIndex] = useState(0);
    
    //load solves from localStorage
    useEffect(() => {
        const ls = localStorage.getItem("cubes");
        const ls2 = localStorage.getItem("chosenCube");
        if (ls !== null) {
            setCubes(JSON.parse(ls));
        } else {
            setCubes(DEFAULT_CUBES);
        }
    }, []);

    //Save solves to localStorage whenever solves updates
    useEffect(() => {
        localStorage.setItem("solves", JSON.stringify(cubes));
    }, [cubes]);

    const setSessions = (x: SessionType[]) => {
        const newCubes = cubes;
        newCubes[chosenCube] = x;
        setCubes(newCubes);
    }

    const setSolves = (x: SolveType[]) => {
        const newCubes = cubes;
        newCubes[chosenCube][sessionIndex].solves = x;
        setCubes(newCubes);
    }

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
