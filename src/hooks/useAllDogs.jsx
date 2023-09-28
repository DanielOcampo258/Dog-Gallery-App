import { useEffect, useState } from 'react'

const useAllDogs = () => {
    const [allDogs, setAllDogs] = useState([]);
    const GET_ALL_BREEDS_URL = "https://dog.ceo/api/breeds/list/all"
    
    useEffect(() => {
        const getAllDogs = async () => {
            fetch(GET_ALL_BREEDS_URL)
                .then((response) => response.json())
                .then((data) => {
                    setAllDogs(data.message);
                    
                })
                .catch((err) => {

                })
        }

        getAllDogs();
    }, [])

   
    
    return allDogs;
}

export default useAllDogs