import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="tw-flex tw-bg-transparent  tw-gap-3 tw-border-opacity-20  tw-scroll-container tw-mt-3 tw-productOverflow tw-overflow-x-auto tw-whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`tw-px-4  tw-rounded-lg tw-py-4 ${className} ${
              activeTab === tab.title
                ? "tw-w-full tw-text-white  tw-bg-button-gradient tw-bg-BG"
                : " tw-border-2  tw-border-[#456DA7] tw-text-[#456DA7] border tw-w-full"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tw-mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "tw-hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
