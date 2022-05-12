import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-contract-sizer';

import { SolcUserConfig } from 'hardhat/types'

const path = require("path");
const envConfig = require('dotenv').config({path: path.resolve(__dirname, '.env')});
const {
    ETHERSCAN_API_KEY,
    BSCSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    MNEMONIC,
    INFURA_ID_PROJECT,
    BSC_RPC_KEY
} = envConfig.parsed || {};


const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.8.9',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      loggingEnabled: false,
      accounts:{
        count:100
      }
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID_PROJECT}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_ID_PROJECT}`,
      chainId: 3,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID_PROJECT}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_ID_PROJECT}`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID_PROJECT}`,
      chainId: 42,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`],
      gasPrice: 8000000000
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545`,
      chainId: 97,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`]
    },
    bsc: {
      url: `https://speedy-nodes-nyc.moralis.io/${BSC_RPC_KEY}/bsc/mainnet`,
      chainId: 56,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`]
    },
    polygonTestnet: {
      url: `https://rpc-mumbai.maticvigil.com`,
      chainId: 80001,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`],
    },
    polygon: {
      url: `https://rpc-mainnet.matic.quiknode.pro`,
      chainId: 137,
      accounts: [`0x${MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000'}`],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${BSCSCAN_API_KEY}`,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: true,
    runOnCompile: false,
  },
}
