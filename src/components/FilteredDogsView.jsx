import React from 'react'

const FilteredDogsView = ({ data: dataToBeFiltered, modifySelectedBreeds, selectedBreeds }) => {

    const addDog = (dog) => {
        if (!selectedBreeds.includes(dog))
            modifySelectedBreeds((prevSeletedItems) => [...prevSeletedItems, dog])

    }

    return (
        <>
            {dataToBeFiltered.length > 0 &&
                <article role="listbox" aria-expanded="true" id="search-results" className="border border-black p-4 rounded-lg w-full h-64 overflow-scroll" >

                    <ul>
                        {
                            dataToBeFiltered.map((dog, index) => {
                                
                                const capitalizedName = dog.searchAbleName.charAt(0).toUpperCase() + dog.searchAbleName.slice(1);
                                return <li key={index}><button onClick={() => addDog(dog)}>{capitalizedName}</button></li>
                            })}
                    </ul>
                </article >
            }
        </>

    )
}

export default FilteredDogsView