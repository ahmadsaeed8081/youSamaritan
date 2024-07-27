import React, { useState } from "react";
import Accordion from "../Accordion/Accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: "What is YouSamaritan?",
      data:<div>
        <p>Do you know anyone who doesn’t have a problem? If your answer is none, then this platform is for everyone. It’s a revolutionary anti-depression platform – your anonymous lifeline! </p>
        <p>YouSamaritan is the first and only platform that enables users to transform passion into compassion. The platform leverages the advantages of blockchain technology, such as immutability, transparency, and security, to create a more efficient and secure way to advice and make confession. Watch this short video to learn exactly what YouSamaritan does </p>
        <p>Watch this short video to learn exactly what YouSamaritan does: <Link to={'https://youtu.be/5HrhxZ3EaXc'}>https://youtu.be/5HrhxZ3EaXc</Link>
        </p>
      </div>,
      isOpen: false,
    },
    {
      key: 2,
      title: "What makes YouSamaritan a brilliant project?",
      data:<div>
        <p> "YouSamaritan is primarily a donation platform. You may claim tax deductions when you make a donor purchase of Samaritan Token. If you decide to keep the profit, you instantly become an investor. It’s your choice!</p>
        <p>It’s a multi-purpose token. It has several use case. It’s a Utility Token. It’s a donation coin + DEX coin + ecommerce coin. We are tagged as the Shit Coin Killer. Watch this video to know what makes YouSamaritan a brilliant project:  </p>
        <p>Watch this video to know what makes YouSamaritan a brilliant project: <Link to={' https://youtu.be/_ndSsSeXU1Y'}> https://youtu.be/_ndSsSeXU1Y</Link></p>
      </div>,
      isOpen: false,
      // link: "https://youtu.be/_ndSsSeXU1Y",
    },
    {
      key: 3,
      title: " How can I make a donor purchase of Samaritan tokens?",
      data:<div>
        <p>Samaritan tokens can be purchased during our token sale rounds or through supported cryptocurrency exchanges. Detailed instructions are available on our web page. <Link to={'#'}>Click here.</Link> </p>
      </div>,
      isOpen: false,
      // link:'Click here.'
    },
    {
      key: 4,
      title: "What are the benefits of owning Samaritan tokens early?",
      data: <div>
        <p>Early donor purchase benefit from lower token prices, as the price increases through nine scheduled rounds... Early adoption also provides more significant rewards and potential appreciation as the platform grows</p>
        <p>Watch this video to know the benefits of owning Samaritan Tokens early: <Link to={' https://youtu.be/_ndSsSeXU1Y'}> https://youtu.be/_ndSsSeXU1Y</Link></p>
      </div>,
      isOpen: false,
    },
    {
      key: 5,
      title: "How does YouSamaritan ensure the security of my donor purchase?",
      data: "YouSamaritan employs advanced blockchain technology, smart contracts, and industry-standard security protocols to safeguard your investments. Regular audits and security assessments are conducted to maintain the highest security standards",
      isOpen: false,
    },
    {
      key: 6,
      title: "What can I do with Samaritan tokens?",
      data:<div>  
        <p> You can claim tax deductions form the donor purchase of Samaritan Token. . If you decide to keep the profit, you instantly become an investor. Samaritan token is a multi-purpose token. It has several use case. It’s a Utility Token. It’s a donation coin + DEX coin + ecommerce coin.</p>
        <p> Watch this video to know what you can do with Samaritan Tokens: <Link to={'https://youtu.be/_ndSsSeXU1Y'}>https://youtu.be/_ndSsSeXU1Y</Link></p>
      </div>,
      isOpen: false,
    },
    {
      key: 7,
      title: "How do I support a cause using the YouSamaritan platform?",
      data: "Supporting a cause is simple. Select the foundation, charity institution, non-profit organization or church you wish to support, choose the amount of Samaritan tokens you want to donate, and complete the transaction through our secure platform",
      isOpen: false,
    },
    {
      key: 8,
      title: "How can I track the impact of my donations?",
      data: "Every donation made through YouSamaritan is recorded on the blockchain, providing a transparent and immutable record. Donors can track the progress and impact of their contributions through detailed project updates and reports on our platform.",
      isOpen: false,
    },
    {
      key: 9,
      title: "Is there a minimum or maximum amount required to donate?",
      data: "You can contribute as much or as little as you wish, making it accessible for everyone to support the causes they care about. Watch this video to know the minimum amount required to donate: ",
      isOpen: false,
      link: "https://youtu.be/_ndSsSeXU1Y",
    },
    {
      key: 10,
      title:
        " Can I earn rewards for participating in the YouSamaritan community?",
      data: "Yes, community members can earn rewards by participating in various activities such as staking Samaritan tokens, contributing to projects, and engaging in platform governance. These rewards are designed to incentivize active participation and support.",
      isOpen: false,
    },
    {
      key: 11,
      title: "How does YouSamaritan ensure transparency in fund allocation?",
      data: "Transparency is a core principle of YouSamaritan. All transactions and fund allocations are recorded on the blockchain, making them publicly accessible and verifiable. This ensures that all funds are used as intended and fosters trust within the community.",
      isOpen: false,
    },
    {
      key: 12,
      title: "What fees are associated with using the YouSamaritan platform?",
      data: "The YouSamaritan platform charges minimal fees to cover transaction costs and platform maintenance. Detailed information about fees is available on our website, ensuring complete transparency.",
      isOpen: false,
    },
    {
      key: 13,
      title: "How can I get involved with the YouSamaritan community?",
      data: "You can get involved by joining our community forums, participating in governance discussions, supporting projects, and following us on social media. We encourage active participation and value the contributions of our community members",
      isOpen: false,
    },
    {
      key: 14,
      title: "What is the future vision for YouSamaritan?**",
      data: (
        <div>
          <p className="">
            Our vision is to become the leading decentralized platform for
            charitable giving, creating a global community united by the common
            goal of making a positive impact. We aim to continuously innovate
            and expand our platform to support more causes and reach more people
            worldwide. When you sign up and become a donor, you also become a
            part-owner and philanthropist in YouSamaritan. Philanthropists are
            defined as people who would like to make this world a better place.
            That makes you a Good Samaritan as well.
          </p>
          <p className="">
            When you sign up and become a donor, you also become a part-owner
            and philanthropist in YouSamaritan. Philanthropists are defined as
            people who would like to make this world a better place. That makes
            you a Good Samaritan as well.
          </p>
        </div>
      ),
      isOpen: false,
    },
    {
      key: 15,
      title: "What if I refer someone?",
      data: "You will get a referral link. And when you refer someone to YouSamaritan, you are entitled to make 5 –10% share. Join our telegram group to learn more about the potential reward in successfully representing YouSamaritan: ",
      isOpen: false,
      link: "https://t.me/OfficialYouSamarita",
    },
  ]);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  return (
    <div className=" tw-bg-white     tw-bg-no-repeat tw-w-full tw-bg-cover   tw-h-auto tw-py-20">
      <div className=" container">
        <div className="row tw-items-center">
          <div className="col-lg-6 col-md-12">
            <h2 className="tw-text-[#456DA7] "> FAQS</h2>
            <h1 className=" tw-font-medium tw-text-4xl sm:tw-text-start tw-text-center  tw-text-[#456DA7]">
              Frenquently Questions
            </h1>
            <div className="  tw-mt-12">
              {accordions.map((accordion) => (
                <Accordion
                  key={accordion.key}
                  title={accordion.title}
                  data={
                    <div>
                      {accordion.data}
                      <Link to={`${accordion.link}`}>{accordion.link}</Link>
                    </div>
                  }
                  isOpen={accordion.isOpen}
                  toggleAccordion={() => toggleAccordion(accordion.key)}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12  md:tw-pt-32 tw-pt-0 tw-relative">
            <div className="row">
              <div className="col-md-12  tw-mx-auto">
                <div className="row">
                  <div className="col-md-10 tw-mx-auto">
                    <img
                      src={require("../../assets/images/faq.png")}
                      className=" tw-w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
