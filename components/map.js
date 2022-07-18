/* This example requires Tailwind CSS v2.0+ */
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import { useState } from 'react'
import { providers, Contract, utils} from 'ethers';
const snarkjs = require('snarkjs');



export const Map=() => {
    // const {isLoaded} = useLoadScript({
    //     googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w",
    // });


    const [location,setLocation] = useState({
        lat:"",
        long:"",
    })

    function getLocation(){
        const onSuccess = (loc) => {
            setLocation({
                lat: loc.coords.latitude,
                long: loc.coords.longitude
            })
            console.log("Locations")
            console.log(location)

        }

        const onError =()=>{
            console.log("Could not get Location")
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
   
    }

    function generateProof(){
        console.log("Proof:10000")
    }

  return (
    <>
      <h1> Map</h1>
      <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={getLocation}
        >
        Get Location
      </button>
      <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={generateProof}
        >
        Generate Proof
      </button>


   
      <button>Generate Proof</button>
      
    </>
  )
}

