import { BsTrashFill } from "react-icons/bs";
import { SessionType, StatsType } from "../util/types";
import CenteredModal from "./CenteredModal";
import StatsBlock from "./StatsBlock";


export default function SessionModal(props: {
    session: SessionType,
    removeSession: () => void,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    currents: StatsType,
    bests: StatsType,
    className?: string,
}) {
    const {session, removeSession, isOpen, setIsOpen, className, currents, bests} = props;

    return (
        <CenteredModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={className}
        >
            <div className="max-w-lg bg-dark-3 p-8 flex flex-col gap-4 text-white text-xl rounded-lg">
                <div className="flex">
                    <div className="grow flex flex-col min-w-0">
                        <h1 className="text-xl font-bold break-words">
                            {session.name}
                        </h1>
                        <p className="text-lightish">
                            {session.cube}
                        </p>
                    </div>
                    <button
                        onClick={() => {removeSession(); setIsOpen(false)}}
                        className="ml-8 bg-red-600 font-bold p-2 rounded-lg w-min h-min whitespace-nowrap mx-auto"
                    >
                        <BsTrashFill />
                    </button>
                </div>
                <hr />
                <StatsBlock currents={currents} bests={bests} />
            </div>
        </CenteredModal>
    )
}
