import { BsTrashFill } from "react-icons/bs";
import { msToTime } from "../util/helpers";
import { SessionType, SolveType } from "../util/types";
import CenteredModal from "./CenteredModal";


export default function SolveModal(props: {
    solve: SolveType,
    removeSolve: () => void,
    session: SessionType,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    className?: string,
}) {
    const {solve, removeSolve, session, isOpen, setIsOpen, className} = props;

    return (
        <CenteredModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={className}
        >
            <div className="max-w-lg bg-dark-3 p-8 flex flex-col gap-4 text-white rounded-lg">
                <div className="flex items-center">
                    <div className="grow flex flex-col">
                        <h3 className="text-xl font-bold">
                            Solve {solve.index}
                        </h3>
                        <h1 className="text-lightish">
                            {session.cube} • {session.name}
                        </h1>
                    </div>
                    <button
                        onClick={() => {removeSolve(); setIsOpen(false)}}
                        className="ml-8 bg-red-600 font-bold p-2 rounded-lg w-min h-min whitespace-nowrap mx-auto"
                    >
                        <BsTrashFill />
                    </button>
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                    <p className="text-3xl">
                        {msToTime(solve.millis)}
                    </p>
                    <p>{solve.scramble}</p>
                </div>
            </div>
        </CenteredModal>
    )
}
