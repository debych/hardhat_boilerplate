import { network } from 'hardhat';
const hre = require('hardhat');
import { TestERC20 } from '../typechain-types';

async function main() {
    const factory = await hre.ethers.getContractFactory('TestERC20');
    const contract = (await factory.deploy()) as TestERC20;

    await contract.deployed();

    console.log('Contract deployed to:', contract.address);

    await new Promise(r => setTimeout(r, 30000));

    await hre.run('verify:verify', {
        address: contract.address,
        constructorArguments: []
    });
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
