import { useState } from "react";

export default function Dropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex flex-col">
            <button 
                onClick={() => setOpen(!open)}
                className={`z-30 rounded-lg p-0.5 ${open ? 'bg-gray-100 text-black' : 'hover:bg-gray-400/20 text-gray-300 '} transition-colors duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M249.23-420q-24.75 0-42.37-17.63-17.63-17.62-17.63-42.37 0-24.75 17.63-42.37Q224.48-540 249.23-540q24.75 0 42.38 17.63 17.62 17.62 17.62 42.37 0 24.75-17.62 42.37Q273.98-420 249.23-420ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm230.77 0q-24.75 0-42.38-17.63-17.62-17.62-17.62-42.37 0-24.75 17.62-42.37Q686.02-540 710.77-540q24.75 0 42.37 17.63 17.63 17.62 17.63 42.37 0 24.75-17.63 42.37Q735.52-420 710.77-420Z"/>
                </svg>
            </button>
            {open &&
                <div className="absolute z-20 top-full">
                    <div className="flex flex-col relative isolate w-75 shadow-[0_0_15px_0_rgba(0,0,0,0.5)] bg-gray-400/20 rounded-lg justify-between mt-2.5">
                        <span className="flex grid-cols-3 items-center absolute top-0 left-0 -z-5 w-full h-full rounded-lg bg-gray-950 pointer-events-none" />
                        <div className="flex w-full justify-between">
                            <h1 className="whitespace-nowrap font-semibold text-gray-300 text-md w-full m-2.5">
                                List actions
                            </h1>
                            <div className="flex m-2.5">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className="flex mb-5 w-full hover:bg-gray-300/20 px-3">
                            Delete this list
                        </button>
                    </div>
                </div>
            }
            {open &&
                <span onClick={() => setOpen(!open)} className="fixed z-20 h-screen w-screen top-0 left-0" />
            }
        </div>
    )
}