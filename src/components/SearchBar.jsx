import React from 'react'

const SearchBar = ({ data, setFilterData }) => {
    return (
        <>
            <label htmlFor="search-bar" className="block text-lg my-3">Search for the dog breed(s) you are looking for!</label>
            <div className="flex items-center gap-3 border p-2 my-2 rounded-lg w-full border-black">

                {/* SVG graphic obtained from svgrepo.com */}
                <img src="/images/search-svgrepo-com.svg" width="20px" height="20px" alt="search-icon" />


                <input type="search" aria-haspopup="listbox" aria-autocomplete="list" id="search-bar" onChange={(e) => {
                    e.target.value !== '' ?
                        setFilterData(data.filter((dog) => {

                            return dog.includes(e.target.value.toLowerCase())
                        })) :
                        setFilterData([])
                }} className="w-full h-full overflow-scroll" placeholder="Chow"></input>


            </div>
        </>
    )
}

export default SearchBar