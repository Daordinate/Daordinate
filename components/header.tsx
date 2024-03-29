/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { connect, getStarknet } from "get-starknet";
import {useState ,useEffect} from 'react';
// import myLogo from './images/logo.png'
import {nftData} from "./data/nftData"





const navigation = [
  { name: 'Proof of Location Flow', href: '#', current: true },
  
]

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export const AppHeader=() => {

  const addressNftData = nftData;

  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress,setWalletAddress] =useState<any>();


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
        console.log(addressNftData);
        setWalletAddress(address);
    } catch {
        console.log("Connect Wallet")
    }

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    fetch('https://api-testnet.aspect.co/api/v0/assets?owner_address=0x459be245cab626bc30c064a15586b2c06a3ab981a1ddf2e2cd9463e57ba9c8d', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      
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
    <>
      
      <div className="min-h-full pt-5">
        <Disclosure as="nav" className="bg-white border-b border-gray-200 pb-5">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      {/* <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      /> */}
                      {/* <img
                        className="hidden lg:block h-8 w-auto"
                        src="./images/logo.png"
                      /> */}
                      <h3 className="font-bold text-xl">Daordinate</h3>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  { walletAddress ? <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={connectWallet}
                    >
                    Connected
                    </button> :
                    <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={connectWallet}
                    >
                    Connect Wallet
                    </button>

                  }
                  

                    {/* Profile dropdown */}
                  
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                   
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                 
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    
                    
                   
                 
                  </div>
                  <div className="mt-3 space-y-1">
               
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

      </div>
    </>
  )
}
