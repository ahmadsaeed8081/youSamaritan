import React from "react";
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className=" tw-overflow-x-hidden tw-bg-[#141414]">
        <div className="container tw-py-10">
          <div className="row tw-items-center">
            <div className="col-md-12 md:tw-text-start  tw-text-center">
              <img src={require("../../assets/images/footer_logo.png")} className="tw-mx-auto" />
              <ul className=" tw-pt-6 tw-p-0 tw-flex  tw-justify-center tw-gap-5 tw-items-center">
                <li>
                  <Link to={'https://x.com/YouSamaritan_ph'}>
                    <img src={require("../../assets/images/pajamas_twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'http://www.youtube.com/@YouSamaritanOfficial'}>
                    <img src={require("../../assets/images/mingcute_youtube-fill.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'https://www.facebook.com/groups/yousamaritanmovement'} >
                    <img src={require("../../assets/images/bi_facebook.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'https://t.me/OfficialYouSamaritan'} >
                  <FaTelegram size={30} color="#F9A11E" />
                  </Link>
                </li>
                <li>
                  <Link to={'https://t.me/+9FfF7v_hUbNmZWQ8'} >
                    <img src={require("../../assets/images/mdi_twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={'https://www.reddit.com/user/ButchTabligan/'} >
                    <img src={require("../../assets/images/free-reddit-logo-icon-2436-thumb 1.png")} />
                  </Link>
                </li>
              </ul>
              <p className=" sm:tw-text-xl tw-text-sm tw-text-white tw-pt-6 tw-text-center">
              An NGO l Non-Governmental Organization I Powered by a BSP, EMI, and <br/> VASP Licensed Firm KYC, AML, CTF, Travel Rule and Sanctions Compliant
              </p>
            </div>
           
          </div>
        </div>
      </div>
      <div className="tw-bg-button-gradient tw-w-full tw-py-2  tw-text-center">
        <p className=" sm:tw-text-lg tw-text-sm tw-m-0 tw-text-white">
        Central Office: 29th Floor, World Plaza, 5th Ave, BGC https://YouSamaritan,com
        </p>
      </div>
    </div>
  );
};

export default Footer;
