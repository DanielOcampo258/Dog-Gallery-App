import { useState } from "react";
import useAllDogs from "./hooks/useAllDogs";
import Gallery from "./components/Gallery";
import SelectedBreedsView from "./components/SelectedBreedsView";
import FilteredDogsView from "./components/FilteredDogsView";

function App() {
  const allDogs = useAllDogs();
  const [filteredBreeds, setFilteredBreeds] = useState([])
  const [selectedBreeds, setSelectedBreeds] = useState([])
  const [dogsToView, setViewableDogs] = useState([])
  const [amountOfPictures, setAmountOfPictures] = useState(1);



  const handleSubmit = (e) => {
    e.preventDefault();
    setViewableDogs(selectedBreeds);

  }



  return (
    <>
      <header className="flex w-full flex-col justify-center items-center py-16 gap-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
          <span className="text-lg md:text-xl lg:text-2xl font-normal">Welcome to...<br /></span>
          Dog Gallery
        </h1>
        <h3 className="text-center w-2/3 text-lg md:text-2xl font-medium">A web app that lets you select your favorite dog breeds and view pictures of them.</h3>
      </header>

      <main className="py-12 flex flex-col items-center w-full">

        <section id="user-search" className="w-3/4 flex flex-col gap-2 ">

          <label htmlFor="search-bar" className="block text-lg my-3">Search for the dog breed(s) you are looking for!</label>
          <div className="flex items-center gap-3 border p-2 my-2 rounded-lg w-full border-black">

            {/* SVG graphic obtained from svgrepo.com */}
            <img src="/images/search-svgrepo-com.svg" width="20px" height="20px" alt="search-icon" />


            <input type="search" aria-haspopup="listbox" aria-autocomplete="list" id="search-bar" onChange={(e) => {
              e.target.value !== '' ?
                setFilteredBreeds(allDogs.filter((dog) => {

                  return dog.includes(e.target.value.toLowerCase())
                })) :
                setFilteredBreeds([])
            }} className="w-full h-full overflow-scroll" placeholder="Chow"></input>


          </div>


          <FilteredDogsView data={filteredBreeds} modifySelectedBreeds={setSelectedBreeds} />

          <article id="search-limiter">
            <label htmlFor="limiter">Limit to
              <select value={amountOfPictures} onChange={(e) => setAmountOfPictures(e.target.value)} id="limiter">
                <option>1</option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select> picture(s) per dog</label>

          </article>


          <SelectedBreedsView data={selectedBreeds} modifySelectedBreeds={setSelectedBreeds} />


          <button onClick={handleSubmit} className="text-white mx-auto block my-4 md:text-lg bg-black px-6 py-4 rounded-lg" type="submit">Submit</button>


          <Gallery dogs={dogsToView} amountOfPictures={amountOfPictures} />

        </section>


      </main>

    </>
  );
}

export default App;
