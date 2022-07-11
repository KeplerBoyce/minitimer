import { SessionType } from "../util/types";
import CenteredModal from "./CenteredModal";

export default function SessionModal(props: {session: SessionType, removeSession: () => void, isOpen: boolean, setIsOpen: (value: boolean) => void, className?: string}) {
    const {session, removeSession, isOpen, setIsOpen, className} = props;

    return (
        <CenteredModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={className}
        >
            <div className="bg-dark-3 p-8 flex flex-col gap-2 text-white text-xl rounded-lg">
                <p>{session.name}</p>
                <p>{session.cube}</p>
                <button onClick={() => {removeSession(); setIsOpen(false)}} className="bg-red-600 px-2 pb-1 pt-0.5 rounded-lg">
                    Delete session
                </button>
            </div>
        </CenteredModal>
    )
}