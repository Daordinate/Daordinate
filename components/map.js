/* This example requires Tailwind CSS v2.0+ */
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import { useState } from 'react'
import { providers, Contract, utils} from 'ethers';
const snarkjs = require('snarkjs');
import { connect, getStarknet } from "get-starknet";



export const Map=() => {
    // const {isLoaded} = useLoadScript({
    //     googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w",
    // });

    const [isConnected, setIsConnected] = useState(false);


    const [minLat,setMinLat] = useState();
    const [maxLat,setMaxLat] = useState();
    const [minLong,setMinLong] = useState();
    const [maxLong,setMaxLong] = useState();
    const [currentLat,setCurrentLat] = useState();  
    const [currentLong,setCurrentLong] = useState();  
    const [mainProof ,setMainProof] = useState();
    const [mainPublicSignals,setMainPublicSignals] = useState();


    async function connectWallet() {
        try {
            const wallet = await connect({
                include: ["braavos"],
            });
            if (wallet) {
                await wallet.enable({ showModal: true });
                setIsConnected(!!wallet?.isConnected);
            }
            const wallet2 = getStarknet();

            const address = wallet2.account.address;
            console.log(address);
        } catch {
            console.log("Connect Wallet")
        }
    }
    
    
    

    
      
      
    async function getFileBuffer(filename) {
        let req = await fetch(filename);
        return Buffer.from(await req.arrayBuffer());
    }

    async function generateProof(state, setState) {

        // Load files and run proof locally
        let DOMAIN = "http://localhost:3000";
        let wasmBuff = await getFileBuffer(`${DOMAIN}/inRange.wasm`);
        let zkeyBuff = await getFileBuffer(`${DOMAIN}/inRange.zkey`);
      
        let input = {
            "latitudeRange": [ minLat, maxLat],
            "longitudeRange": [ minLong, maxLong],
            "currentLocation": [ currentLat, currentLong]
        }
        console.log(input)
      
        try {
      
          let {proof, publicSignals} = await snarkjs.plonk.fullProve(input, wasmBuff, zkeyBuff);
          
          setMainProof(proof);
          setMainPublicSignals(publicSignals);
          console.log(mainProof);
          console.log(mainPublicSignals);
      
        //   setState({...state, proof:proof, publicSignals:publicSignals})
      
        } catch (error) {
          alert("Proof generation Failed: " + error)
        } 
      }


    async function verifyProof(state , setState ) {

        let vkey = await fetch (`http://localhost:3000/inRange_verification_key.json`).then(res => res.json());
      
        const verified = await snarkjs.plonk.verify(vkey, mainPublicSignals, mainProof);
      
        console.log(verified)
      
      }
      


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
            console.log(loc)

        }

        const onError =()=>{
            console.log("Could not get Location")
        }

        navigator.geolocation.getCurrentPosition(onSuccess,onError)
   
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
    <div className="flex">
         <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Min Latitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Min Latitude"
            onChange={(e) => setMinLat(e.target.value)}
            />
        </div>
      </div>

      <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Max Latitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Max Latitude"
            onChange={(e) => setMaxLat(e.target.value)}
            />
        </div>
      </div>
    </div>
    <div className="flex">
         <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Min Longitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Min Longitude"
            onChange={(e) => setMinLong(e.target.value)}
            />
        </div>
      </div>

      <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Max Longitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Max Longitude"
            onChange={(e) => setMaxLong(e.target.value)}
            />
        </div>
      </div>
    </div>
    <div className="flex">
         <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Current Latitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Current Latitude"
            onChange={(e) => setCurrentLat(e.target.value)}

            />
        </div>
      </div>

      <div>
      <label className="ml-10 mt-10 block font-medium text-gray-700">
        Current Latitude
      </label>
        <div className="ml-10 mt-1 relative">
            <input
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 border-indigo-500"
            placeholder="Min Latitude"
            onChange={(e) => setCurrentLong(e.target.value)}
            />
        </div>
      </div>
    </div>
     

  




      <button
            type="button"
            className="ml-10 mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={generateProof}
        >
        Generate Proof
      </button>
      <button
            type="button"
            className="ml-10 mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={verifyProof}
        >
        Verify Proof
      </button>     
      
    </>
  )
}

