import useAllDogs from "./hooks/useAllDogs";

function App() {
  const allDogs = useAllDogs()

  return (
    <>
      <header className="flex w-full flex-col justify-center items-center py-16 gap-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
          <span className="text-lg md:text-xl lg:text-2xl font-normal">Welcome to...<br /></span>
          Dog Gallery
        </h1>
        <h3 className="text-center w-2/3 text-lg md:text-2xl font-medium">A web app that lets you select your favorite dog breeds and view pictures of them.</h3>
      </header>

      <main className="py-12 flex flex-col items-center mx-auto w-3/4">

        <section id="user-search" className="">

          <label className="block text-lg my-3">Search for the dog breed(s) you are looking for!</label>
          <div className="flex items-center gap-3 border p-2 my-2 rounded-lg w-full border-black">
            {/* SVG graphic obtained from svgrepo.com */}
            <svg className="" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <input className="w-full h-full" type="text" placeholder="Chow"></input>
          </div>

          <article id="search-results" className="border border-black p-4 rounded-lg w-full h-64 overflow-scroll">

            <ul>
              {allDogs &&
                Object.keys(allDogs).map((dog, index) => {
                  return <li key={index}>{dog.charAt(0).toUpperCase() + dog.slice(1)}</li>
                })}
            </ul>
          </article>



          <article id="selected-items">


          </article>

        </section>


        <section id="gallery">

        </section>

      </main>

    </>
  );
}

export default App;
