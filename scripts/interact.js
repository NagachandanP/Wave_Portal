const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/WavePortal.sol/WavePortal.json");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await wavePortalContract.getTotalWaves();
    console.log("The message is: " + message);

    console.log("Updating the count...");
    const tx = await wavePortalContract.wave();
    await tx.wait();

    const newMessage = await wavePortalContract.getTotalWaves();
    console.log("The new message is: " + newMessage);
}

main();