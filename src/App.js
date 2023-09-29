import { useState } from "react";
import useAllDogs from "./hooks/useAllDogs";
import SelectedDog from "./components/SelectedDog";
import Gallery from "./components/Gallery";

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

  const deleteSelectedItem = (nameOfDog) => {
    setSelectedBreeds(selectedBreeds.filter((dogName) => dogName.toLowerCase() !== nameOfDog.toLowerCase()));
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
           <img src="/images/search-svgrepo-com.svg" width="20px" height="20px" alt="search-icon"/>


            <input type="search" aria-haspopup="listbox" aria-autocomplete="list" id="search-bar" onChange={(e) => {
              e.target.value !== '' ?
                setFilteredBreeds(allDogs.filter((dog) => {

                  return dog.includes(e.target.value.toLowerCase())
                })) :
                setFilteredBreeds([])
            }} className="w-full h-full overflow-scroll" placeholder="Chow"></input>


          </div>


          {filteredBreeds.length > 0 &&


            <article role="listbox" aria-expanded="true" id="search-results" className="border border-black p-4 rounded-lg w-full h-64 overflow-scroll">

              <ul>
                {
                  filteredBreeds.map((dog, index) => {
                    return <li key={index}><button onClick={() => {
                      if (!selectedBreeds.includes(dog.charAt(0).toUpperCase() + dog.slice(1)))
                        setSelectedBreeds([...selectedBreeds, dog.charAt(0).toUpperCase() + dog.slice(1)])

                    }}>{dog.charAt(0).toUpperCase() + dog.slice(1)}</button></li>
                  })}
              </ul>
            </article>

          }

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



          {selectedBreeds.length > 0 &&

            <article id="selected-items" >
              <h5>Click submit to generate a gallery of these dogs!</h5>
              <div className="border p-3 rounded-lg border-black">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {selectedBreeds.map((selectedDog, index) => {
                    return <SelectedDog deleteSelectedItem={deleteSelectedItem} key={index} name={selectedDog} />
                  })}
                </ul>

              </div>

            </article>
          }

          <button onClick={handleSubmit} className="text-white mx-auto block my-4 md:text-lg bg-black px-6 py-4 rounded-lg" type="submit">Submit</button>


          <Gallery dogs={dogsToView} amountOfPictures={amountOfPictures} />

        </section>



      </main>

    </>
  );
}

export default App;
