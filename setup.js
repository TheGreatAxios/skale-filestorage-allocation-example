const { Contract, Wallet, JsonRpcProvider } = require("ethers");
const FILESTORAGE_ABI = require("./abi.json");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FILESTORAGE_ADDRESS = "0xD3002000000000000000000000000000000000d3";

const endpoints = {
    "chaos": "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
    "nebula-testnet": "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
    "nebula": "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
}

module.exports = () => {
    if (PRIVATE_KEY === null) {
        throw new Error("Private Key Not Found");
    }

    const provider = new JsonRpcProvider(endpoints["chaos"]);
    const wallet = new Wallet(PRIVATE_KEY, provider);
    const contract = new Contract(FILESTORAGE_ADDRESS, FILESTORAGE_ABI, wallet);

    return { provider, wallet, contract };
}
