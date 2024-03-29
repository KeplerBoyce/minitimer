export type SolveType = {
    millis: number,
    index: number,
    timestamp: number,
    modifier: SolveModifier,
    scramble: string,
};

export type SessionType = {
    name: string,
    index: number,
    solves: SolveType[],
    cube: string,
};

export type SolveModifier = "" | "+2" | "DNF";

export type CubesType = {[cube: string]: SessionType[]};
export type CubesContextType = {
    cubes: CubesType,
    chosenCube: string,
    sessionIndex: number,
    sessions: SessionType[],
    solves: SolveType[],
    setCubes: (x: CubesType) => void,
    setChosenCube: (x: string) => void,
    setSessionIndex: (x: number) => void,
    setSessions: (x: SessionType[]) => void,
    setSolves: (x: SolveType[]) => void,
};
export type PenaltiesContextType = {
    handleNoPenalty: () => void,
    handlePlusTwo: () => void,
    handleDNF: () => void,
    handleDelete: () => void,
};

export type StatsType = {[stat: string]: number};

export const TIMER_TYPES = ["timer", "typing"] as const;
export type TimerType = typeof TIMER_TYPES[number];

export const DEFAULT_CUBES: CubesType = {
    "3x3": [{ name: "Session 1", index: 0, solves: [], cube: "3x3" }],
    "4x4": [{ name: "Session 1", index: 0, solves: [], cube: "4x4" }],
    "5x5": [{ name: "Session 1", index: 0, solves: [], cube: "5x5" }],
    "6x6": [{ name: "Session 1", index: 0, solves: [], cube: "6x6" }],
    "7x7": [{ name: "Session 1", index: 0, solves: [], cube: "7x7" }],
    "2x2": [{ name: "Session 1", index: 0, solves: [], cube: "2x2" }],
    "Pyraminx": [{ name: "Session 1", index: 0, solves: [], cube: "Pyraminx" }],
    "Megaminx": [{ name: "Session 1", index: 0, solves: [], cube: "Megaminx" }],
    "Skewb": [{ name: "Session 1", index: 0, solves: [], cube: "Skewb" }],
    "Square-1": [{ name: "Session 1", index: 0, solves: [], cube: "Square-1" }],
    "Clock": [{ name: "Session 1", index: 0, solves: [], cube: "Clock" }],
};
export const DEFAULT_CHOSEN_CUBE: string = "3x3";
export const DEFAULT_SESSION_INDEX: number = 0;
export const DEFAULT_STATS: StatsType = {
    single: Number.MAX_VALUE,
    ao5: Number.MAX_VALUE,
    ao12: Number.MAX_VALUE,
    ao50: Number.MAX_VALUE,
    ao100: Number.MAX_VALUE,
    ao1000: Number.MAX_VALUE,
}
export const DEFAULT_TIMER_TYPE: TimerType = "timer";
