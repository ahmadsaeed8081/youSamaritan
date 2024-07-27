import React from "react";

const Tokenomics = () => {
  return (
    <div id="tokenSection" className="  tw-bg-[#456DA7]   tw-my-14">
      {/* <h1 className=" tw-text-white  tw-text-center tw-font-semibold tw-text-4xl">
        TOKENOMICS
      </h1> */}

      <div className="container ">
        <div className="row">
          <div className="col-md-12 tw-mx-auto">
          <img src={require("../../assets/images/tokens.png")} className=" tw-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
