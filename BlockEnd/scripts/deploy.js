const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const metadataURL = "ipfs://QmTP2LSaLYAtJKdKRfdnAtCHj7JJBd9wJ4CZupEua7hNuH/";
  
  const punksContract = await ethers.getContractFactory("PunkAliens");

  const deployedPunksContract = await punksContract.deploy(metadataURL);

  await deployedPunksContract.deployed();

  console.log("Contract Address:", deployedPunksContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});