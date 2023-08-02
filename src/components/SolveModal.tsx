import { msToTime } from "../util/helpers";
import { SolveType } from "../util/types";
import CenteredModal from "./CenteredModal";


export default function SolveModal(props: {
    solve: SolveType,
    removeSolve: () => void,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    className?: string,
}) {
    const {solve, removeSolve, isOpen, setIsOpen, className} = props;

    return (
        <CenteredModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={className}
        >
            <div className="bg-dark-3 p-8 flex flex-col gap-2 text-white text-xl rounded-lg">
                <p>{solve.index}</p>
                <p>{msToTime(solve.millis)}</p>
                <button onClick={() => {removeSolve(); setIsOpen(false)}} className="bg-red-600 px-2 pb-1 pt-0.5 rounded-lg">
                    Delete solve
                </button>
            </div>
        </CenteredModal>
    )
}
