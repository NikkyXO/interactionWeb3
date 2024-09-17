import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_MAINNET_API_KEY_URL,
      }
    },
    // for testnet
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      // url: process.env.LISK_RPC_URL!,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
      gasPrice: 1000000000,
    },
    "holesky": {
      url: process.env.INFURA_HOLESKY!,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
      gasPrice: 1000000000,
    },

    "sepolia": {
      url: process.env.INFURA_SEPOLIA!,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
      gasPrice: 1000000000,
    },

  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io/",
        },
      },
       {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: 'https://sepolia.infura.io/v3/',
          browserURL: "https://sepolia.infura.io/v3/"
        },
      },
 
    ],
  },
  sourcify: {
    enabled: false,
  },
  ignition: {
    requiredConfirmations: 1
  },
};