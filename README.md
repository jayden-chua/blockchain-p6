# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product.

# Project Resources

* Node version 10.16.3
* npm version 6.9.0
* Truffle v5.0.6 (core: 5.0.6)
* Solidity v0.5.0 (solc-js)
* Ganache CLI v6.10.2 (global install)

# Install dependencies
Before starting to work on the project, install the required packages.
```
npm install
```

If you don't have ganache, install ganache cli

```
npm install -g ganache-cli
```

# How to test contracts
Change directory into `eth-contracts`.
```
cd eth-contracts
```
Run ganache-cli in a separate window.
```
ganache-cli
```
Compile the contracts with.
```
truffle compile
```
Test the contracts with
```
truffle test
```
Or individually with
```
truffle test ./test/TestERC721Mintable.js
```

# How to generate proofs with zokrates

Here are the steps to generate zokrates proofs.

Step 1:
```
docker run -v <your-working-directory>/zokrates/code/:/home/zokrates/code -ti zokrates/zokrates /bin/bash
```

Step 2: Now you are in the Docker containers bash. Change into the square directory
```
cd code/square/
```

Step 3: Compile the program
```
../../.zokrates/bin/zokrates compile -i square.code
````

Step 4: Generate the trusted setup
```
../../.zokrates/bin/zokrates setup
```

Step 5: Compute witness
```
../../.zokrates/bin/zokrates compute-witness -a 3 9
```

Step 6: Generate proof
```
../../.zokrates/bin/zokrates generate-proof
```

Step 7: Export verifier
```
../../.zokrates/bin/zokrates export-verifier
```

To meet the requirements of the rubics of this project, 10 proofs have been generated already. This was done by repeating steps 5 and 6 with different arguments, for example 0 9, 1 8 etc...

All proofs can be found in `./test-proofs` in their respective folders. This will be used in later steps.

# How to deploy to Rinkeby

Within `eth-contracts` there is a `config.json` here is where all the required keys and contract address are stored. Enclosed is the keys of my current deployment.

If you want to deploy your own, change the `config.json` file parameters as required.

To deploy to Rinkeby, check `truffle.js`to ensure all settings are inplace. Then run the following command.

```
truffle migrate --network rinkeby --reset
```


# How to submit solution

You can use the helper script to add the solution, the script accepts one argument, the tokenId. In the following example the tokenId is 1. Make sure that you have the proofs generated in the above steps and placed it in the `test-proofs` folder.

```
node add-solution.js 1
```

# How to mint tokens

Once the solution has been added we can now mint the token and a script has also been written that accepts the tokenId as the argument

```
node mint-token.js 1
```

# Notes
- Deployment log is save in `deployment.txt`
- Proofs used for minting token is saved in `test-proofs`


# Opensea Properties
https://rinkeby.opensea.io/assets/unidentified-contract-v780

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
