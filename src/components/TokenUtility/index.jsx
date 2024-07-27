import React from "react";
import token from "../../assets/images/token.png";
import token_bg from "../../assets/images/token_bg.png";

const TokenUtility = () => {
  return (
    <div className="">
      <div className="container tw-pt-12 sm:tw-pb-32 tw-pb-0">
        <h1 className="tw-text-white tw-text-center gradient-text tw-font-semibold md:tw-text-[45px] tw-text-[35px]">
          TOKEN UTILITY
        </h1>

        <div className="row  g-5 tw-py-8  ">
          <div className="col-md-4  tw-order-2 sm:tw-order-1 p-0">
            <div className="tw-w-full tw-relative tw-flex tw-justify-center tw-items-center">
              <div className="md:tw-absolute tw-sticky tw-z-10 tw-top-0 tw-left-12 tw-w-full tw-h-full">
                <img
                  src={token}
                  className="tw-mx-auto tw-w-64 sm:tw-w-auto tw-rounded-md"
                  alt="Token"
                />
              </div>

              <div className=" tw-hidden sm:tw-block sm:tw-static md:tw-absolute md:-tw-left-24">
                <img
                  src={token_bg}
                  className="tw-w-full tw-h-full tw-object-cover"
                  alt="Token Background"
                />
              </div>
            </div>
          </div>

          <div className="col-md-8 sm:tw-order-2 tw-order-1 p-0">
            <div className=" tw-px-10">
              <div className="tw-bg-[#141414] sm:tw-text-start tw-text-center tw-px-5  tw-py-8 tw-rounded-lg sm:tw-flex tw-block tw-items-center tw-gap-4">
                <h1 className="tw-text-white sm:tw-text-[40px] tw-text-[30px]">Payment</h1>
                <p className=" tw-m-0  tw-h-20 tw-w-0.5  sm:tw-block tw-hidden tw-bg-[#2596ef]"></p>
                <p className="tw-text-white">
                  $EBM can be used in our ecosystem to SWAP at Buy4Less, the
                  cryptos we mine.
                </p>
              </div>

              <div className="tw-ml-0 md:tw-ml-24 tw-mt-8">
                <div className="tw-mb-8 sm:tw-text-start tw-text-center">
                  <h1 className="tw-text-white sm:tw-text-[40px] tw-text-[30px]">Discounts</h1>
                  <hr className=" sm:tw-block tw-hidden tw-m-0 tw-border-2 tw-w-44  tw-border-[#2596ef] tw-opacity-100" />
                  <p className="tw-text-white tw-pt-5">
                    $EBM Token holders will be able access 0.1-10 % reduced
                    rates when using our Buy4less feature based on their holding
                    levels.
                  </p>
                </div>

                <div className=" sm:tw-text-start tw-text-center">
                  <h1 className="tw-text-white sm:tw-text-[40px] tw-text-[30px] ">
                    Community Share
                  </h1>
                  <hr className=" sm:tw-block tw-hidden tw-m-0 tw-border-2 tw-w-44  tw-border-[#2596ef] tw-opacity-100" />
                  <p className="tw-text-white tw-pt-5">
                    Upon starting our Eco-friendly Block Mining activities,
                    40-60% of daily $USDT / $USDC revenue will be rewarded
                    automatically to Stake4PIE so that our $EBM staking
                    community have a Passive Income Earning stream flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenUtility;
