import {   useAccount, useConnect , useDisconnect, useNetwork, useSwitchNetwork, useBalance} from 'wagmi'
import { Dialog, Transition , Menu} from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { ethers, utils } from 'ethers';
import { useIsMounted} from '../hooks/useIsMounted'
const Navbar = () => {

    const changeChainToName =(chainToChange)=> {
        if (chainToChange === null) return '';
        return chainToChange;
    }

   
    const { error: chainError, isLoading: isswitchLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
    const { address, connector, isConnected } = useAccount()
    let [isOpen, setIsOpen] = useState(false)
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const { chain, chains } = useNetwork()

    const { disconnect } = useDisconnect()
    function closeModal() {
        console.log('close modal')
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

      const truncateAddress = (oxAddress) => {
        // This help solves the null error
        if (oxAddress == null) return '';
        return oxAddress.slice(0, 6) + "..." + oxAddress.slice(-5);
      };

      const isMounted = useIsMounted()

    

    return(
       
        <>
         {isMounted && 
        <div>
        <div className="bg-gray-900">
        <header>
                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 flex sm:space-x-6 justify-between">
                <a  className="flex items-center pr-2" aria-current="page">
                    <img className="h-10" src="logo.svg" />
                </a>
                    <ul className="hidden py-4 items-center md:flex space-x-3 sm:space-x-6 sm:justify-end">
                    <Link href="/">
                                <li className="text-gray-200 cursor-pointer" >
                                    HOME
                                </li>
                                </Link>
                                <Link href="/mint">
                                <li className="text-gray-200 cursor-pointer" >
                                    MINT
                                </li>
                                </Link>
                                <Link href="/vesting">
                                <li className="text-gray-200 cursor-pointer" >
                                    STAKE
                                </li>
                                </Link>
                                <li className="text-gray-200" >
                                    <a >Telegram</a>
                                </li>
                                <li className="text-gray-200" >
                                    <a >BLOG</a>
                                </li>
                                <li className="text-gray-200" >
                                    <a >Telegram</a>
                                </li>
                    </ul>
                    <button 
                className='p-3 bg-[#24ff00]'
                onClick={openModal}>
                    {address? 'Account' : 'Connect'}
                </button>
                </nav>

                <div className='flex md:hidden justify-evenly items-center pt-4 px-4'>
                    <Link href="/">
                    <p className='p-2 hover:bg-white hover:text-black active:bg-white active:text-black'>HOME</p>
                    </Link>
               <Link href="/mint">
               <p className='p-2 hover:bg-white hover:text-black active:bg-white active:text-black'>MINT</p>
               </Link>
                <Link href="vesting">
                <p className='p-2 hover:bg-white hover:text-black active:bg-white active:text-black'>STAKE</p>
                </Link>
                </div>
        
            </header>
        </div>




        <Transition appear show={isOpen} as={Fragment}> 
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto py-8"
        //   design the modal full body here
          onClose={closeModal}
        >
                 <div className="flex items-center min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-700 rounded-md shadow-lg">
                        <div className="mt-3">
                            <Dialog.Title>
                            <div className="flex items-center justify-between h-12 mx-auto px-3">
                                <p className='text-xl font-bold'>CHASE FINTOKEN</p>
                               <img src='/logo.svg' className='h-10 w-10' />
                            </div>
                            </Dialog.Title>
                            <div className="mt-2 text-center flex flex-col">
                            {isConnected ?
 (
      <div>
        {!switchNetwork &&
        <div className='flex justify-center items-center'>
            <p className='pr-2'>Click to switch:</p>{" "}
        {chains.map((x) => (
        <button
        className='bg-red-500 py-2 px-2  rounded-sm mt-4 mb-2'
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isswitchLoading && pendingChainId === x.id && ' switching'}
        </button>
      ))}
      </div>
      }
{/* <p> Balance: {data?.formatted} {data?.symbol}</p> */}
      <div className='text-center'>{chainError && chainError.message}</div>
        <div className='pb-6'>
            User Connected address: {" "}
            {
            truncateAddress(address)
        }</div>
        <div className='pb-6'>Connected to {connector?.name} wallet</div>
        {chain && <div className='pb-6'>Connected on {chain?.name} smart chain</div>}
        <div className='flex justify-between'>
        <button
        className='bg-[#24ff00] py-2 px-2  rounded-sm mt-4 mb-2'
        onClick={disconnect}>Disconnect</button>

        <button
        className='bg-red-500 py-2 px-2  rounded-sm mt-4 mb-2'
        onClick={closeModal}>Close</button>
        </div>
      </div>
    )
    :
    (
        <div className='grid grid-cols-2 grid-rows-2 gap-6'>
                            {connectors.map((connector) => (
        <button
        className='px-7 py-3 w-full bg-indigo-700 text-center rounded-md shadow-md block sm:w-auto'
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' Unsupported network'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            'connecting...'}
        </button>
         ))}
         </div>
         )
  }

  

                            </div>
                        </div>
            {!isConnected && 
                        <div className='flex items-center justify-between'>
                            <a 
                            target="_blank" rel="noopener noreferrer" 
                            href='https://metamask.io/'>
                        <div className="flex space-x-1 items-center py-4">
                            <p className='text-yellow-600'>Get metamask</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
</svg>
                        </div>
                        </a>
        
                        <button
        className='bg-red-500 py-2 px-2  rounded-sm mt-4 mb-2'
        onClick={closeModal}>Close</button>
                        </div>
                        }
                        </div>

            </Transition.Child>
            </div>

        </Dialog>
        </Transition>
        </div>
    }
        </>
  
    )
}

export default Navbar