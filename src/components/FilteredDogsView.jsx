import React from 'react'

const FilteredDogsView = ({ data, modifySelectedBreeds }) => {

    return (
        <>
        {data.length > 0 &&
            <article role="listbox" aria-expanded="true" id = "search-results" className = "border border-black p-4 rounded-lg w-full h-64 overflow-scroll" >

            <ul>
                {
                    data.map((dog, index) => {
                        return <li key={index}><button onClick={() => {
                            if (!data.includes(dog.charAt(0).toUpperCase() + dog.slice(1)))
                                modifySelectedBreeds((prevSeletedItems) =>  [...prevSeletedItems, dog.charAt(0).toUpperCase() + dog.slice(1)])

                        }}>{dog.charAt(0).toUpperCase() + dog.slice(1)}</button></li>
                    })}
            </ul>
        </article >
    }
    </>

  )
}

export default FilteredDogsView