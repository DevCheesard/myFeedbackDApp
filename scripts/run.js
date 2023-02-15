const main = async () => {
    
    const SnippetsDAppContractFactory = await hre.ethers.getContractFactory("SnippetsDApp");
    const SnippetsDAppContract = await SnippetsDAppContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await SnippetsDAppContract.deployed();
    console.log("Contract address:", SnippetsDAppContract.address);

    //Get Contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    SnippetsDAppContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

    let snippetCount;
    snippetCount = await SnippetsDAppContract.getTotalSnippets();
    console.log(snippetCount.toNumber());

    const snippetTxn = await SnippetsDAppContract.snippet("This is snippet #1!");
    await snippetTxn.wait(); // wait for transaction to be mined

    const snippetTxn2 = await SnippetsDAppContract.snippet("This is snippet #2!");
    await snippetTxn2.wait(); // wait for transaction to be mined

    const [_, randomPerson] = await hre.ethers.getSigners();
    
    snippetTxn = await SnippetsDAppContract.connect(randomPerson).snippet("Another message!");
    await snippetTxn.wait(); // wait for transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

    let allSnippets = await SnippetsDAppContract.getAllSnippets();
    console.log(allSnippets);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
  };
  
  runMain();