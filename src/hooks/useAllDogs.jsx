import { useEffect, useState } from 'react'

const useAllDogs = () => {
    const [allDogs, setAllDogs] = useState([]);
    const [hasError, setErrorStatus] = useState(null)
    const GET_ALL_BREEDS_URL = "https://dog.ceo/api/breeds/list/all"

    useEffect(() => {

        const capilizeName = (name) =>{
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        const formatApiData = (rawData) => {
            return Object.keys(rawData).reduce((accum, dogBreedKey) => {
                if (rawData[dogBreedKey].length === 0) {
                    return accum.concat({
                        "searchAbleName": capilizeName(dogBreedKey),
                        "apiPath": dogBreedKey
                    })
                } else {
                    return accum.concat(formatSubBreeds(dogBreedKey, rawData))
                }



            }, [])
        }

        const formatSubBreeds = (dogBreed, rawData) => {
            return rawData[dogBreed].reduce((subAccum, subBreed) => {
                return subAccum.concat([{
                    "searchAbleName": capilizeName(subBreed + " " + dogBreed),
                    "apiPath": dogBreed + "/" + subBreed
                }])
            }, [])
    
        }
    

        const getAllDogs = async () => {
            try {
                const response = await fetch(GET_ALL_BREEDS_URL, {
                    method: 'GET'
                });

                const data = await response.json()

                const allBreedsRawData = data.message

                setAllDogs(formatApiData(allBreedsRawData));
        
                setErrorStatus(false)


            } catch (err) {
                setErrorStatus(true)
            }

        }

        getAllDogs();
    }, [])



   
    
    


    return { allDogs, hasError };
}


export default useAllDogs