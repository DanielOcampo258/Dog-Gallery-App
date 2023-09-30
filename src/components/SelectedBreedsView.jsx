import React from 'react'
import SelectedDog from './SelectedDog'

const SelectedBreedsView = ({ data, modifySelectedBreeds }) => {

    const deleteSelectedItem = (nameOfDog) => {
        modifySelectedBreeds((prev) => prev.filter((dog) => dog.searchAbleName.toLowerCase() !== nameOfDog.toLowerCase()));
    }


    return (
        <>
            {data.length > 0 &&
                <article id="selected-items" >
                    <h5>Click submit to generate a gallery of these dogs!</h5>
                    <div className="border p-3 rounded-lg border-black bg-white">
                        <ul className="flex flex-wrap gap-5">
                            {data.map((selectedDog, index) => {
                                return <SelectedDog deleteSelectedItem={deleteSelectedItem} key={index} name={selectedDog.searchAbleName} />
                            })}
                        </ul>

                    </div>

                </article>
            }</>
    )
}

export default SelectedBreedsView