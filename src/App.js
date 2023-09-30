import { useEffect, useState } from "react";
import useAllDogs from "./hooks/useAllDogs";
import Gallery from "./components/Gallery";
import SelectedBreedsView from "./components/SelectedBreedsView";
import FilteredDogsView from "./components/FilteredDogsView";
import SearchBar from "./components/SearchBar";
import ErrorComponent from "./components/ErrorComponent";


function App() {
  const { allDogs, hasError } = useAllDogs();
  const [filteredBreeds, setFilteredBreeds] = useState([])
  const [selectedBreeds, setSelectedBreeds] = useState([])
  const [dogsToView, setViewableDogs] = useState([])
  const [amountOfPictures, setAmountOfPictures] = useState(1);

  useEffect(() => console.log(filteredBreeds), [filteredBreeds])

  const createGallery = (e) => {
    e.preventDefault();
    setViewableDogs(selectedBreeds);

  }

  return (
    <>
      <div className="block md:flex w-full bg-[#EFEFEF]">
        <div id="banner-container" className="w-full h-full">


          <header className="flex w-full flex-col justify-start items-center py-16 gap-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
              <span className="text-lg md:text-xl lg:text-2xl font-normal">Welcome to...<br /></span>
              Dog Gallery
            </h1>
            <h3 className="text-center w-2/3 text-lg md:text-xl font-medium">A web app that lets you select your favorite dog breeds and view pictures of them.</h3>

          </header>
          <img src="/images/banner.png" alt={'line art of corgi'} className="block md:hidden mx-auto max-w-xs object-contain"></img>
          <main className="py-12 flex flex-col items-center w-full">

            {hasError
              ? <ErrorComponent text={'Oops! Looks like we encountered an error trying to get all the dog breed data. '} />

              :
              <>
                <section id="user-search" className="w-3/4 flex flex-col justify-start gap-2 ">

                  <SearchBar data={allDogs} setFilterData={setFilteredBreeds} />

                  <FilteredDogsView data={filteredBreeds} modifySelectedBreeds={setSelectedBreeds} selectedBreeds={selectedBreeds} />

                  <article id="search-limiter">
                    <label htmlFor="limiter">Limit to
                      <select
                        className="bg-[#EFEFEF]"
                        value={amountOfPictures}
                        onChange={(e) => setAmountOfPictures(e.target.value)}
                        id="limiter">
                        <option>1</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                      </select> picture(s) per dog</label>

                  </article>
                  <SelectedBreedsView data={selectedBreeds} modifySelectedBreeds={setSelectedBreeds} />

                  <button onClick={createGallery} className="text-white my-4 md:text-lg bg-[#878484] px-6 py-4 w-36 rounded-lg flex-1" type="submit">Submit</button>

                </section>

              </>
            }
          </main>
        </div>
        <img src="/images/banner.png" alt={'line art of corgi'} className="hidden md:block w-1/2 max-w-lg object-contain"></img>
      </div>

      <Gallery dogs={dogsToView} amountOfPictures={amountOfPictures} />


    </>
  );
}

export default App;
