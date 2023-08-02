import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai'


export default function Dropdown(props: {
    chosen: string,
    options: string[],
    setOption: (x: string) => void,
    className: string,
}) {
    const { chosen, options, setOption, className } = props;

    return (
        <Menu as="div" className="relative whitespace-nowrap">
            <Menu.Button className={className}>
                <div className="flex gap-1.5 items-center overflow-x-hidden">
                    <p className="text-ellipsis overflow-x-hidden">
                        {chosen}
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
                    <div className="absolute left-0 flex flex-col bg-slate-100 rounded-lg mt-1 max-h-72 overflow-y-auto" >
                        {options.map((o, i) =>
                            <Menu.Item key={i}>
                                <button
                                    onClick={() => setOption(o)}
                                    className={"text-left " + (o === chosen ? "bg-slate-300 px-3 py-1 rounded-lg"
                                        : "bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg")}
                                >
                                    {o}
                                </button>
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}
