#!/usr/bin/env node
'use strict';

const config = require('./config.json');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = config.infuraKey;
const mnemonic = config.mnemonic;
const contractFile = require('./build/contracts/SolnSquareVerifier');

const argv = process.argv.slice(2);
const tokenId = argv[0];

(async () => {
    const provider = await new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`, 0);
    const web3 = await new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const contract = await new web3.eth.Contract(contractFile.abi, config.SolnSquareVerifier, { gasLimit: "4500000" });

    console.log(`Before minting, total tokens: ${(await contract.methods.totalSupply().call()).toString()}`);
    console.log(`Start minting Token ID: ${tokenId}\n- Address ${accounts[0]}`);

    try {
        let result = await contract.methods.mint(accounts[0], tokenId).send({ from: accounts[0], gas: config.gas });
        console.log(result)
    } catch (err) {
        throw err
    }

    console.log(`Minting completed, total tokens: ${(await contract.methods.totalSupply().call()).toString()}`);

    process.exit(1);
    process.kill(process.pid);
})();
