import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {fundMe} from "../ABIs/fundMe.js";
import { ethers } from 'ethers';
import { fetchSigner } from '@wagmi/core';
import { useState } from 'react';


const Home: NextPage = () => {

  const [amount,setAmount] = useState("");

  const handleAmountChange = (e:any) =>{
    setAmount(e.target.value)
  }
  const sendFund = async()=>{
    const signer:any = await fetchSigner();    
    
    try{
      const fundMeContract = new ethers.Contract("0x596e39c428e2255437D416eB818f81ae88FD9587",fundMe,signer);
      await fundMeContract.addFund({value: ethers.utils.parseEther(amount)});
    }catch(e)
    {
      alert(e);
    }
  }

  return (<><><h1>Buy me a coffee</h1>
    <ConnectButton></ConnectButton></>
    <label htmlFor="amount">Enter amount</label>
    <input type="text" onChange={handleAmountChange}></input>
    <button type="button" onClick={sendFund}>Submit</button>
    </>
  );
};
 
export default Home;
