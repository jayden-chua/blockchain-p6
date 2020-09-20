pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './SquareVerifier.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token
{   
    SquareVerifier verifier;

    constructor(address verifierAddress) public {
        verifier = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        bytes32 solutionIndex;
        address solutionAddress;
        uint256 tokenId;
        bool exists;
        bool isMinted;
    }

    // TODO define an array of the above struct
    mapping(bytes32 => Solution) private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint256 => bytes32) private solutionsSubmitted;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 tokenId, address solutionAddress);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input, address account, uint256 tokenId) public {
        bytes32 solutionIndex = keccak256(abi.encodePacked(a, b, c, input));
        require(solutions[solutionIndex].exists != true, 'Solution already exists');
        require(verifier.verifyTx(a, b, c, input), 'Solution unable to be verfied');

        solutions[solutionIndex] = Solution({
            solutionIndex: solutionIndex,
            solutionAddress: account, 
            tokenId: tokenId, 
            exists: true,
            isMinted: false
        });
        solutionsSubmitted[tokenId] = solutionIndex;

        emit SolutionAdded(tokenId, account);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, uint256 tokenId) public returns(bool) {
        bytes32 solutionIndex = solutionsSubmitted[tokenId];
        require(solutionIndex != bytes32(0), 'Solution not submitted for token');
        require(solutions[solutionIndex].isMinted != true, 'Token has already been minted');

        solutions[solutionIndex].isMinted = true;
        return super.mint(to, tokenId);
    }
}




























