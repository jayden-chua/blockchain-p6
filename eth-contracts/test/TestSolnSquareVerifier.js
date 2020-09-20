const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');
const zkProof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const tokenID = 1;

    describe('SolnSquareVerifier ', () => {
        beforeEach(async () => {
            let squareVerifierContract = await SquareVerifier.new({ from: accountOne });
            this.contract = await SolnSquareVerifier.new(squareVerifierContract.address, {from: accountOne});
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should be able to add a new solution', async () => {
            let result = false;

            try {
                await this.contract.addSolution(...Object.values(zkProof.proof), zkProof.inputs, accountTwo, tokenID, { from: accountTwo });
                result = true;
            } catch (e) {
                console.log(e);
                result = false;
            }
            assert.equal(result, true);
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should be able to mint token for contract', async () => {
            let result = false;
            try {
                await this.contract.addSolution(...Object.values(zkProof.proof), zkProof.inputs, accountTwo, tokenID, { from: accountTwo });
                await this.contract.mint(accountTwo, tokenID, { from: accountOne });
                result = true
            } catch (e) {
                console.log(e);
                result = false;
            }
            assert.equal(result, true);
        });
    });
}); 