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
const proof = require(`../test-proofs/${tokenId}/proof.json`);

(async () => {
    const provider = await new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`, 0);
    const web3 = await new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const contract = await new web3.eth.Contract(contractFile.abi, config.SolnSquareVerifier, { gasLimit: "4500000" });

    console.log(`Adding solution:\n- Token ID: ${tokenId}\n- Address: ${accounts[0]}\n- Input: ${proof.inputs}`);

    try {
        let result = await contract.methods.addSolution(...Object.values(proof.proof), proof.inputs, accounts[0], tokenId).send({ from: accounts[0], gas: config.gas });
        console.log(result)
    } catch (err) {
        throw (err);
    }

    process.exit(1);
    process.kill(process.pid);
})();
