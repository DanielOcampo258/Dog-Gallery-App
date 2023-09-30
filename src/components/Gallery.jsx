import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';

const Gallery = ({ dogs, amountOfPictures }) => {

    const [gallery, setGallery] = useState([]);
    const [hasError, setErrorStatus] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
       if(gallery.length > 0)
        setLoading(false)
       else
        setLoading(true)

    }, [gallery])


    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal


        const makeApiDogCalls = async (dog) => {


            try {
                return (fetch(`https://dog.ceo/api/breed/${dog.apiPath}/images/random/${amountOfPictures}`, { signal })
                    .then((res) => res.json())
                    .then((data) => {
                        return { "name": dog.searchAbleName, "imgUrl": data.message }

                    }));

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setErrorStatus(true);
                    setGallery([])

                }
            }

        }
        if (dogs.length > 0) {
            setLoading(true);
            const apiCalls = dogs.map((dog) => makeApiDogCalls(dog));

            Promise.all((apiCalls))
                .then((results) => {
                    setLoading(false);
                    setGallery(results)
                    setErrorStatus(false)
                })
                .catch((err) => {
                    setErrorStatus(true)
                })

        } else {
            setLoading(false)
            setGallery([])
        }

        return () => {
            controller.abort()
         

        }


    }, [dogs, amountOfPictures, hasError])

    return (
        <>
            {(gallery.length > 0 || hasError) &&
                <>
                    {isLoading
                        ? <LoadingSpinner />
                        : <section id="gallery" className="text-center h-screen mx-auto mt-8 items-center justify-center font-medium w-10/12">
                            {hasError

                                ? <ErrorComponent text={'Oops, looks like we got an error trying to build your gallery'} />
                                : <h6 className='text-xl p-10 md:text-2xl'>Welcome to your gallery!</h6>

                            }

                            <div className={`mx-auto items-center justify-items-center w-full h-auto grid gap-5 ${(gallery.length === 1 && gallery[0].imgUrl.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}`}>
                                {gallery.map((galleryObject, index) => {

                                    return (amountOfPictures === 1
                                        ? <img key={index} className="object-contain rounded-lg h-48 w-96" src={galleryObject.imgUrl} alt={galleryObject.name}></img>
                                        : galleryObject.imgUrl.map((images, innerIndex) => <img className="object-contain  max-w-48 rounded-lg w-full h-48" key={innerIndex} src={images} alt={galleryObject.name}></img>)
                                    )
                                })}

                            </div>
                        </section>


                    }

                </>
            }

        </>

    )
}

export default Gallery