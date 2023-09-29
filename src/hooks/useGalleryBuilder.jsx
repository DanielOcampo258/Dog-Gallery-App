import { useEffect, useState } from 'react'

const useGalleryBuilder = (dogs, amountOfPictures) => {

    const [galleryObjects, setGalleryObjects] = useState([])
    const [builtSuccesfully, setBuildStatus] = useState(true);


    useEffect(() => {

        const makeApiDogCalls = async (dog) => {


            try {
                const response = await fetch(`https://dog.ceo/api/breed/${dog.toLowerCase()}/images/random/${amountOfPictures}`);
                if (response.ok) {

                    const data = await response.json();

                    await setGalleryObjects((prev) => {
                        return [...prev, { "name": dog, "imgUrl": data.message }]
                    })

                }

            } catch (err) {
                setBuildStatus(false);
            }

        }


        if(dogs)
            dogs.forEach((dog) => makeApiDogCalls(dog))
        else
            setGalleryObjects([])

    }, [dogs, amountOfPictures])




    return {
        galleryObjects,
        builtSuccesfully
    };


}

export default useGalleryBuilder