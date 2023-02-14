const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const SnippetsDAppContractFactory = await hre.ethers.getContractFactory("SnippetsDApp");
    const SnippetsDAppContract = await SnippetsDAppContractFactory.deploy();
    await SnippetsDAppContract.deployed();

    console.log("SnippetsDApp address: ", SnippetsDAppContract.address)
};

    const runMain = async () => {
        try {
            await main();
            process.exit(0);
        }   catch (error) {
            console.log(error);
            process.exit(1);
        }
};

runMain();
