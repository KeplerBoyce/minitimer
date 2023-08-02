import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import { SolveType } from "./util/types";


export default function App() {
    const [solves, setSolves] = useState<Array<SolveType>>([]);

    //load solves from localStorage
    useEffect(() => {
        const ls = localStorage.getItem("solves");
        if (ls !== null && ls !== "undefined") {
            setSolves(JSON.parse(ls));
        }
    }, []);

    //Save solves to localStorage whenever solves updates
    useEffect(() => {
        localStorage.setItem("solves", JSON.stringify(solves));
    }, [solves]);

    return (
        <div className="flex w-full h-screen bg-dark-1">
            <Sidebar solves={solves} setSolves={setSolves} className="bg-dark-0 w-1/5 min-w-[20rem] grow" />
            <Timer solves={solves} setSolves={setSolves} className="w-3/5" />
            <Sidebar solves={solves} setSolves={setSolves} className="bg-dark-0 w-1/5 min-w-[20rem] grow" />
        </div>
    )
}
