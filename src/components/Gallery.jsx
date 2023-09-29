import React, { useEffect, useState } from 'react'

const Gallery = ({ dogs, amountOfPictures }) => {

    const [gallery, setGallery] = useState([])
    const [builtSuccesfully, setBuildStatus] = useState(null);

    useEffect(() => {
        

        const makeApiDogCalls = async (dog) => {


            try {
                const response = await fetch(`https://dog.ceo/api/breed/${dog.apiPath}/images/random/${amountOfPictures}`);
                if (response.ok) {

                    const data = await response.json();

                    await setGallery((prev) => {
                        return [...prev, { "name": dog.searchAbleName, "imgUrl": data.message }]
                    })

                }

            } catch (err) {
                setBuildStatus(false);
            }

        }

        setGallery([])
        if (dogs.length > 0) {
            dogs.forEach((dog) => makeApiDogCalls(dog))
        }

        if(builtSuccesfully === null)
            setBuildStatus(true);




    }, [dogs, amountOfPictures, builtSuccesfully])

    return (
        <>
            {(builtSuccesfully && gallery.length > 0) &&
                <section id="gallery" className="text-center font-medium">
                    <h6>Welcome to your gallery!</h6>

                    <div className="mx-auto items-center justify-items-center w-full h-auto grid gap-8 grid-cols-2 md:grid-cols-3">
                        {gallery.map((galleryObject, index) => {

                            return (amountOfPictures === 1
                                ? <img key={index} className="object-cover rounded-lg w-48 h-48" src={galleryObject.imgUrl} alt={galleryObject.name}></img>
                                : galleryObject.imgUrl.map((images, innerIndex) => <img className="object-cover rounded-lg w-48 h-48" key={innerIndex} src={images} alt={galleryObject.name}></img>)
                            )
                        })}

                    </div>
                </section>
            }
        </>


    )
}

export default Gallery