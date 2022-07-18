/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'NFT', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Tokens', href: '#', icon: KeyIcon, current: false },
  { name: 'Dao Membership', href: '#', icon: UserGroupIcon, current: false },
]

function classNames(...classes :any) {
  return classes.filter(Boolean).join(' ')
}

export const  NftList=() => {
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
        
        <form action="#" method="POST">
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
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        NFT Group 1
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="font-medium text-gray-700">
                          NFT Group 2
                        </label>
                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="offers" className="font-medium text-gray-700">
                          NFT Group 3
                        </label>
                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
             
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
