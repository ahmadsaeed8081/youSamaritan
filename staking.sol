//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
      function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }
contract YouSamartian_Staking
    {
       
        address  public owner;

        address Staking_token= 0x7Ed2D0e9C1a7F9f51115e0e70BDB55E7D652e35c; 
        address Reward_Token= 0x7Ed2D0e9C1a7F9f51115e0e70BDB55E7D652e35c; 

     mapping(address=>bool) public isUser;

        uint public totalusers;
        uint public penalty_percentage= 10 ether;

        uint public per_day_divider= 1 days;


        uint public totalbusiness; 
        mapping(uint=>address) public All_investors;

        struct allInvestments{

            uint investedAmount;
            uint withdrawnTime;
            uint DepositTime;
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            uint reward;
            uint apr;
            uint timeframe;
            uint pending_rew;


        }



        struct Data{

            mapping(uint=>allInvestments) investment;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
        }


        struct time_Apy
        {
            uint timeframe;
            uint APR;
        }
          mapping(address=>Data) public user;

            mapping(uint=>time_Apy) public details;

            mapping(address=>mapping(uint=>allInvestments)) public user_investments;

        constructor(){
            
            owner=msg.sender;              

            // details[0].timeframe=90 days;
            // details[1].timeframe=180 days;
            // details[2].timeframe=270 days;

            details[0].timeframe=90 minutes;
            details[1].timeframe=180 minutes;
            details[2].timeframe=270 minutes;
            
            details[0].APR=9;
            details[1].APR=36;
            details[2].APR=81;



        }





        function Stake(uint _investedamount,uint choose_val) external  returns(bool success)
        {
            require(details[choose_val].APR > 0," apr iss");
            require(_investedamount > 0,"value is not greater than 0");     //ensuring that investment amount is not less than zero

            require(Token(Staking_token).allowance(msg.sender,address(this))>=_investedamount,"allowance");

            if(user[msg.sender].investBefore == false)
            { 
                All_investors[totalusers]=msg.sender;
                isUser[msg.sender]=true;

                totalusers++;                                     
            }

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].withdrawnTime=block.timestamp + details[choose_val].timeframe ;  
            
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].investment[num].apr=details[choose_val].APR;
             user[msg.sender].investment[num].timeframe=(details[choose_val].timeframe/per_day_divider) ;  


            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;


            Token(Staking_token).transferFrom(msg.sender,address(this),_investedamount);
            user_investments[msg.sender][num] = user[msg.sender].investment[num];
            user[msg.sender].investBefore=true;

            return true;
            
        }

        function get_TotalReward() view public returns(uint){ 
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(!user[msg.sender].investment[i].unstake)
                {
                    if(block.timestamp < user[msg.sender].investment[i].withdrawnTime)
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    }
                    else
                    {    
                        depTime =user[msg.sender].investment[i].withdrawnTime - user[msg.sender].investment[i].DepositTime;
                    }                
                }
                else{

                    if(user[msg.sender].investment[i].unstakeTime <= user[msg.sender].investment[i].withdrawnTime)
                    {
                        depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                    }
                    else if(user[msg.sender].investment[i].unstakeTime > user[msg.sender].investment[i].withdrawnTime)
                    {
                        depTime =user[msg.sender].investment[i].withdrawnTime - user[msg.sender].investment[i].DepositTime;
                    }                
                    
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[msg.sender].investment[i].investedAmount * ((user[msg.sender].investment[i].apr) *10**18) )/ (100*10**18) )/(user[msg.sender].investment[i].timeframe));

                    totalReward += depTime * rew;
                }
            }
            totalReward -= user[msg.sender].totalWithdraw_reward;

            return totalReward;
        }

        function getReward_perInv(uint i, address add) view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;

                if(!user[add].investment[i].unstake)
                {
                    if(block.timestamp < user[add].investment[i].withdrawnTime)
                    {
                        depTime =block.timestamp - user[add].investment[i].DepositTime;
                    }
                    else
                    {    
                        depTime =user[add].investment[i].withdrawnTime - user[add].investment[i].DepositTime;
                    }     
                }
                else
                {
                    if(user[add].investment[i].unstakeTime <= user[add].investment[i].withdrawnTime)
                    {
                        depTime =user[add].investment[i].unstakeTime - user[add].investment[i].DepositTime;
                    }
                    else if(user[add].investment[i].unstakeTime > user[add].investment[i].withdrawnTime)
                    {
                        depTime =user[add].investment[i].withdrawnTime - user[add].investment[i].DepositTime;
                    }

                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[add].investment[i].investedAmount * ((user[add].investment[i].apr) *10**18) )/ (100*10**18) )/(user[add].investment[i].timeframe));


                    totalReward += depTime * rew;
                }
            

            return totalReward;
        }



        function withdrawReward() external returns (bool success){
            uint Total_reward = get_TotalReward();
            require(Total_reward>0,"you dont have rewards to withdrawn");         //ensuring that if the investor have rewards to withdraw
        
            Token(Reward_Token).transfer(msg.sender,Total_reward);             // transfering the reward to investor             
            user[msg.sender].totalWithdraw_reward+=Total_reward;

            return true;

        }



        function unStake(uint num) external  returns (bool success)
        {


            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");             //checking that he invested any amount or not
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;

           if(user[msg.sender].investment[num].withdrawnTime > block.timestamp)
            {
                uint penalty_fee=(amount*(penalty_percentage))/(100*10**18);
                Token(Staking_token).transfer(owner,penalty_fee);            
                amount=amount-penalty_fee;
            }
            Token(Staking_token).transfer(msg.sender,amount);             //transferring this specific investment to the investor
          
            user[msg.sender].investment[num].unstake =true;    
            user[msg.sender].investment[num].unstakeTime =block.timestamp;    

            user[msg.sender].totalInvestment-=user[msg.sender].investment[num].investedAmount;
            user_investments[msg.sender][num] = user[msg.sender].investment[num];


            return true;

        }

        function getTotalInvestment() public view returns(uint) {   //this function is to get the total investment of the ivestor
            
            return user[msg.sender].totalInvestment;

        }

        function get_pending_Rew(address add, uint num) public view returns(uint)
        {  
            return (user[add].investment[num].investedAmount * (user[add].investment[num].apr * 1 ether)/ 100 ether) - (getReward_perInv(num,add));
        }

        function getAll_investments() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if(!user[msg.sender].investment[i].unstake )
               {
                   temp++;
               }

            }
         
           allInvestments[] memory temp_arr =  new allInvestments[](temp) ;
            Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( !user[msg.sender].investment[i].unstake ){

                   temp_arr[currentIndex]=user[msg.sender].investment[i];
                    temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);
                    temp_arr[currentIndex].pending_rew=get_pending_Rew(msg.sender,i);

                   currentIndex++;
               }

            }

            uint count=temp;
            for(uint i=0;i<temp;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }

        function getAll_investments_forReward() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint currentIndex;
            
         
            allInvestments[] memory temp_arr =  new allInvestments[](num) ;
            Invested =  new allInvestments[](num) ;

            for(uint i=0;i<num;i++)
            {

                temp_arr[currentIndex]=user[msg.sender].investment[i];
                temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);
                temp_arr[currentIndex].pending_rew = get_pending_Rew(msg.sender,i);

                currentIndex++;
               

            }

            uint count=num;
            for(uint i=0;i<num;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }
        
  
        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            owner = _owner;
        }


        function Set_penalty_percentage(uint _val)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            penalty_percentage = _val;
        }


        function total_withdraw_reaward() view public returns(uint)
        {
            uint Temp = user[msg.sender].totalWithdraw_reward;
            return Temp;
        }

        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        
        function get_withdrawnTime(uint num) public view returns(uint)
        {
            return user[msg.sender].investment[num].withdrawnTime;
        }


       function withdrawFunds(uint _amount)  public
        {
            require(msg.sender==owner);
            uint bal = Token(Staking_token).balanceOf(address(this));
            require(bal>=_amount);

            Token(Staking_token).transfer(owner,_amount); 
        }



    } 