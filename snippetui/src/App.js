import { ethers } from "ethers"
import React, {useEffect, useState} from 'react'
import './App.css';
import abi from "./utils/SnippetsDApp.json"


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xaf78DC3161A89B4456cCB995BBBcF0E1f8f9C3E6";

  //variable here references the abi content
  const contractABI = abi.abi;
  const getEthereumObject = () => window.ethereum;

/*This function checks access to User's account,
      It returns the first linked account found*/
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    
    //to make sure we have access to the ethereum object.
    if (!ethereum) {
      console.error("Make sure you have Metamask!")
      return;
    } else {console.log("We have the Ethereum object", ethereum);}

    // this method asks metamask to give access to user's wallet
    const accounts = await ethereum.request({method: "eth_accounts"});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
    } else {
      console.error("No authorized account found");
    }
  } catch (error) {
    console.error(error);
  }
};

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert ("Get MetaMask!")
        return;
      }

      const accounts = await ethereum.request({method: "eth_accounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const snippet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const SnippetsDAppContract = new ethers.Contract( contractAddress, contractABI, signer);

        let count = await SnippetsDAppContract.getTotalSnippets();
        console.log("Retrieved total snippet counts...", count.toNumber());
      
        const snippetTxn = await SnippetsDAppContract.snippet(_message, {
          gasLimit: 300000,
        });
        console.log('Mining...', snippetTxn.hash);

        await snippetTxn.wait();
        console.log("Mined --", snippetTxn.hash);

        count = await SnippetsDAppContract.getTotalSnippets();
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllSnippets = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const SnippetsDAppContract = new ethers.Contract(contractAddress, contractABI, signer);
      
        const snippets = await SnippetsDAppContract.getAllSnippets(); //calls the getAllSnippets from contract

        const snippetsCleaned = snippets.map((wave) => {
          return {
            address: snippet.user,
            timestamp: new Date(snippet.timestamp * 1000),
            message: snippet.message,
          };
        });

        setAllSnippets(snippetsCleaned);

        SnippetsDAppContract.on("NewSnippet", (from, timestamp, message) => {
          console.log("NewSnippet", from, timestamp, message);

          setAllSnippets(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message
          }]);
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let SnippetsDAppContract;
  
    const onNewSnippet = (from, timestamp, message) => {
      console.log("NewSnippet", from, timestamp, message);
      setAllSnippets(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      SnippetsDAppContract = new ethers.Contract(contractAddress, contractABI, signer);
      SnippetsDAppContract.on("NewSnippet", onNewSnippet);
    }
  
    return () => {
      if (SnippetsDAppContract) {
        SnippetsDAppContract.off("NewSnippet", onNewSnippet);
      }
    };
  }, []);

    useEffect(() => {
    
    //To run function when app component is called
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    })
  }, []);

  const [snip, setSnippet] = useState('');
  const [showSnippet, setShowSnippet] = useState(false);

  const handleChange = (event) => {
    setSnippet(event.target.value);
    if (!event.target.value) {
      setShowSnippet(false);
    }
  };

  const handleClick = () => {
    if (snip) {
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
        className="snippetMessage"
        value={snip}
        onChange={handleChange}
        placeholder="Leave a snippet"/>
      <button className="submit" type='submit' onClick={() => {handleClick(); snippet()}} >Submit</button>
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
          <p className='snips'>{snip}</p>
        </div>
      ) : null}

      {getAllSnippets.map((snippet, index) => {
        return (
          <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
          <div>Address: {snippet.address}</div>
          <div>Time: {snippet.timestamp.toString()}</div>
          <div>Message: {snippet.message}</div>
        </div> 
        )
      })}
    </div>
  );
}

export default App;

