import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';


export default function Dropdown(props: {
    chosen: string,
    options: string[],
    setOption: (x: string) => void,
    menuClass: string,
    listClass: string,
    buttonClass: string,
    activeClass: string,
}) {
    const {chosen, options, setOption, menuClass, listClass, buttonClass, activeClass} = props;

    return (
        <Menu as="div" className="relative inline-block whitespace-nowrap">
            <Menu.Button className={menuClass}>
                {chosen}
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
                    <div className={"absolute left-0 flex flex-col " + listClass}>
                        {options.map(o =>
                            <Menu.Item>
                                <button
                                    onClick={() => setOption(o)}
                                    className={o === chosen ? activeClass : buttonClass}
                                >
                                    {o}
                                </button>
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
