import { SolveType } from "./types";


export function msToTime(ms: number): string {
    if (ms === Number.MAX_VALUE) return "--";
    if (ms > 1e12) return "DNF";
    const milliseconds = Math.floor((ms % 1000) / 10),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60);
    return (minutes ? (
        minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds)
    ) : (
        seconds
    )) + "." + ((milliseconds < 10) ? "0" + milliseconds : milliseconds);
}

export function timeToMs(time: string) {
    const chars = time.replaceAll(/:|\./g, '').replace(/^0+/g, '').split('');
    let ms = 0;

    ms += parseInt(chars.splice(chars.length - 2).join('')) * 10;
    if (chars.length === 0) return ms;
    else if (chars.length === 1) ms += parseInt(chars[0]);

    ms += parseInt(chars.splice(chars.length - 2).join('')) * 1000;
    if (chars.length === 0) return ms;

    ms += parseInt(chars.join('')) * 60000;
    return ms;
}

function aoX(n: number, endSize: number, solves: SolveType[]) {
    if (solves.length !== n) return Number.MAX_VALUE;
    const arr = solves.map(s => s.millis);
    for (let i = 0; i < endSize; i++) {
        arr.splice(arr.indexOf(Math.min(...arr)), 1);
        arr.splice(arr.indexOf(Math.max(...arr)), 1);
    };
    let dnf = false;
    let newArr = arr.map(a => {
        if (a > 1e12) {
            dnf = true;
            return a - 1e12;
        }
        return a;
    });
    return newArr.reduce((a, b) => a + b) / (n - 2 * endSize) + (dnf ? 1e12 : 0);
}

export const aoSmall = (n: number, solves: SolveType[]) => aoX(n, 1, solves);
export const aoLarge = (n: number, solves: SolveType[]) => aoX(n, Math.floor(n / 10), solves);
