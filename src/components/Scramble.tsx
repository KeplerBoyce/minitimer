import { BsArrowRepeat } from "react-icons/bs";


export default function Scramble(props: {scramble: string, resetScramble: () => void, className?: string}) {
    const { scramble, resetScramble, className } = props;

    return (
        <div className={"flex justify-center items-center gap-4 text-center p-4 " + className} >
            <p className="grow">
                {scramble}
            </p>
            <button
                onClick={resetScramble}
                className="p-2 rounded-full hover:bg-white/10"
            >
                <BsArrowRepeat />
            </button>
        </div>
    )
}
