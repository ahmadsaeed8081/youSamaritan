//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

//make it upgradable smart contract

interface TOKEN
{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract YouSamartian_Presale
    {


        struct Presale_stages{

            uint price;
            uint endTime;
            uint supply;
            uint total_sold;
            uint amount_raised;

        }

        struct ref_data{

            uint earning;
            uint count;

        }
        struct Data{

            mapping(uint=>ref_data) referralLevel;
            address upliner;
            address[] team;
            bool isCso;
            bool isEmb;
            uint Cso_Earning;
            uint Emb_Earning;
            bool investBefore;
        }

        mapping(address=>Data) public user;

        mapping(uint=>Presale_stages) public presale;

        address payable public owner;
        uint public total_soldSupply;
        uint public total_stages=10;
        uint public total_raised;
        uint public min_purchase= 0 ether;
        uint public min_refPurchase= 0 ether;
        bool public doubleToken_promo;
        bool public doublDirectPercentage_promo;
        address[] public Cso_arr;
        address[] public Emb_arr;


        address public DAI_token=0x341343568948459e5b7017eDDb05110cfA3EF699;
        address public samartian_token=0x7Ed2D0e9C1a7F9f51115e0e70BDB55E7D652e35c;

        uint[10] supply_arr=[24000000000000 ether, 27000000000000 ether,30000000000000 ether,33000000000000 ether, 36000000000000 ether,39000000000000 ether,42000000000000 ether, 45000000000000 ether,54000000000000 ether,29640000000000 ether];
        uint[10] price_arr =[0.00000001611 ether, 0.00000002549 ether, 0.00000004033 ether,0.00000006382 ether, 0.00000010098 ether, 0.00000015979 ether,0.00000025283 ether, 0.00000040005 ether, 0.00000063300 ether, 0.00000100160 ether];
        uint[10] time_arr =[90 days, 150 days, 180 days,210 days,240 days,270 days,300 days,330 days,360 days,390 days];

        AggregatorV3Interface internal priceFeed = AggregatorV3Interface(0xAB594600376Ec9fD91F8e885dADF0CE036862dE0);

        constructor()
        {
            
            owner= payable(0x429Bd34fCA425c18FA5F790F6c4aC035bF1a152d);
            for(uint i=0;i<10;i++)
            {
                presale[i].price = price_arr[i];
                presale[i].supply = supply_arr[i];
                presale[i].endTime = block.timestamp + time_arr[i];

            }
            
        }
        


        function getLatestPrice() public view returns (int) {
            // prettier-ignore
            (
                /* uint80 roundID */,
                int price,
                /*uint startedAt*/,
                /*uint timeStamp*/,
                /*uint80 answeredInRound*/
            ) = priceFeed.latestRoundData();
            return price*10**10;
            }



        function getConversionRate(int dollar_amount) public view returns (int) {

            int MaticPrice = getLatestPrice();
            int UsdToMatic = (( dollar_amount *10**18 ) / (MaticPrice));

            return UsdToMatic;

        }


        function get_curr_Stage()  public view returns(uint ){
            uint curr_stage=9;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stage=i;
                    i=total_stages;
               }
            }
            return curr_stage;
        }


        function get_curr_StageTime()  public view returns(uint ){
            uint curr_stageTime=9;

            for(uint i=0;i<total_stages;i++)
            {
               if( block.timestamp <= presale[i].endTime )
               {
                    curr_stageTime = presale[i].endTime;
                    i=total_stages;
               }
            }
            return curr_stageTime;
        }


        function get_MaticPrice()  public view returns(uint ){
            uint price;
            uint curr_stage = get_curr_Stage();
            price = uint256(getConversionRate( int256(presale[curr_stage].price)));

            return price;

        }


        function sendRewardToReferrals(address investor,uint _investedAmount,uint choosed_token)  internal  //this is the freferral function to transfer the reawards to referrals
        { 

            address temp = investor;       
            uint[] memory percentage = new uint[](5);
            percentage[0] = 5;
            percentage[1] = 3;
            percentage[2] = 1;

            uint remaining = _investedAmount;


            if((choosed_token==0 && ((get_MaticPrice() * _investedAmount) /1 ether) >= min_refPurchase) || (choosed_token==1 &&  _investedAmount >= min_refPurchase))
            {
                for(uint i=0;i<3;i++)
                {
                    
                    if(user[temp].upliner!=address(0))
                    {

                        temp = user[temp].upliner;
                        uint reward1 = ((percentage[i] * 1 ether) * _investedAmount)/100 ether;

                        if(doublDirectPercentage_promo && i==0)
                        {
                            reward1*=2;
                        }
                    
                        if(choosed_token==0)
                        {
                            payable(temp).transfer(reward1);
                        }
                        else{
                            TOKEN(DAI_token).transferFrom(msg.sender,temp,reward1);

                        }

                        user[temp].referralLevel[i].earning+=reward1 ;                  
                        user[temp].referralLevel[i].count++;
                        remaining-=reward1;
                    } 
                    else
                    {
                        break;
                    }

                }
                
                temp = user[investor].upliner; 
                uint j=21;
                for(uint i=0;i<21;i++)
                {

                    
                    if(temp != address(0) &&  user[temp].isCso)
                    {

                        uint reward1 = ( 2 ether * _investedAmount)/100 ether;
                        
                        if(choosed_token==0)
                        {
                            payable(temp).transfer(reward1);
                        }
                        else{
                            TOKEN(DAI_token).transferFrom(msg.sender,temp,reward1);

                        }

                        j=i+1;
                        user[temp].Cso_Earning+=reward1 ;                  
                        remaining-=reward1;  
                        i=21;              
                    } 
                    else
                    {
                        temp = user[temp].upliner;
                    }

                }

                temp = user[investor].upliner; 

                for(uint i=0;i<j;i++)
                {

                    
                    if(temp != address(0) &&  user[temp].isEmb)
                    {

                        uint reward1 = ( 1 ether * _investedAmount)/100 ether;

                        if(choosed_token==0)
                        {
                            payable(temp).transfer(reward1);
                        }
                        else{
                            TOKEN(DAI_token).transferFrom(msg.sender,temp,reward1);

                        }

                        user[temp].Emb_Earning+=reward1 ;                  
                        remaining-=reward1;  
                        i=j;              
                    } 
                    else
                    {
                        temp = user[temp].upliner;
                    }

                }

            }            
            

            
            if(choosed_token==0)
            {
                payable(owner).transfer(remaining);
            }
            else{                                                             
                                                            
                TOKEN(DAI_token).transferFrom(msg.sender,owner,remaining);

            }

        }

        function buy_token(uint amount ,address _referral ,uint choosed_token )  public payable returns(bool){
            
            require(choosed_token == 0 || choosed_token ==1);


            uint curr_stage = get_curr_Stage();
            uint bought_token;

            if(user[msg.sender].investBefore == false)
            {   
                user[msg.sender].investBefore=true;

                if(_referral==address(0) || _referral==msg.sender)                                         //checking that investor comes from the referral link or not
                {

                    user[msg.sender].upliner = owner;
                }
                else
                {
                   
                    user[msg.sender].upliner = _referral;
                    user[_referral].team.push(msg.sender);
                
                    
                }
            }

            if(choosed_token==0)             // MATIC
            {
                require(((get_MaticPrice() * msg.value) /1 ether) >= min_purchase);

                bought_token = (msg.value *10**18) / get_MaticPrice();
                require(TOKEN(samartian_token).balanceOf(address(this)) >= bought_token);
                
                presale[curr_stage].total_sold+=bought_token;
                total_soldSupply+=bought_token;
                
                sendRewardToReferrals( msg.sender, msg.value,choosed_token);

                if(doubleToken_promo)
                {
                    TOKEN(samartian_token).transfer(msg.sender,bought_token*2);
                }
                else
                {
                    TOKEN(samartian_token).transfer(msg.sender,bought_token);
                }




            }
            else if(choosed_token==1)        // USDT
            {
                require(amount >= min_purchase);

                bought_token = (amount*10**18) / presale[curr_stage].price;

                require(TOKEN(DAI_token).balanceOf(msg.sender) >= amount ,"not enough usdt");
                require(TOKEN(DAI_token).allowance(msg.sender,address(this))>= amount ,"less allowance");    //uncomment

                require(TOKEN(samartian_token).balanceOf(address(this)) >= bought_token,"contract have less tokens");
                
                presale[curr_stage].total_sold+=amount;
                total_soldSupply+=amount;            
                sendRewardToReferrals( msg.sender, amount,choosed_token);
                if(doubleToken_promo)
                {
                    TOKEN(samartian_token).transfer(msg.sender,bought_token*2);

                }
                else{
                    TOKEN(samartian_token).transfer(msg.sender,bought_token);

                }

                

            }

            total_raised += (((presale[curr_stage].price * bought_token)/10**18)/10**12);
            presale[curr_stage].amount_raised += (((presale[curr_stage].price * bought_token)/10**18)/10**12);

            return true;
        }

        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner);
            owner = payable(_owner);
        }


        function update_currPhase_price(uint _price)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            presale[curr_stage].price=_price;
        }

        function increase_currPhase_time(uint _days)  public
        {
            require(msg.sender==owner);
            uint curr_stage=get_curr_Stage();
            for(uint i=curr_stage;i<total_stages;i++)
            {
                presale[i].endTime += ( _days * 1 days);
            }
        }


        function curr_time() public view returns(uint){

            return block.timestamp;

        }

        function referralLevel_earning(address _add) public view returns( uint[] memory arr1 )
        {
            uint[] memory referralLevels_reward=new uint[](3);
            for(uint i=0;i<3;i++)
            {
               
                referralLevels_reward[i] = user[_add].referralLevel[i].earning;


            }
            return referralLevels_reward ;


        }



        function referralLevel_count(address _add) public view returns( uint[] memory _arr )
        {
            uint[] memory referralLevels_reward=new uint[](3);
            for(uint i=0;i<3;i++)
            {

                referralLevels_reward[i] = user[_add].referralLevel[i].count;

            }
            return referralLevels_reward ;


        }
        
        function getallCso() public view returns( address[] memory _arr )
        {
            return Cso_arr ;
        }

        function getallEmb() public view returns( address[] memory _arr )
        {
            return Emb_arr ;
        }

       function withdraw_SMT(uint _amount)  public
        {
            require(msg.sender==owner);
            uint bal = TOKEN(samartian_token).balanceOf(address(this));
            require(bal>=_amount);
            TOKEN(samartian_token).transfer(owner,_amount); 
        }
        
       function set_doubleToken_Promo(bool _val)  public
        {
            require(msg.sender==owner);
            doubleToken_promo=_val;
        }
        
        function set_doubleDirectpercentage_Promo(bool _val)  public
        {
            require(msg.sender==owner);
            doublDirectPercentage_promo=_val;
        }

        function set_CSO(address _add)  public
        {
            require(msg.sender==owner);
            user[_add].isCso=true;

            Cso_arr.push(_add); 
        }
        
        function set_EMB(address _add)  public
        {
            require(msg.sender==owner);
            user[_add].isEmb=true;

            Emb_arr.push(_add); 
        }
        function set_minPurchase(uint _val)  public
        {
            require(msg.sender==owner);
            min_purchase=_val;
        }
        function set_minRefPurchase(uint _val)  public
        {
            require(msg.sender==owner);
            min_refPurchase=_val;
        }
    }