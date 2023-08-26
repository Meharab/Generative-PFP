require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const HTTP_URL = process.env.HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: HTTP_URL,
      accounts: [PRIVATE_KEY], // 0x02d2DE48939909CeCd2b4Bd9E6B63845a9a8dCc1
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts: [PRIVATE_KEY], // 0x0D51a51aBCaC863A9369d135765a27f2e8725BBd
    },
    fuji: { 
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [PRIVATE_KEY], // 0x95E37c97A0ba851530357F41a53f5EA274605793
    },
  },
};