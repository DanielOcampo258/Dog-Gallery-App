import { useEffect, useState } from "react";
import useAllDogs from "./hooks/useAllDogs";
import SelectedDog from "./components/SelectedDog";

function App() {
  const allDogs = useAllDogs()
  const [filteredBreeds, setFilteredBreeds] = useState([])
  const [selectedBreeds, setSelectedBreeds] = useState([])
  const [gallery, setGallery] = useState([])

  
  const handleSubmit = (e) => {
    e.preventDefault();

    selectedBreeds.forEach((selectedDog) => {

      fetch(`https://dog.ceo/api/breed/${selectedDog.toLowerCase()}/images/random`)
        .then((res) => res.json())
        .then((data) => {

          console.log(data.message)
        
          setGallery([...gallery, {"name":selectedDog, "imgUrl" : data.message}])
        })
    })


  }

  const deleteSelectedItem = (nameOfDog) => {

    setSelectedBreeds(selectedBreeds.filter((dogName) => dogName.toLowerCase() !== nameOfDog.toLowerCase()))
    setGallery(gallery.filter((galleryObject) => galleryObject.name.toLowerCase() !== nameOfDog.toLowerCase() ))
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

        <section id="user-search" className="w-3/4 ">

          <label htmlFor="search-bar" className="block text-lg my-3">Search for the dog breed(s) you are looking for!</label>
          <div className="flex items-center gap-3 border p-2 my-2 rounded-lg w-full border-black">

            {/* SVG graphic obtained from svgrepo.com */}
            <svg className="" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


            <input type="search" aria-autocomplete="list" id="search-bar" onChange={(e) => {
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

          <button onClick={handleSubmit} className="text-white mx-auto block mt-4 md:text-lg bg-black px-6 py-4 rounded-lg" type="submit">Submit</button>

        </section>


        {gallery.length > 0 &&

          <section id="gallery" className="w-3/4 h-48 grid grid-cols-3">
            {gallery.map((galleryObject, index) => {

              return <img key={index} src={galleryObject.imgUrl} alt="dog"></img>

            })}

          </section>

        }

      </main>

    </>
  );
}

export default App;
