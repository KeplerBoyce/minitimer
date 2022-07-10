export function msToTime(ms: number): string {
    const milliseconds = Math.floor((ms % 1000) / 10),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60);
    return (minutes ? (
        minutes + ":" + ((seconds < 10) ? "0" + seconds : seconds)
    ) : (
        seconds
    )) + "." + ((milliseconds < 10) ? "0" + milliseconds : milliseconds);
}
