var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const totalAccountOne = 9;
    const totalAccountTwo = 6;
    const total = totalAccountOne + totalAccountTwo;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accountOne});

            // TODO: mint multiple tokens
            for (var i = 0; i < totalAccountOne; i++) {
                await this.contract.mint(accountOne, i, { from: accountOne });
            }

            for (var i = totalAccountOne; i < total; i++) {
                await this.contract.mint(accountTwo, i, { from: accountOne });
            }
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call();
            assert.equal(total, result);
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(accountOne);
            assert.equal(totalAccountOne, result);

            result = await this.contract.balanceOf(accountTwo);
            assert.equal(totalAccountTwo, result);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI(3);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", result);
        })

        it('should transfer token from one owner to another', async function () { 
            const lastTokenIdOfAccount2 = total - 1;
            await this.contract.transferFrom(accountTwo, accountOne, lastTokenIdOfAccount2, { from: accountTwo });
            let result = await this.contract.ownerOf(lastTokenIdOfAccount2);
            assert.equal(accountOne, result);

            // Checks the balanceOf each account is as expected.
            const newAccountOneBalance = totalAccountOne + 1;
            const newAccountTwoBalance = totalAccountTwo - 1;
            result = await this.contract.totalSupply.call();
            assert.equal(total, result);
            result = await this.contract.balanceOf(accountOne);
            assert.equal(newAccountOneBalance, result);
            result = await this.contract.balanceOf(accountTwo);
            assert.equal(newAccountTwoBalance, result);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accountOne});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(accountTwo, 1, { from: accountTwo });
            } catch (err) {
                assert.equal(err.reason, "Only contract owner can call this function");
            }
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner();
            assert.equal(accountOne, result);
        })

    });
})