import { ethers } from "ethers"
import React, {useEffect, useState} from 'react'
import './App.css';

const getEthereumObject = () => window.ethereum;

/*This function checks access to User's account,
      It returns the first linked account found*/
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    
    //to make sure we have access to the ethereum object.
    if (!ethereum) {
      console.error("Make sure you have Metamask!")
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({method: "eth_accounts"});
    // this method asks metamask to give access to user's wallet

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert ("Get MetaMask!")
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    //To run function when app component is called
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    })
  }, []);

  const [snippet, setSnippet] = useState('');
  const [showSnippet, setShowSnippet] = useState(false);

  const handleChange = (event) => {
    setSnippet(event.target.value);
    if (!event.target.value) {
      setShowSnippet(false);
    }
  };

  const handleClick = () => {
    if (snippet) {
      setShowSnippet(true);
    }
  };

  return (
    <div className="App">
      <h1 className='head'>Snippets!</h1>
      <p>A comment, some advice, song lyrics, words that stuck with you, random words, random thoughts.</p>
      <p>Try out my first DApp, Leave a Snippet!</p>
      <input
        type="text"
        value={snippet}
        onChange={handleChange}
        placeholder="Leave a snippet"/>
      <button className="submit" type='submit' onClick={handleClick}>Submit</button>
      {/*
         * If there is no current Account render this button
         */}
        {!currentAccount && (
          <button className="connectwallet" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
 
      {showSnippet ? (
        <div className='feed'>
          <h2>Recent Snips</h2>
          <p className='snips'>{snippet}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;

