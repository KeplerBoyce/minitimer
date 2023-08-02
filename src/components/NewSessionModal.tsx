import { useState } from 'react';
import CenteredModal from "./CenteredModal";


export default function NewSessionModal(props: {
    addSession: (x: string) => void,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    className?: string,
}) {
    const { addSession, isOpen, setIsOpen, className } = props;

    const [name, setName] = useState("");

    const handleSubmit = () => {
        addSession(name);
        setIsOpen(false);
        setName("");
    }

    return (
        <CenteredModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={className}
        >
            <div className="bg-dark-3 p-8 flex flex-col gap-4 text-white text-lg rounded-lg">
                <h1 className="font-bold">
                    New Session
                </h1>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="text-black px-1 rounded-md"
                />
                <button onClick={handleSubmit} className="w-min bg-blue-500 px-2 pb-1 pt-0.5 rounded-lg">
                    Create
                </button>
            </div>
        </CenteredModal>
    )
}
