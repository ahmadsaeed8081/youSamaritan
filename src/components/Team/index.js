import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div
      id="teamSection"
      className="  tw-bg-[#456DA7]"
    >
      <div className="container tw-py-16 tw-text-center">
       
        <h1 className="tw-text-white tw-pt-4 tw-font-semibold md:tw-text-[45px] tw-text-[35px]">
        The Board Of Advisors
        </h1>
        <div className="row  tw-pt-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-6 ">
              <div className=" tw-text-center tw-rounded-lg">
                <div className="">
                  
                  <div className="row">
                  <div className=" col-md-9 tw-mx-auto">
                  <img
                      src={member.image}
                      className=" tw-mx-auto"
                      alt={member.name}
                    />
                  </div>
                  </div>
                </div>
                <div className="tw-pb-8 ">
                  <h3 className=" tw-text-white tw-text-xl tw-font-poppins  ">
                    {member.name}
                  </h3>
                  <p className="tw-text-[#A4B4C3] m-0">{member.role}</p>
                  {/* {member.links && (
                    <ul className="tw-flex tw-gap-3 tw-pt-2 tw-justify-center tw-items-center">
                      {member.links.map((link, i) => (
                        <li key={i}>
                          <Link to={link.url}>
                            <img
                              src={require(`../../assets/images/${link.icon}`)}
                              alt={link.alt}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Ty JavellanA, CPA",
    role: "Finance & Investment",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Jose Cliff Romos",
    role: "Strategy & Innovation",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Dr. Jesus Acantilado",
    role: "Founder | Medical Director",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Guillermo Tabligan",
    role: "CEO, Geer IT Solution",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Atty. Abel Almario",
    role: "Corporate Lagal Advisor",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
  {
    name: "Pastor Ron Jaworski",
    role: "Ethereal |Spiritual Leader",
    image: require("../../assets/images/user.png"),
    links: [
      { url: "", icon: "ic_sharp-discord.png", alt: "Discord" },
      { url: "", icon: "Symbol.png", alt: "Symbol" },
      { url: "", icon: "iconoir_telegram.png", alt: "Telegram" },
    ],
  },
];

export default Team;
