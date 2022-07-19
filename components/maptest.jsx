import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {useState} from 'react'
const snarkjs = require('snarkjs');
import { connect, getStarknet } from "get-starknet";
import Link from 'next/link'
import MapComponent from './maptest.jsx';

const statsLat = [
  { name: 'Min Longitude', stat: 100},
  { name: 'Max Longitude', stat: 150 },
]

const statsLong = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
]

const statsCurrent = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
]

const containerStyle = {
  width: '1100px',
  height: '700px'
};

var center = {
  lat: 48.85,
  lng: 2.35
};


function MyComponent() {

  const [isConnected, setIsConnected] = useState();


  const [minLat,setMinLat] = useState(100);
  const [maxLat,setMaxLat] = useState(150);
  const [minLong,setMinLong] = useState(100);
  const [maxLong,setMaxLong] = useState(150);
  const [currentLat,setCurrentLat] = useState(120);  
  const [currentLong,setCurrentLong] = useState(140);  
  const [mainProof ,setMainProof] = useState();
  const [mainPublicSignals,setMainPublicSignals] = useState();
  const [isVerified,setIsVerified] = useState(false);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const NFT_1 = [
    
    {
      id: 1,
      timestamp: "20220719022435",
      position: { lat: 48.84, lng:2.35 }
    },
    {
      id: 2,
      timestamp: "20220719022435",
      position: { lat: 48.85, lng: 2.33 }
    },
    {
      id: 3,
      timestamp: "20220719022435",
      position: { lat: 48.8427, lng: 2.345 }
    },
    {
      id: 4,
      timestamp: "20220719022435",
      position: { lat: 48.8531, lng: 2.34 }
    }
    
  ];
  
  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



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

  function getLatTarget(){
    const onSuccess = (loc) => {
        setMinLat(loc-10)
        setMaxLat(loc+10)
        console.log("Target")
        console.log(minLat)
        console.log(maxLat)
        console.log(loc)
    }

    const onError =()=>{
        console.log("Could not get Location")
    }
  }

  return (
  <div className="flex justify-evenly mt-5">

    {isLoaded ? (
      <GoogleMap
      onLoad={onLoad}
      onUnmount={onUnmount}
        onClick={ev => {
          console.log("latitide = ", ev.latLng.lat());
          console.log("longitude = ", ev.latLng.lng());
          () => setActiveMarker(null)
          getLatTarget}}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {NFT_1.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    ):<></>}
  <div>
      <h3 className="text-lg font-medium text-gray-900 text-center mt-5">Latitude Range</h3>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2">
       
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Min Latitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">100</dd>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Max Latitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">150</dd>
          </div>
   
      </dl>
      <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-5">Longitude Range</h3>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2">
      
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Min Longitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">100</dd>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Max Longitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">150</dd>
          </div>
     
      </dl>
      <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-5">Current Location</h3>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2">
     
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Current Latitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">100</dd>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate text-center">Current Latitude</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">150</dd>
          </div>
      
      </dl>
      <button
            type="button"
            className="w-full mt-5 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={getLocation}
        >
        Get Location
      </button>
      <div className="mt-5 grid grid-cols-2 gap-1 sm:grid-cols-2">
        <button
              type="button"
              className="w-full text-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={generateProof}
          >
          Generate Proof
        </button>
        <button
              type="button"
              className="w-full text-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={verifyProof}
          >
          Verify Proof
        </button>
      </div>
  </div>

  
 


  </div>)
}

export default React.memo(MyComponent)
