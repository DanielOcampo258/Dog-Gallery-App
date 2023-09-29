import React from 'react'

const SelectedDog = ({ name, deleteSelectedItem }) => {
    return (
        <li className='border bg-gray-300 flex px-2 justify-between items-center'>
            {name}
            <span>
                <button onClick={() => deleteSelectedItem(name)} className='flex hover:bg-gray-400 hover:rounded-lg items-center'>
                    {/* SVG OBTAINED FROM svgrepo.com */}
                    <img width="15px" height="15px" src='/images/close-sm-svgrepo-com.svg' alt='close icon' />

                </button>
            </span>
        </li>
    )
}

export default SelectedDog