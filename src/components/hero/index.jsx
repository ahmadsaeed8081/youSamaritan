import React, { useEffect,useState } from "react";
import Button from "../Button";
import { FaAngleDown, FaArrowRight } from "react-icons/fa6";
import Header from "../header";
import Counter from "../Counter";
import VideoPlayer from "../videoPlayer";
import { FaAngleUp } from "react-icons/fa";
import { PiCopyLight } from "react-icons/pi";
import VideoSlider from "../videoSlider";

import Decimal from "decimal.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";

import Web3 from "web3";
import {
  usdt_address,

  token_abi,
  presale_address,
  presale_abi,
} from "../../configs/Contracts";

import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useSwitchChain, useAccount, useDisconnect } from "wagmi";

import { useSimulateContract, useWriteContract,useWaitForTransactionReceipt } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";


const Hero = (props) => {

  const chainId = process.env.REACT_APP_ENV == "production" ? polygon.id : polygonAmoy.id;
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");

  const [payAmount, set_payAmount] = useState(0);
  const [receiveAmount, set_receiveAmount] = useState(0);


  const location = useLocation();
  const params = new URLSearchParams(location.search);


  const { open, close } = useWeb3Modal()
  const [count, set_count] = useState(0);
  const { address, isConnecting ,isDisconnected} = useAccount()

  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(()=>{
    if(payAmount!="")
    {
      onPay(payAmount)
    }
  },[selectedCurrency,selectedButton])

  const notify = () => toast("Token Purchased Successfully!");

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);
  };


  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const getBorderColor = (currency) => {
    return selectedCurrency === currency
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-[#456DA7]";
  };


  const handleBSelect = (button) => {
    setSelectedButton(button);
  };

  const getBBorderColor = (button) => {
    return selectedButton === button
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-white";
  };

  const openPdfInNewTab = () => {
    const pdfUrl = require("../../assets/images/YouSamaritan White Paper v2.pdf");
    window.open(pdfUrl, "_blank");
  };

  const [openVideo, setOpenVideo] = useState(false);


  const [prog_percentage, set_prog_percentage] = useState(0);
  const [ref_add, set_ref] = useState("0x0000000000000000000000000000000000000000");

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract, data:hash, ...states } = useWriteContract();

  useEffect(() => {
  
    if(params.get("ref")!=null)
    {
      set_ref(params.get("ref"))

    }

    setpercantage();
    onPay(0);
  }, [props.curr_presale.endTime]);


  function setpercantage() {
    set_prog_percentage(
      (Number(props.curr_presale.total_sold) /
        10 ** 18 /
        (Number(props.curr_presale.supply) / 10 ** 18)) *
        100
    );
  }

   async function buytoken1() {
    try {
      alert(ref_add)
        const tx = await writeContractAsync({
          abi: presale_abi,
          address: presale_address,
          functionName: "buy_token", 
          args: [Convert_To_Wei(payAmount? Number(payAmount) : 0),ref_add, selectedCurrency=="MATIC" ? "0" : "1" ],
          value: selectedCurrency=="MATIC"? Convert_To_Wei(payAmount ? Number(payAmount) : "0") : 0,

        });

        set_count(1)

    } catch (err) 
    {
        console.error(err);
    }
}

  async function usdt_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: usdt_address,
          args: [presale_address, payAmount ? Number(payAmount) * 10 ** 6 : "0"],
          functionName: "approve",

        }); 

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

  function onPay(value) {
    if (value == "" || value == 0) {
      set_receiveAmount(0);
      // set_payAmount(0)

      return;
    }

    let price;
    if (selectedCurrency=="USDT" || selectedCurrency=="USDC") {
      price = Number(props.curr_presale.price) / 10 ** 18;
    } else {
      price = Number(props.perTokenIn_Matic) / 10 ** 18;
    }

    let dec_price = new Decimal(price);
    value = new Decimal(value);
    let temp = value.div(dec_price);

    set_receiveAmount(Number(temp).toFixed(2));
   
  }

  function onRecieve(value) {
    if (value == "" || value == 0) {
      set_payAmount(0);

      return;
    }
    let price;
    if (selectedCurrency=="USDT" || selectedCurrency=="USDC") {
      price = Number(props.curr_presale.price) / 10 ** 18;
    } else {    
      price = Number(props.perTokenIn_Matic) / 10 ** 18;
    }

    let dec_price = new Decimal(price);
    value = new Decimal(value);
    let temp = dec_price.times(value);

    set_payAmount(Number(temp).toFixed(2));
    
  }

  async function buy_token(choosed_option) {
    

    if (isDisconnected) {
      alert("Kindly connect your wallet");
      return;
    }
    if (payAmount == "" || payAmount == "0") {
      alert("Kidly write the amount");
      return;
    }

    if (selectedCurrency=="MATIC" ) 
    {

      if (Number(props.MATICBalance) < Number(Convert_To_Wei(payAmount))) {
        alert("You don't have enough Matic");
        return;
      }

      if (Number(props.minPurchase_matic)/10**18 > Number(payAmount)) {
        alert("Minimum purchase is "+ (Number(props.minPurchase_matic)/10**18).toFixed(1)  +" MATIC");
        return;
      }

      if (chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        await buytoken1?.();
      } 
      else 
      {
        await buytoken1?.();
      }
    } 
    else if(selectedCurrency=="USDT" )
    {
      if (Number(props.USDTBalance) < Number(payAmount) * 10 ** 6) {
        alert("You don't have enough USDT");
        return;
      }
      if (Number(props.min_purchase)/10**18 > Number(payAmount)) {
        alert("Minimum purchase is "+Number(props.min_purchase)/10**18  +" USDT");
        return;
      }
      if (chainId != currentChainId) {
        await switchChainAsync({ chainId });
        await usdt_approval?.();

      } else {
        await usdt_approval?.();
      }
    }

  }
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
    
    
  })

  useEffect(()=>{
    if(isConfirmed)
    {
      // alert(count)
      if(count==0)
      {
        // set_count(1)
        buytoken1()

      }
      if(count==1)
      {
        set_count(0)
        notify();
        set_payAmount(0)
        set_receiveAmount(0)
        props.test();



      }
    }


  },[isConfirmed])


  return (
    <div className="   tw-bg-cover tw-relative tw-bg-center tw-w-full tw-h-auto">
      <Header />
    

      <div className="container tw-relative tw-pt-6 tw-pb-28">
        <div className="row    g-5 tw-items-center">
          <div className="col-lg-6 col-md-12">
            <h1 className=" tw-text-[#456DA7]  tw-font-zen-dots  md:tw-text-5xl tw-text-3xl">
            
              How YouSamaritan’s Time has Come.
             
            </h1>
            <p className=" tw-text-black sm:tw-text-start tw-text-center  tw-font-normal tw-leading-7 tw-pt-4 tw-text-lg t">
            It's unlikely that anyone goes through life without facing any struggles, challenges or problems. Challenges are a natural part of the human experience, and they can vary widely in nature and intensity. People may encounter difficulties in their personal relationships, work, health, or other aspects of life.
            </p>
            <div className=" tw-flex tw-gap-7 sm:tw-justify-start tw-justify-center">
              <Button
                onClick={openPdfInNewTab}
                label={"White Paper"}
                className={"  tw-mt-7"}
                
              />
              {openVideo === true ?(
                 <button
                 onClick={() => setOpenVideo(false)}
                 
                 className={"  tw-bg-white tw-px-5  tw-gap-2 tw-rounded-md  tw-border-[#456DA7] tw-flex tw-items-center  tw-text-[#456DA7] tw-border tw-mt-7"}
                 
               >
 GET VIDEO <FaArrowRight color="#456DA7" />
               </button>
              ):(
                 <button
                onClick={() => setOpenVideo(true)}
                
                className={"  tw-bg-white tw-px-5  tw-gap-2 tw-rounded-md  tw-border-[#456DA7] tw-flex tw-items-center  tw-text-[#456DA7] tw-border tw-mt-7"}
                
              >
GET SAMARITAN <FaArrowRight color="#456DA7" />
              </button>
              )}
             
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            {openVideo === true ? (
              <div className="row tw-relative">
                <div className="col-md-10 tw-p-0 tw-mx-auto">
                  <div className="  tw-border-[#269FF0] tw-border-2 tw-rounded-2xl  sm:p-4  p-3 tw-h-auto tw-bg-cover bg-hero-cut">
                    <h1 className=" tw-text-lg tw-pb-3 tw-text-[#456DA7]">NEXT PRICE INCREASE IN</h1>
                    <Counter time={props.curr_presale.endTime ? Number(props.curr_presale.endTime) :  0}/>

                    <div className="  tw-text-center tw-py-4">
                      <p className="  tw-text-lg  tw-m-0 tw-text-black">
                        Total Raised: <sapn className=" tw-text-lg tw-font-semibold tw-text-[#456DA7]"> ${props.total_raised ? (Number(props.total_raised)/10**6).toFixed(2):0} </sapn>
                      </p>
                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0 sm:tw-text-base tw-text-[10px] tw-font-poppins tw-text-[#456DA7]">
                          Stage
                        </p>
                        <p className=" tw-m-0 sm:tw-text-base tw-text-[10px] tw-font-poppins tw-text-[#456DA7]">
                          Remaining
                        </p>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-black">
                        {Number(props.curr_stage) + 1}

                        </p>
                        <p className=" tw-m-0 text-xl  tw-font-poppins tw-text-black">
                        {props.curr_presale.supply? ((Number(props.curr_presale.supply) / 10 ** 18) - (Number(props.curr_presale.total_sold) / 10 ** 18)).toFixed(2): 0}

                        </p>
                      </div>

                      <div className="  tw-bg-gradient tw-rounded-lg border tw-overflow-hidden tw-my-2">
                        <div className="  tw-rounded-md tw-w-[80%] tw-bg-button-gradient tw-p-2"></div>
                      </div>

                      <div className=" tw-flex tw-justify-between tw-items-center">
                        <p className=" tw-m-0  sm:tw-text-base tw-text-[10px]  tw-font-poppins  tw-font-medium tw-text-black">
                        1 SMT = {props.curr_presale.price
                        ? Number(props.curr_presale.price) / 10 ** 18
                        : ""}                        </p>
                        <p className=" tw-m-0 sm:tw-text-base tw-text-[10px] tw-font-poppins  tw-font-medium  tw-text-black">
                        Next = {Number(props.NextStagePrice)
                          ? Number(props.NextStagePrice) / 10 ** 18
                          : ""}                       
                           </p>
                      </div>
                    </div>


                    <div className=" tw-border-2 tw-px-3 tw-py-1.5 tw-rounded-md tw-mb-2 tw-border-[#456DA7]">


                      <span className="tw-text-[#456DA7] sm:tw-text-base tw-text-[12px]  tw-flex tw-items-center tw-gap-2  m-0">REF LINK  
                      <CopyToClipboard
                        text={`https://samaritan1.vercel.app/?ref=${address? address:""}`}
                      >
                      <PiCopyLight  color="#456DA7" />
                        </CopyToClipboard>
                        </span>
                        <p className=" m-0 sm:tw-text-base tw-text-[10px] tw-text-[#456DA7]">https://samaritan1.vercel.app/?ref={address? address.slice(0,3)+"..."+address.slice(39,42):""}</p>

                    </div>

                    <div className="  tw-text-center tw-pb-4 tw-pt-0">
                      <p className=" tw-font-poppins sm:tw-text-base tw-text-[10px] tw-m-0 tw-text-black">
                      Your Purchased SMT = {Number(props.EBMBalance)
                          ? (Number(props.EBMBalance) / 10 ** 18).toFixed(2)
                          : ""}                        </p>
                     
                    </div>

                    <div className="tw-flex tw-w-full tw-gap-3">
                      <div
                        className={`tw-rounded-md  tw-w-full tw-h-[48px]  tw-justify-between tw-pr-5 tw-flex tw-items-center tw-mt-2 ${selectedCurrency==="MATIC"?' tw-border-2 tw-border-[#456DA7]': 'tw-border-2 border'}`}
                        onClick={() => handleSelect("MATIC")}
                      >
                        <div>
                          <img
                            src={require("../../assets/images/c2.png")}
                            alt="MATIC"
                          />
                        </div>
                        <p className="tw-m-0 tw-text-black">MATIC</p>
                      </div>
                      <div
                        className={`tw-rounded-md  tw-w-full tw-h-[48px]  tw-justify-between tw-pr-5 tw-flex tw-items-center tw-mt-2 ${selectedCurrency==="USDT"?' tw-border-2 tw-border-[#456DA7]': 'tw-border-2 border'}`}
                        onClick={() => handleSelect("USDT")}
                      >
                        <div>
                          <img
                            src={require("../../assets/images/c1.png")}
                            alt="USDT"
                          />
                        </div>
                        <p className="tw-m-0 tw-text-black">USDT</p>
                      </div>
                    
                    </div>
                    <div className="  tw-gap-3 tw-justify-center  tw-flex tw-items-center tw-text-center tw-pt-4 tw-pb-2">
                      <p className=" tw-w-24 m-0  tw-bg-[#456DA7] tw-h-[2px] "></p>
                      <p className=" tw-uppercase tw-font-medium tw-font-poppins tw-m-0  sm:tw-text-lg tw-text-[10px] tw-text-black">
                      {selectedCurrency==="MATIC"?'Matic' :'USDT'} Balance = <span className=" tw-text-[#456DA7] tw-font-poppins">{selectedCurrency==="MATIC"? props.MATICBalance ? (Number(props.MATICBalance)/10**18).toFixed(3):"0" : props.USDTBalance ? (Number(props.USDTBalance)/10**6).toFixed(2):"0" }</span>
                      </p>
                      <p className=" tw-w-24 m-0  tw-bg-[#456DA7] tw-h-[2px] "></p>

                    </div>
                    <div className=" tw-flex tw-gap-3 ">
                      <div className=" tw-w-full">
                        <p className=" tw-m-0 tw-text-black tw-font-poppins sm:tw-text-base tw-text-[10px]">
                          $ {selectedCurrency} you pay
                        </p>

                        <div className=" tw-rounded-md tw-border tw-relative tw-mt-2 tw-border-[#456DA7]  tw-bg-gradient">
                          <input
                            className=" tw-bg-transparent  tw-w-full tw-px-3 tw-py-2 tw-text-black tw-pl-12 tw-outline-none"
                            type="Number"
                            disabled={props.perTokenIn_Matic > 0 ? false : true}
                            min={0}
                            value={payAmount}
                            onChange={(e) => {
                              set_payAmount(e.target.value);
                              onPay(e.target.value);
                            }}
                            
                            />
                          <div className=" tw-absolute tw-left-1.5  tw-top-0">
                            {selectedCurrency === "USDT" ? (
                              <img
                                src={require("../../assets/images/c1.png")}
                                className=" tw-w-10 tw-h-10"
                              />
                            ) :(
                              <img
                                src={require("../../assets/images/c2.png")}
                                className=" tw-w-8 tw-h-8"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className=" tw-w-full">
                        <p className="  tw-font-poppins tw-m-0 tw-text-black sm:tw-text-base tw-text-[10px]">
                        Samaritan Receive
                        </p>

                        <div className=" tw-rounded-md tw-border  tw-border-[#456DA7] tw-relative  tw-mt-2  tw-bg-gradient">
                          <input
                            className=" tw-bg-transparent  tw-pl-12 tw-w-full tw-px-3 tw-py-2 tw-text-black tw-outline-none"
                            type="number"
                            disabled={props.perTokenIn_Matic > 0 ? false : true}
                            value={receiveAmount}
                            min={0}
                            onChange={(e) => {
                              set_receiveAmount(e.target.value);
                              onRecieve(e.target.value);
                            }}
                            
                            />
                          <div className=" tw-absolute tw-left-3  tw-top-2">
                            <img
                              src={require("../../assets/images/c5.png")}
                              className=" tw-w-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                   

                    {isDisconnected?
                    (
                      <div className=" tw-flex tw-border-b tw-border-[#456DA7] tw-gap-3 tw-py-4">
                      <Button
                        
                        onClick={() => open()}
                        label={"Connect Wallet"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                     
                    </div>

                    ):(                  
                    <div className=" tw-flex tw-border-b tw-border-[#456DA7] tw-gap-3 tw-py-4">
                      <Button
                        
                        onClick={()=>buy_token()}

                        label={"Buy Now"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                      <Button
                        
                        onClick={() => open()}
                        label={"Disconnect"}
                        className={"  tw-py-1 tw-w-full"}
                      />
                     
                     
                    </div>

                    )} 

                    <div className="tw-pt-6 tw-flex tw-justify-center">
      <p
        className="tw-flex tw-gap-3 tw-items-center tw-text-md tw-font-poppins tw-font-semibold cursor-pointer"
        onClick={handleToggle}
      >
        REFERRAL DETAILS {isExpanded ? <FaAngleUp/> : <FaAngleDown />}
      </p>
      
    </div>


    {isExpanded && (
        <div className=" tw-overflow-x-auto">
          <table className="tw-min-w-full tw-mb-0">
          <thead className="tw-border-t tw-border-b tw-border-[#456DA7] tw-bg-primary">
            <tr className="tw-rounded-lg tw-whitespace-nowrap">
              <th
                scope="col"
                className="tw-text-sm tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                LEVEL
              </th>
              <th
                scope="col"
                className="tw-text-sm tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                PERCENTAGE
              </th>
              <th
                scope="col"
                className="tw-text-sm tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                Team
              </th>
              <th
                scope="col"
                className="tw-text-sm tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                EARNING
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              <tr className="bg-white border-t rounded-md">
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    1
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    5%
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    {Number(props.refCount[0])}
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
                  {props.refEarning ? (Number(props.refEarning[0])/10**18).toFixed(2): 0 }

                  </span>
                </td>
              </tr>
              <tr className="bg-white border-t rounded-md">
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    2
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    3%
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                  {Number(props.refCount[1])}

                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
                  {props.refEarning ? (Number(props.refEarning[1])/10**18).toFixed(2): 0 }

                  </span>
                </td>
              </tr>
              <tr className="bg-white border-t rounded-md">
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    3
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    1%
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                  {Number(props.refCount[2])}

                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
                  {props.refEarning ? (Number(props.refEarning[2])/10**18).toFixed(2): 0 }

                  </span>
                </td>
              </tr>

            {props.isCso?
              <tr className="bg-white border-t rounded-md">
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    CSO
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    2%
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">

                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
                  {props.Cso_Earning ? (Number(props.Cso_Earning)/10**18).toFixed(2): 0 }

                  </span>
                </td>
              </tr>
:null
            }

{props.isEmb?
              <tr className="bg-white border-t rounded-md">
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    EMB
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                    1%
                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">

                  </span>
                </td>
                <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
                  <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
                  {props.Emb_Earning ? (Number(props.Emb_Earning)/10**18).toFixed(2): 0 }

                  </span>
                </td>
              </tr>
:null
}

            </>
          </tbody>
        </table>
        </div>
      )}

                  
                  </div>
                </div>
              </div>
            ) : (
              // <VideoPlayer src={require("../../assets/images/ebm.mp4")} />
              <VideoSlider/>
            )}
          </div>
        </div>
      </div>

      <div></div>
      <ToastContainer />

    </div>
  );
};

export default Hero;
