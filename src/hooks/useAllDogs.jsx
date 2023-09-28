import { useEffect, useState } from 'react'

const useAllDogs = () => {
    const [allDogs, setAllDogs] = useState([]);
    const GET_ALL_BREEDS_URL = "https://dog.ceo/api/breeds/list/all"

    useEffect(() => {
        const getAllDogs = async () => {
            fetch(GET_ALL_BREEDS_URL, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setAllDogs(formatDogNames(data.message))

                })
                .catch((err) => {

                })
        }

        getAllDogs();
    }, [])

    const formatDogNames = (rawData) => {

        return Object.keys(rawData).reduce((accum, dog) => {
            if (rawData[dog].length > 1) {
                return accum.concat(rawData[dog].map((sub) => {
                    return sub === "shepherd" ? dog + " " + sub : sub + " " + dog
                }
                ))
            } else {
                return accum.concat(dog)
            }

        }, [])
    }



    return allDogs;
}


export default useAllDogs