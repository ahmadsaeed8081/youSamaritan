import React from "react";
import Button from "../Button";

const RoadMap = () => {
  return (
    <div id="roadSection" className="  container   tw-pb-12">
      <div className="  sm:tw-pb-0 ">
        <div className=" tw-text-center">
          {/* <h1 className=" tw-text-[#456DA7] tw-text-3xl  tw-font-zen-dots"> Road Map</h1> */}
          {/* <p className="tw-text-white tw-leading-8">
            Our roadmap reflects our commitment to boost blockchains, innovation, DeFi growth, and sustainability, guiding us towards our vision of becoming a leader in the crypto mining industry and beyond.
          </p> */}
        </div>
       
  
  {/* <div className="tw-relative">
          <img
            src={require("../../assets/images/card_bg_t.png")}
            className="tw-mx-auto   tw-pr-3"
          />
          <div className=" tw-z-10  tw-absolute tw-top-3 tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className=" tw-absolute tw-top-4 tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className=" tw-absolute tw-top-32 tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className=" tw-absolute tw-top-32 tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>



          <div className=" tw-z-10 tw-absolute  tw-top-60 tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className=" tw-absolute tw-top-60 tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className=" tw-absolute   tw-top-96 tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className=" tw-absolute tw-top-96 tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>


          <div className="tw-hidden tw-z-10 s tw-absolute tw-top-[20%] tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[20%] tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute   tw-top-[25%] tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[25%] tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>



          <div className="tw-hidden tw-z-10 sm:tw-block tw-absolute tw-top-[30%] tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[30%] tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute   tw-top-[35%] tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[35%] tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>



          <div className="tw-hidden tw-z-10 sm:tw-block tw-absolute tw-top-[40%] tw-left-[48%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[40%] tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute   tw-top-[45%] tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[45%] tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>


          
          <div className="tw-hidden tw-z-10 sm:tw-block tw-absolute tw-top-[50%] tw-left-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Left Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[50%] tw-left-[51%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/left_line.png")} alt="Left Arrow" className=" tw-w-36" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute   tw-top-[55%] tw-z-10 tw-right-[49%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/circle.png")} alt="Right Arrow" />
          </div>
          <div className="tw-hidden sm:tw-block tw-absolute tw-top-[55%] tw-left-[38%] tw-transform tw--translate-y-1/2">
            <img src={require("../../assets/images/right_line.png")} alt="Left Arrow" className=" tw-w-44" />
          </div>


          
  <div className="md:tw-absolute tw-relative tw-top-0 tw-left-0 tw-right-0 tw-overflow-x-hidden">
    <div className="tw-grid tw-grid-cols-2 tw-items-center">
      <RoadMapPhase
        phase="2009 -  2023"
    
        title="Analysis l Assessment"
        para="Detailed examination of the subject to understand behaviour and to determine features for the project."
        items={[
          "Establishing the core team and advisory board.",
          "Conducting market research and feasibility studies.",
          "Community benefiting business model and tokenomics.",
          "Launching the presale phase to secure early investments and community support and participation.",
        ]}
      />
      <RoadMapPhase
       
       
        phase="2009 -  2023"
        title="Analysis l Assessment"
        para="Detailed examination of the subject to understand behaviour and to determine features for the project."
        items={[
          "Establishing the core team and advisory board.",
          "Conducting market research and feasibility studies.",
          "Community benefiting business model and tokenomics.",
          "Launching the presale phase to secure early investments and community support and participation.",
        ]}
      />
      <RoadMapPhase
        phase="2009 - 2023"
        title="Research l Validation"
        para="Conducted tons of questionnaires and surveys from troubled individuals. Research with hundreds of medical practitioners."
        items={[
          "Establishing the core team and advisory board.",
          "Conducting market research and feasibility studies.",
          "Community benefiting business model and tokenomics.",
          "Launching the presale phase to secure early investments and community support and participation.",
        ]}
      />
      <RoadMapPhase
        phase="Apr - May 2024"
        title="White Paper"
        para="Carefully created to document vital information to highlight the features of the platform that it plans to offer."
        items={[
          "Marketing, DEX listings.",
          "Building first state-of-the-art mining facility.",
          "Start Mining Operations.",
          "Buy4Less - Swap at discounted rates (Users can buy coins we mine)",
          "Stake4PIE - For passive income stream rewards (USDT/USDC)",
        ]}
      />
      <RoadMapPhase
        phase="Jun 2024 -"
        title="Web of Life Development"
        para="Multidimensional activities and processes, coordinated by multiple organizations and stakeholders."
        items={[
          "Developing and launching our own DEX platform for decentralized trading.",
          "Offering discounted value swaps for our token holders on the DEX.",
          "Partnering with other DEX platforms to provide discounted transaction fees for our community.",
        ]}
      />
      <RoadMapPhase
        phase="Aug - Oct 2024"
        title="Pre-Seed Donation"
        para="Discreet and silent acceptance of support from team, family & friends, partners, and philanthropists."
        items={[
          "Mining BlockDAG coins and leveraging its innovative technology.",
          "Expanding mining operations to include a diverse range of cryptocurrencies.",
          "Partnering with BlockDAG and other key players in the crypto industry.",
        ]}
      />
      <RoadMapPhase
        phase="Nov - Jan 2024"
        title="Seed Donation"
        para="Continuation of acceptance of donation from various individuals outside the circle of the core team."
        items={[
          "Scaling up mining operations in multiple countries and regions.",
          "Enhancing ecosystem development through strategic partnerships and collaborations.",
          "Implementing community-driven initiatives and governance structures for token holders.",
        ]}
      />
      <RoadMapPhase
        phase="Feb - Jul 2025"
        title="Private Donation"
        para="Donation acceptance derived from referrals and promotional activities of the sales and marketing team."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
      <RoadMapPhase
        phase="Aug 2025"
        title="Initial Liquidity Offering"
        para="Aims to offer high amount of liquidity to boost the token price and trading volume while ensuring compliance."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
      <RoadMapPhase
        phase="Sep 2025"
        title="AI Integration"
        para="Simulation and integration of human intelligence processes by machines into the platform."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
      <RoadMapPhase
        phase="Oct 2026"
        title="Charity l Events"
        para="Sponsor sharing the blessings and great lessons in life of survivors to troubled people in the world."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
      <RoadMapPhase
        phase="Nov 2027"
        title="Asian Expansion"
        para="Organize and carry out digital marketing campaign to reach troubled people across Asia."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
      <RoadMapPhase
        phase="Dec 2028 -"
        title="Global Expansion"
        para="Participate in global forums, events and conferences in fighting and preventing depression, anxiety, & suicidal attempts."
        items={[
          "Continuously optimizing mining operations for efficiency and profitability.",
          "Exploring new technologies, trends, and opportunities in the crypto space.",
          "Engaging with the community, investors, and stakeholders to drive long-term value creation and sustainability.",
        ]}
      />
    </div>
  </div>
</div> */}
{/* <img src={require('../../assets/images/road_map_mobile.png')} className=" tw-block sm:tw-hidden tw-w-full" /> */}
<img src={require('../../assets/images/desktop_views.png')} className="  tw-mx-auto" />
      </div>
    </div>
  );
};

const RoadMapPhase = ({ phase, title, items,para,className}) => (
  <div className="">
    <div className="row ">
      <div className={`col-md-11   tw-mx-auto `}>
        <div className={`md:tw-px-32 tw-px-0 tw-pt-0 tw-rounded-md ${className}`}>
          <button   className="tw-py-2.5 tw-font-poppins tw-rounded-full  tw-bg-button-gradient tw-text-white  tw-w-40 " >{phase}</button>
          <h1 className="tw-text-black tw-font-semibold tw-text-[28px] tw-font-poppins tw-pt-4">{title}</h1>
          <p className={`tw-text-black tw-text-[20px]`}>{para}</p>
        </div>
      </div>
    </div>
  </div>
);

export default RoadMap;
