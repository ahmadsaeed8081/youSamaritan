import React, { useState, useEffect } from 'react';

const Counter = (props) => {
  const calculateTimeLeft = () => {
    const difference = Number(props.time) * 1000 - new Date();
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
  }, [props.time]);

  return (
    <div>
      <div className=" tw-flex tw-justify-between tw-items-center   tw-rounded-lg">
        <div className="tw-text-center tw-bg-button-gradient tw-flex tw-justify-center tw-items-center sm:tw-w-[101px] tw-w-[68px] sm:tw-h-[94px] tw-h-[64px] tw-rounded-2xl">
         <div>
         <span className="tw-text-white tw-m-0 tw-font-poppins  tw-font-medium sm:tw-text-[18px] tw-text-[12px] tw-leading-3">Days</span>
          <p className=" sm:tw-pt-2 tw-pt-1 tw-m-0 tw-text-white   tw-font-zen-dots  tw-font-bold sm:tw-text-[18px] tw-text-[14px] tw-leading-5">
            {String(timeLeft.days).padStart(2, '0')}
          </p>
         </div>
        </div>
        
        <div className="tw-text-center tw-bg-button-gradient tw-flex tw-justify-center tw-items-center sm:tw-w-[101px] tw-w-[68px] sm:tw-h-[94px] tw-h-[64px] tw-rounded-2xl">
         <div>
         <span className="tw-text-white tw-m-0 tw-font-poppins  tw-font-medium sm:tw-text-[18px] tw-text-[12px] tw-leading-3">Hours</span>
          <p className=" tw-pt-2 tw-m-0 tw-text-white   tw-font-zen-dots  tw-font-bold sm:tw-text-[18px] tw-text-[14px] tw-leading-5">
          {String(timeLeft.hours).padStart(2, '0')}
          </p>
         </div>
        </div>
     


       

        <div className="tw-text-center tw-bg-button-gradient tw-flex tw-justify-center tw-items-center sm:tw-w-[101px] tw-w-[68px] sm:tw-h-[94px] tw-h-[64px] tw-rounded-2xl">
         <div>
         <span className="tw-text-white tw-m-0 tw-font-poppins  tw-font-medium sm:tw-text-[18px] tw-text-[12px] tw-leading-3">Minutes</span>
          <p className=" tw-pt-2 tw-m-0 tw-text-white   tw-font-zen-dots  tw-font-bold sm:tw-text-[20px] tw-text-[14px] tw-leading-5">
          {String(timeLeft.minutes).padStart(2, '0')}
          </p>
         </div>
        </div>


        <div className="tw-text-center tw-bg-button-gradient tw-flex tw-justify-center tw-items-center sm:tw-w-[101px] tw-w-[68px] sm:tw-h-[94px] tw-h-[64px] tw-rounded-2xl">
         <div>
         <span className="tw-text-white tw-m-0 tw-font-poppins  tw-font-medium sm:tw-text-[18px] tw-text-[12px] tw-leading-3">Seconds</span>
          <p className=" tw-pt-2 tw-m-0 tw-text-white   tw-font-zen-dots  tw-font-bold sm:tw-text-[20px] tw-text-[14px] tw-leading-5">
          {String(timeLeft.seconds).padStart(2, '0')}
          </p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;