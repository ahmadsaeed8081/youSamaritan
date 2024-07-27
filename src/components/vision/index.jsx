import React from 'react'
import EBM_Avenue from '../EBM_avenue'
import TokenUtility from '../TokenUtility'

const Vision = () => {
  return (
    <div  id='aboutSection'  className=' tw-overflow-x-hidden tw-bg-Mesh   tw-bg-contain  tw-relative tw-py-20 tw-bg-[#0a0a0a]  tw-w-full tw-h-auto'>
           <div className=" tw-absolute tw-top-0 tw-right-0">
        <img src={require("../../assets/images/right_image.png")} />
      </div>
      <div className='container'>
        <div className='row   g-5 tw-items-center'>
            <div className='col-lg-6 col-md-12'>
            <h1 className=" tw-text-white  gradient-text tw-font-semibold md:tw-text-[45px] tw-text-[35px]">
            
              Risks, Challenges, and Vision
          
            </h1>
            <p className=" tw-text-white  sm:tw-text-start tw-text-center  tw-leading-7 tw-pt-4 tw-text-xl">
            Challenges in crypto mining include energy consumption, changing regulations, and market volatility on top of none to limited profits through use of cloud mining platforms. The rise in monopolized proof of stake blockchains.
            </p>
            <p className=" tw-text-white sm:tw-text-start tw-text-center  tw-leading-7 tw-pt-4 tw-text-xl">
            Nonetheless, we are  optimistic about our mining activities to set new benchmarks for efficiency and sustainability, using renewable sources of energy, modern hardware, and profit switching mechanisms. What we see is not just about cryptocurrency mining but shaping future decentralized finance empowering communities creating a sustainable rich ecosystem that benefits everyone involved.            </p>
            <div className='  tw-pt-5'>
             <h1 className='tw-text-white  gradient-text  tw-font-poppins   sm:tw-text-start tw-text-center tw-font-extrabold tw-text-[55px]'>100M +</h1>
             <p className=' tw-text-white tw-text-lg sm:tw-text-start tw-text-center'>Total Supply</p>
            </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='row'>
                <div className='col-md-10 tw-mx-auto'>
                <img  src={require('../../assets/images/mash_image.png')} className=' tw-w-full' />

                </div>
              </div>
            </div>
        </div>
      </div>


      <EBM_Avenue/>
      <TokenUtility/>
    </div>
  )
}

export default Vision
