import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Tabs from "../../components/Tabs";

import StakingCounter from "../../components/StakingCounter";

import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  token_abi, 
  ebm_address,
  staking_address,
  staking_abi,       
} from "../../configs/Contracts";
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useSwitchChain, useAccount, useDisconnect } from "wagmi";

import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";


const Staking = (props) => {



  const chainId = process.env.REACT_APP_ENV == "production" ? polygon.id : polygonAmoy.id;

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();

  const { address, isConnecting ,isDisconnected} = useAccount()

  const [count, set_count] = useState(0);

  const notify = () => toast("Transaction Successfull!");

  const options = [{value:"0", title:"3 months", APR : "9%" }, {value:"1",title:"6 months", APR : "36%" }, {value:"2",title:"9 months", APR : "81%" }];


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const dropdownRef3 = useRef(null);



  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const dropdownRef4 = useRef(null);


  const options2 = ["0", "60", "2323"];
  const options3 = ["7.78", "44.23", "3.54"];
  const options4 = ["7.78", "44.23", "3.54"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleToggle3= () => {
    setIsOpen3(!isOpen3);
  };

  const handleToggle4= () => {
    setIsOpen4(!isOpen4);
  };


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOption2Click = (option) => {
    setSelectedOption2(option);
    setIsOpen2(false);
  };


  const handleOption3Click = (option) => {
    setSelectedOption3(option);
    setIsOpen3(false);
  };


  const handleOption4Click = (option) => {
    setSelectedOption4(option);
    setIsOpen4(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setIsOpen3(false);
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setIsOpen4(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })

  const [stakeAmount, setStakedAmount] = useState(0);

  async function stake1() {


    try {
        const tx = await writeContractAsync({
          abi: staking_abi,
          address: staking_address,
          functionName: "Stake", 
          args: [
            Convert_To_Wei(stakeAmount? Number(stakeAmount) : 0), selectedOption.value
          ],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}

async function unstake1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "unStake", 
        args: [
          Number(selectedOption3[3])
        ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


async function claim1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "withdrawReward", 
        // args: [
        //   Number(selectedOption4[3])
        // ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


useEffect(()=>{
  if(isConfirmed)
  {
    if(count==0)
    {
      // alert("ninkn")
      stake1()

    }
    if(count==1)
    {
      set_count(0)
      notify()
      setStakedAmount(0)
      props.test();
    }
  }


},[isConfirmed])

  async function SMT_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: ebm_address,
          args: [staking_address,Convert_To_Wei( stakeAmount ? Number(stakeAmount) : "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
    }
  }







  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  function Convert_To_Wei(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }



  async function stake()
  {
    
    if(props.is_suspend)
    {
      alert("Staking is Disable by the admin");
      return;
    }

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }

    if(Number(stakeAmount)<Number(props.min_stake)/10**18 )
    {
      alert("Minimum Stake amount is "+ Number(props.min_stake)/10**18);
      return;
    }


    if(Number(props.EBMBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }
    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await SMT_approval?.();
    } 
    else 
    {
      await SMT_approval?.();
    }

  }


  async function unstake()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await unstake1?.();
    } 
    else 
    {
      await unstake1?.();
    }
    

  }

  async function claim()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await claim1?.();
    } 
    else 
    {
      await claim1?.();
    }
    

  }



  const defaultTab = "Stake";

  const tabData = [
    {
      title: "Stake",
      content: (
        <>
          <div className="tw-border tw-border-[#456DA7] tw-rounded-md">
            <div className="tw-flex px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
              <img src={require("../../assets/images/c5.png")} />
              <p className="tw-m-0 tw-text-black tw-text-2xl tw-font-bold">
                Smaritan
              </p>
            </div>

            <div className="tw-flex p-4 tw-border-b tw-justify-between tw-items-center">
              <p className="tw-m-0 tw-text-black tw-font-semibold">ROI:</p>
              <p className="tw-m-0 tw-text-black">{selectedOption.APR} </p>
            </div>

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
                
                <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef}
                >
                   <p className="tw-font-medium tw-text-black">
                      Choose Lockup Time:
                    </p>

                  <button
                    onClick={handleToggle}
                    className="tw-border-[#456DA7] tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                      {selectedOption.title || "Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-white border  tw-text-black tw-shadow-lg tw-rounded-md tw-mt-2 tw-w-full">
                      {options.map((item,index) => (
                        <li
                        key={item}
                        onClick={() => handleOptionClick(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className="tw-font-medium tw-text-black">
                      Write Amount:
                    </p>
                    <p className="tw-text-black tw-text-sm">Balance : {props.EBMBalance>0?(Number(props.EBMBalance)/10**18).toFixed(2):0}  SMT</p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      // onClick={handleToggle2}
                      className="tw-border-[#2596EF] tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-black tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      {/* <p className="tw-m-0">
                        {selectedOption2 || "Select an option"}
                      </p> */}
                      <input className=" tw-w-full  tw-outline-none" 

                        min={0}
                        value={stakeAmount}
                        max={props.EBMBalance>0?(Number(props.EBMBalance)/10**18):0}
                        onChange={(e)=>setStakedAmount(e.target.value)}

                      />
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <p className="tw-text-sm tw-m-0">SMT</p>
                        <button className=" text-white tw-bg-button-gradient tw-py-1.5 tw-px-1 tw-text-sm tw-rounded-md"
                        onClick={(e)=>setStakedAmount(props.EBMBalance>0?(Number(props.EBMBalance)/10**18):0)}

                        >
                          Max
                        </button>
                      </div>
                    </button>
                    {isOpen2 && (
                      <ul className="tw-absolute tw-p-0 tw-bg-white border tw-text-black tw-shadow-lg tw-rounded-md tw-mt-2 tw-w-full">
                        {options2.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOption2Click(option)}
                            className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Button onClick={stake} label={"Stake"} className={"tw-w-full"} />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Unstake",
      content:(
        <>
        <div className="tw-border tw-border-[#456DA7] tw-rounded-md">
          <div className="tw-flex px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0 tw-text-black tw-text-2xl tw-font-bold">
              Smaritan
            </p>
          </div>

          <div className="tw-flex p-4  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-text-black tw-font-poppins tw-font-semibold">Penalty</p>
            <p className="tw-m-0  tw-font-zen-dots tw-text-balck">10%</p>
          </div>

          <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-black">Previous Investment</label>
           <div className=" tw-mt-2">
           <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef3}
                >
                  <button
                    onClick={handleToggle3}
                    className="tw-border-[#2596EF] tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                    {selectedOption3 ? Number(selectedOption3[0])/10**18:"Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen3 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-white tw-text-black tw-shadow-lg tw-rounded-md tw-mt-2 tw-w-full">
                    
                    {props.allInvestments?(

                      props.allInvestments.map((item,index) => (
                        <li
                        onClick={() => {
                          handleOption3Click(item);
                          // setSelectedAmount(item);
                          // set_choosed_Unstake_inv(Number(item[index][3]));
                        
                        }}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {Number(item[0])/10**18}
                        </li>
                      ))
                      ):(null)}

                    </ul>
                  
                  )}
                </div>
           </div>
           <StakingCounter time={selectedOption3 ? Number(selectedOption3[1]):0}/>


             </div>
            <div>
              <Button onClick={unstake} label={"Unstake"} className={"tw-w-full"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
    {
      title: "Reward",
      content:(
        <>
        <div className="tw-border tw-border-[#456DA7] tw-rounded-md">
          <div className="tw-flex tw-mb-4 px-4 tw-py-2 tw-border-b tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0 tw-text-black tw-text-2xl tw-font-bold">
            Smaritan
            </p>
          </div>

          <div className="tw-flex px-4   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">Total Earning</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">{props.totalEarning? (Number(props.totalEarning)/10**18).toFixed(2) + (Number(props.totalwithdraw)/10**18).toFixed(2):0}</p>
          </div>


          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">Total Withdraw</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">{props.totalwithdraw? (Number(props.totalwithdraw)/10**18).toFixed(2):0}</p>
          </div>

          <div className="tw-flex-col  tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-black">Investment History</label>
           <div className=" tw-mt-2">
           <div
                  className="tw-relative tw-w-full tw-inline-block"
                  ref={dropdownRef4}
                >
                  <button
                    onClick={handleToggle4}
                    className="tw-border-[#2596EF] tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-5 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0">
                    {selectedOption4 ? Number(selectedOption4[0])/10**18:"Select an option"}
                    </p>
                    <p className="tw-m-0">
                      <img
                        src={require("../../assets/images/bxs_up-arrow.png")}
                      />
                    </p>
                  </button>
                  {isOpen4 && (
                    <ul className="tw-absolute tw-bg-white tw-p-0 tw-z-30 tw-bg- tw-text-[black] black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                                           {props.allInvestments_reward?(
                      props.allInvestments_reward.map((item,index) => (
                        <li
                          key={index}
                          onClick={() => handleOption4Click(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {Number(item[0])/10**18}

                        </li>
                      ))
                     ):(null)}
                      

                    </ul>
                  )}
                </div>
           </div>
           <div className="tw-flex  tw-pt-7   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black"> Earned Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">{selectedOption4 ? (Number(selectedOption4[6])/10**18).toFixed(2):0}</p>
          </div>
          <div className="tw-flex   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">Pending Reward</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-black">{selectedOption4 ? (Number(selectedOption4[9])/10**18).toFixed(2):0}</p>
          </div>
           
             </div>
            <div>
              <Button onClick={claim} label={"Claim"} className={"tw-w-full"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
  ];

  return (
    <div className="tw-bg-center  tw-relative  tw-bg-cover tw-w-full tw-h-auto">
      <Header />

      <div className="container tw-py-24">
        <div className="row tw-items-center">
          <div className="col-lg-5 col-md-8 tw-mx-auto">
            <div className="mx-auto mt-8  mb-24">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />

    </div>
  );
};

export default Staking;
