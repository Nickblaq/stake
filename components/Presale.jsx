import { Tab } from '@headlessui/react'
import {useState, useEffect} from 'react'
import {ethers, Contract, utils, BigNumber} from 'ethers'
import {useAccount, useSigner, useProvider} from 'wagmi'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify';
import sale from '../abi/Presale.json'

const IdoAddress = '0x00869E47ab36e5F2672D89080bBF823Fa46fD575'
let texx
const Presale = () => {


    const { asPath } = useRouter();
    let [isOpen, setIsOpen] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [isBuyLoading, setBuyLoading] = useState(false);
    const [isClaimLoading, setClaimLoading] = useState(false);
    const [isAmount, setAmount] = useState(0);
    const [isReferralCount, setReferralCount] = useState(0)
    const [isReferralReward, setReferralReward] = useState(0)
    const [isContribution, setContribution] = useState(0)
    const [isRate, setRate] = useState(0)
const [isMessage, setMessage] = useState('')
const [isTx, setTx] = useState('');
const [isClaimTx, setClaimTx] = useState('');
const [isCondition, setCondition] = useState('');
    const {address} = useAccount()
      const { data: signer } = useSigner()

      const init = async () => {
        try {
            if (address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const chain = await provider.getNetwork()
        // console.log('this is chain', chain.chainId)
        const contract = await new Contract(IdoAddress, sale.abi, provider);
        console.log(contract)
        const refReward = await contract.referralRewards(address)
        const refCount = await contract.referralCount(address)
        const buyRate = await contract.rateOfTokensToGivePerEth()
        const contribute = await contract.contributions()

        setReferralReward( ethers.BigNumber.from(refReward).toNumber())
        setReferralCount( ethers.BigNumber.from(refCount).toNumber())
        setRate( ethers.BigNumber.from(buyRate).toNumber())
        setContribution(utils.formatEther(contribute))
    }
        } catch (error) {
            console.log('this is load presale read error', error)
        }
    }

    useEffect(() => {
        let count = 0
        if(address || count <= 0) {
            count = count + 1
            init()
        }
    },[address])



    
    // useEffect(()=>{

    //     try {
    //         const hash = asPath.split('#/')[1];
    //         setReferralAddress(hash)
    //         // console.log(hash)
    //     } catch (error) {
    //         // console.log('hash error', error)
    //     }
       
    //    }, [ asPath ]);

    const [copyAddress, setCopyAddress] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const add = address === undefined ?  'no ref' : address 
    texx = `https://chasefintoken.sale/#/${add}`
    // texx = `https://fumesminer/#/${add}`

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }


       // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(texx)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const truncateAddress = (oxAddress) => {
    // This help solves the null error
    if (oxAddress == null) return '';
    return oxAddress.slice(0, 6) + "..." + oxAddress.slice(-5);
  };

    async function buy () {
        // if(!provider.getSigner(account)) return null
        try {
            setBuyLoading(true)
            let referralAddress =  await asPath.split('#/')[1];
            if (!referralAddress || referralAddress.length !== 42) {
                referralAddress = '0x0000000000000000000000000000000000000000'
            }
            if (isAmount < 0.01 ) {
                setMessage('Amount lower than minimum, minimum 0.6')
            }
            if (referralAddress === address) {
                setMessage("You're referring self? No referral rewards for you")
              }

            let amount = ethers.utils.parseEther(isAmount.toString());
            let contract = await new Contract(IdoAddress, sale.abi, signer)
      
            let response = await contract.buy(referralAddress.toString(),{value: amount});
            let hash = response.hash
            setBuyLoading(false)
            setTx(hash)
            toast.success('Transaction succesful. Check bscscan')
        } 
        catch (error) {
            
            toast.error(error)
            setBuyLoading(false)
        }
    }


    async function claim () {
        try {
            setClaimLoading(true)
            const contract = await new Contract(IdoAddress, sale.abi, signer);
            let response = await contract.withdrawEarnings();
            let hash = response.hash
            setClaimLoading(false)
            setClaimTx(hash)
            toast.success('Transaction sucessful. Check wallet')

        } catch (error) {
           
            setClaimLoading(false)
            toast.error('Transaction Fail. Talk to support ')
        }
    }

    function calcaPercent() {
        const percentCalculation = (isAmount * 10000).toFixed(2);
        return percentCalculation;
      }
      const estimatedValue = calcaPercent();
    return (
        <>
        <div className="mt-20 flex md:h-screen justify-center items-center font-serif">
            <div className="w-full md:max-w-2xl h-3/5 p-4">
            {!isCopied ?
                (
            <div
            onClick={handleCopyClick}
            className="flex justify-end pb-2 space-x-1 text-[#24ff00] text-sm items-center">
           
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
</svg> 
 <p>INVITE A FRIEND</p>
 </div>
 )
:
(
    <div
            className="flex justify-end pb-2 space-x-1 text-[#24ff00] text-sm items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
</svg>
 <p>COPIED</p>
 </div>
)
}
                   
               
            <div className=" border border-solid border-gray-600">
                <Tab.Group>
                {/* <Tab.List>
            <div className="flex items-center  border border-black">
               
            <Tab>
            <div className=" text-center py-4 border-r w-6/12 border-black">MINT</div>
            </Tab>
            <Tab>
            <div className="w-6/12 text-center py-4 border-l border-black">REDEEM</div>
            </Tab>
           
            </div>
            </Tab.List> */}
            <Tab.List className="flex items-center  border border-gray-200">
                    <Tab className={({selected}) => selected? "text-center py-4 border-r w-6/12 border-gray-200 text-[#ebff00]"
                    :
                    "text-center py-4 border-r w-6/12 border-gray-200 text-[#ebff00] bg-opacity-25"
                    }>MINT</Tab>
                    <Tab  className={({selected}) => selected? "text-center py-4 border-r w-6/12 border-gray-200 text-[#ff00f5]"
                    :
                    "text-center py-4 border-r w-6/12  border-gray-200 text-[#ff00f5] bg-opacity-25"
                    }>CLAIM</Tab>
                </Tab.List>
          
            <Tab.Panels>
               
                
    <div className="w-full h-full relative pt-6 m-auto rounded-md shadow-md">
    <Tab.Panel>
        <div className='px-6'>
        <form className="mt-6">
        <label className="block text-sm pb-4 font-serif">AMOUNT</label>
        <div className="flex items-center p-2 border rounded-md">
                       <img src='/bnb.svg' className='h-8 w-8' />
                        <input
                            type="text"
                            placeholder="amount"
                            value={isAmount} onChange={(e) =>setAmount(e.target.value)}
                            className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                        />
                        <p className="font-normal">BNB</p>
                    </div>

            {/* <div class="mt-4">
            <label class="block text-sm pb-2">TO</label>
        <div className="flex items-center p-2 border rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <input
                            type="email"
                            placeholder="amount"
                            id="email"
                            className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                        />
                        <p className="font-normal">BNB</p>
                    </div>
            </div> */}

        
        </form>
       

        
        <div className="flex items-center justify-between mt-4">
            <p>PRICE</p>
            <p>10000 CHASE PER BNB</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-8">
            <p>MINIMUM RECEIVED</p>
            <p>{estimatedValue ? estimatedValue : 'N/A'}</p>
        </div>
        </div>

        {isTx &&
                            <div className='my-3 flex justify-center items-center'>
                                <a 
                                    target="_blank" rel="noopener noreferrer" 
                                href={`https://bscscan.com/tx/${isTx}`}
                                >
                                <p className='text-blue-800 underline text-lg font-medium'>View Explorer {truncateAddress(isTx)}
                                </p>
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </div>
                            }

        {address &&
        <button onClick={buy} type="button"
        disabled={isBuyLoading}
        className="w-full py-6  mt-6 text-[#24ff00] font-medium  text-lg transition-colors duration-200 transform  focus:outline-none border border-gray-700">
        {isBuyLoading ? 'LOADING...' : 'BUY'}
    </button> 
        }
        {!address &&
        <button type="button"
        className="w-full py-6  mt-6 text-[#24ff00] font-medium  text-lg transition-colors duration-200 transform  focus:outline-none border border-gray-700">
       CONNECT WALLET
    </button> 
        }
          
        </Tab.Panel>

        <Tab.Panel>
        <div className='px-6'>
    <div className='bg-yellow-900 py-6 px-3 rounded-lg font-serif'>
      <p>Claim assets anytime. Referral rewards reflect here if referral link is used.</p>
      </div>
    <div className="flex items-center justify-between mt-4">
            <p>PRICE</p>
            <p>10000 CHASE PER BNB</p>
        </div>
    <div className="flex items-center justify-between mt-4">
            <p>REFERRAL COUNT</p>
            <p>{isReferralCount}</p>
        </div>
    <div className="flex items-center justify-between mt-4 mb-6">
            <p> TOKEN REWARDS</p>
            <p>{isReferralReward}</p>
        </div>
        </div>

        {isClaimTx &&
                            <div className='my-3 flex justify-center items-center'>
                                <a 
                                    target="_blank" rel="noopener noreferrer" 
                                href={`https://bscscan.com/tx/${isClaimTx}`}
                                >
                                <p className='text-blue-800 underline text-lg font-medium'>View Explorer {truncateAddress(isClaimTx)}
                                </p>
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </div>
                           }

        {address &&
         <button  type="button"
         disabled={isClaimLoading}
         onClick={claim}
         className="w-full py-6  mt-6 text-[#24ff00] font-medium text-lg transition-colors duration-200 transform  focus:outline-none border border-gray-700">
         {isClaimLoading ? 'LOADING...' : 'CLAIM'}
     </button> 
        }

        {!address && 
         <button  type="button"
         className="w-full py-6  mt-6 text-[#24ff00] font-medium text-lg transition-colors duration-200 transform  focus:outline-none border border-gray-700">
         CONNECT WALLET
     </button> 
        }
         
    </Tab.Panel>
    </div>
    </Tab.Panels>

    </Tab.Group>
            </div>
            </div>
        </div>
        </>
    )
}

export default Presale