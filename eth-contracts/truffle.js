const config = require('./config.json');
const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = config.infuraKey;
const mnemonic = config.mnemonic;

module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,       // rinkeby's id
      gas: config.gas,        // rinkeby has a lower block limit than mainnet
      gasPrice: config.gasPrice
    },
  },
  compilers: {
    solc: {
      version: "^0.5.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        // settings: {          // See the solidity docs for advice about optimization and evmVersion
        // optimizer: {
        //   enabled: true,
        //   runs: 200
        // },
        // evmVersion: "constantinople"
        //  evmVersion: "byzantium"
      // }
    }
  }
}
