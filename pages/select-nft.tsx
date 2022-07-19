import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import {useRouter} from "next/router"
import {useState, useEffect} from "react"
import { connect, getStarknet } from "get-starknet";
import Link from 'next/link'

const navigation = [
  { name: 'NFT', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Tokens', href: '#', icon: KeyIcon, current: false },
  { name: 'Dao Membership', href: '#', icon: UserGroupIcon, current: false },
]

function classNames(...classes :any) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectNfts() {

    const [nft1,setNft1] = useState()
    const router = useRouter();

    const {
      query:{
        minLat,
        maxLat,
        minLong,
        maxLong,
        currentLat,
        currentLong
    }
    } = router;
  
    const props ={
      minLat,
      maxLat,
      minLong,
      maxLong,
      currentLat,
      currentLong
    }
  
    function showData(){
      console.log(props)
      console.log("Min Lat")
      console.log(minLat)
      console.log("Max Lat")
      console.log(maxLat)
  
    }

    async function checkConnection(){
      try {
        // const wallet = await connect({
        //     include: ["braavos"],
        // });
       
        const wallet2 = getStarknet();

        const address = wallet2.account.address;
        console.log(address);
    } catch {
        console.log("Connect Wallet")
    }
    }
    useEffect(() => {
      checkConnection();
        
    },[])
  return (
    <div className="lg:grid lg:grid-cols-12 pl-60 pr-60">
      <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-indigo-500 group-hover:text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        
     
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">NFT Groups</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select NFTs group's you would like to share your proof of location.
                </p>
              </div>

              <fieldset>
                <legend className="text-base font-medium text-gray-900">Owned NFTs</legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="h-5 flex items-center">
                      <input
                        type="checkbox"
                        value="NFT 1"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        onChange={(e)=> console.log(e.target.value)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        Encode StarkWare Paris 2022
                      </label>
                      <p className="text-gray-500">Share your Proof of Location with ESP22 Holders</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          onChange={(e)=> console.log(e.target.value)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="font-medium text-gray-700">
                          Encode ZK Bootcamp 2022
                        </label>
                        <p className="text-gray-500">Share your Proof of Location with EZKB22 Holders</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          value="NFT 3"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          onChange={(e)=> console.log(e.target.value)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="offers" className="font-medium text-gray-700">
                          StarkCC 2022
                        </label>
                        <p className="text-gray-500">Share your Proof of Location with STRKCC22 Holders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
             
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Link href="/location-list">
              <button
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={showData}
              >
                Share Location Proofs
              </button>
              </Link>
            </div>
          </div>
   
      </div>
    </div>
  )
}



