import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import { SolveType } from "./util/types";

export default function App() {
    const [solves, setSolves] = useState<SolveType[]>();

    return (
        <div className="w-full h-[100vh] bg-dark-1">
            <Sidebar solves={solves} className="absolute left-0 bg-dark-0" />
            <Timer solves={solves} setSolves={setSolves} />
        </div>
    );
}
