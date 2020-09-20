const CustomERC721Token = artifacts.require("./CustomERC721Token.sol");
const SquareVerifier = artifacts.require("./SquareVerifier.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function (deployer) {
  await deployer.deploy(CustomERC721Token);
  const verifierContract = await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier, verifierContract.address);
};