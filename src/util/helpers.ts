import { SolveType } from "./types";


export function msToTime(ms: number): string {
    if (ms === -1) return "--";
    const milliseconds = Math.floor((ms % 1000) / 10),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60);
    return (minutes ? (
        minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds)
    ) : (
        seconds
    )) + "." + ((milliseconds < 10) ? "0" + milliseconds : milliseconds);
}

function aoX(n: number, endSize: number, solves: SolveType[]) {
    if (solves.length < n) return -1;
    const arr = solves.map(s => s.millis);
    Array(endSize).forEach(_ => {
        arr.splice(arr.indexOf(Math.min(...arr)), 1);
        arr.splice(arr.indexOf(Math.max(...arr)), 1);
    });
    return arr.reduce((a, b) => a + b) / (n - 2 * endSize);
}

export const aoSmall = (n: number, solves: SolveType[]) => aoX(n, 1, solves);
export const aoLarge = (n: number, solves: SolveType[]) => aoX(n, Math.floor(n / 10), solves);
