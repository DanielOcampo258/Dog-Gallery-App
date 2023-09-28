import React from 'react'

const SelectedDog = ({ name, deleteSelectedItem }) => {
    return (
        <li className='border bg-gray-300 flex px-2 justify-between items-center'>
            {name}
            <span>
                <button onClick={()=> deleteSelectedItem(name)} className='flex hover:bg-gray-400 hover:rounded-lg items-center'>
                    {/* SVG OBTAINED FROM svgrepo.com */}
                    <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu / Close_SM">
                            <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </button>
            </span>
        </li>
    )
}

export default SelectedDog