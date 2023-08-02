import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import { SolveType } from "./util/types";


export default function App() {
    const [solves, setSolves] = useState(undefined as unknown as SolveType[]);

    //load solves from localStorage
    useEffect(() => {
        if (!solves) {
            const ls = localStorage.getItem("solves");
            if (ls !== null && ls !== "undefined") {
                setSolves(JSON.parse(ls));
            }
        }
    });

    //Save solves to localStorage whenever solves updates
    useEffect(() => {
        localStorage.setItem("solves", JSON.stringify(solves));
    }, [solves]);

    return (
        <div className="w-full h-[100vh] bg-dark-1">
            <Sidebar solves={solves} setSolves={setSolves} className="absolute left-0 bg-dark-0" />
            <Timer solves={solves} setSolves={setSolves} />
        </div>
    );
}
