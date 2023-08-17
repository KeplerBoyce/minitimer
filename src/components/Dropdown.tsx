import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai'


export default function Dropdown(props: {
    options: readonly string[],
    chosenIndex: number,
    setOption: (x: number) => void,
    align: string,
    className: string,
}) {
    const { options, chosenIndex, setOption, align, className } = props;

    return (
        <Menu as="div" className="relative whitespace-nowrap">
            <Menu.Button className={className}>
                <div className="flex gap-1.5 items-center overflow-x-hidden">
                    <p className="text-ellipsis overflow-x-hidden">
                        {options[chosenIndex]}
                    </p>
                    <AiOutlineCaretDown size="12px" className="shrink-0" />
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95 -translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 -translate-y-2"
            >
                <Menu.Items>
                    <div className={"absolute flex flex-col bg-slate-100 rounded-lg mt-1 max-h-96 min-w-[8rem] max-w-[16rem] overflow-y-auto divide-y divide-slate-300 " + align} >
                        {options.map((o, i) =>
                            <Menu.Item key={i}>
                                <button
                                    onClick={() => setOption(i)}
                                    className={"px-3 py-1 pr-5 w-full h-full "
                                        + (i === chosenIndex ? "bg-slate-300"
                                            : "bg-slate-100 hover:bg-slate-200")}
                                >
                                    <p className="overflow-x-hidden text-left text-ellipsis">
                                        {o}
                                    </p>
                                </button>
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}
