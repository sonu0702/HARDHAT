// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    await simpleStorage.deployed();
    const number = await simpleStorage.number();
    //you can do number.toString() since number is bigNumber
    console.log("number from simplestorage function", number);
    const transactions = await simpleStorage.setNumber(12);
    //cmd hardhat to wait 1 block confirmation
    await transactions.wait(1)
    console.log("setnumber transactions from simplestorage function", transactions);
    const getnumber = await simpleStorage.number();

    console.log("getnumber from simplestorage function", getnumber);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
