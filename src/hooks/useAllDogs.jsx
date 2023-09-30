import { useEffect, useState } from 'react'

const useAllDogs = () => {
    const [allDogs, setAllDogs] = useState([]);
    const [hasError, setErrorStatus] = useState(null)
    const GET_ALL_BREEDS_API_URL = "https://dog.ceo/api/breeds/list/all"

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal

        const capilizeNames = (names) => {
            return names.split(" ").reduce((accum, name) => {
                return accum + " " + name.charAt(0).toUpperCase() + name.slice(1);
            }, "").trim();
        }

        /**
         * This function formats api data by getting the creating an array of objects
         * where each object has a field "searchAbleName" (this is used to filter user search results)
         * and an "apiPath" name which will be useful when the user is creating their gallery with their selected dogs.
         * Notice we have a helper function formatSubBreeds as there are nested arrays of subreeds, this one collects and formats the subbreeds and these
         * get concated to the main allDogs data array
         * 
         * @param {*} rawData the unformatted data obtained from the API call
         * @returns Formatted object that will make it easier for user search and gallery building
         */
        const formatApiData = (rawData) => {
            return Object.keys(rawData).reduce((accum, dogBreedKey) => {
                if (rawData[dogBreedKey].length === 0) {
                    return accum.concat({
                        "searchAbleName": capilizeNames(dogBreedKey),
                        "apiPath": dogBreedKey
                    })
                } else {
                    return accum.concat(formatSubBreeds(dogBreedKey, rawData))
                }



            }, [])
        }

        /**
         * Function that iterates through a given parent breed's subbreed children and creates a formatted array of objects 
         * with its fields described in the above function.
         * 
         * @param {*} dogBreed the current parent breed that has children subbreeds that will be collected and formatted
         * @param {*} rawData the unformatted data obtained from the API call. Needed to grab the subbreed array
         * @returns 
         */
        const formatSubBreeds = (dogBreed, rawData) => {
            return rawData[dogBreed].reduce((subAccum, subBreed) => {
                return subAccum.concat([{
                    "searchAbleName": capilizeNames(subBreed + " " + dogBreed),
                    "apiPath": dogBreed + "/" + subBreed
                }])
            }, [])

        }


        const getAllDogs = async () => {

            try {

                const response = await fetch(GET_ALL_BREEDS_API_URL, {
                    method: 'GET',
                    signal

                });

                const data = await response.json()

                const allBreedsRawData = data.message

                setAllDogs(formatApiData(allBreedsRawData));

                setErrorStatus(false)


            } catch (err) {
                if (err.name !== 'AbortError')
                    setErrorStatus(true)
            }

        }
        getAllDogs();


        return () => {
            controller.abort()
        };
    }, [])


    return { allDogs, hasError };
}


export default useAllDogs