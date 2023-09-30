import React from 'react'

const SearchBar = ({ data, setFilterData }) => {
    return (
        <>
            <label htmlFor="search-bar" className="block text-lg font-bold my-3">Search for the dog breed(s) you are looking for!</label>
            <div className="flex bg-white items-center gap-3 border p-2 my-2 rounded-lg w-full max-w-xl border-black">

                {/* SVG graphic obtained from svgrepo.com */}
                <img src="/images/search-svgrepo-com.svg" width="20px" height="20px" alt="search-icon" />


                <input type="search" aria-haspopup="listbox" aria-autocomplete="list" id="search-bar" onChange={(e) => {
                    e.target.value !== ''
                        ? setFilterData(data.filter((dog) => {

                            return dog.searchAbleName.toLowerCase().includes(e.target.value.toLowerCase())
                        }))
                        : setFilterData([]) //if userfield is empty, we do not want to filter data
                }} className="w-full h-full" placeholder="Chow"></input>

                {/* Toggles to show all data or non based of prev assingment of filtered data */}
                <button onClick={() => {
                    setFilterData((prev) => {
                        if (prev.length === 0)
                            return data
                        else
                            return []
                    })
                }}>
                    {/* SVG graphic obtained from svgrepo.com */}
                    <img src='/images/caret-down-svgrepo-com.svg' alt='Caret Down Symbol to indicate expandable menu' width={'30px'} height={'30px'} />

                </button>


            </div>
        </>
    )
}

export default SearchBar