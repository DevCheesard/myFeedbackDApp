const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const SnippetsDAppContractFactory = await hre.ethers.getContractFactory("SnippetsDApp");
    const SnippetsDAppContract = await SnippetsDAppContractFactory.deploy();
    await SnippetsDAppContract.deployed();

    console.log("Contract deployed to:", SnippetsDAppContract.address);
    console.log("Contract deployed by:", owner.address);

    await SnippetsDAppContract.getTotalSnippets();

    const firstSnippetsTxn = await SnippetsDAppContract.snippet();
    await firstSnippetsTxn.wait();

    const secondSnippetsTxn = await SnippetsDAppContract.connect(randomPerson).snippet();
    await secondSnippetsTxn.wait();

    await SnippetsDAppContract.getTotalSnippets();
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