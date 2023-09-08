const setup = require("./setup");
const { id } = require("ethers");

const ADDRESS_TO_ASSIGN_SPACE = "0x2c20Ef3fc0248FCA2DC57bcb202F2CAe504A9A66";
const ALLOCATOR_ROLE = id("ALLOCATOR_ROLE");
const AMOUNT_OF_SPACE = 104857600;

async function main() {
    const { contract, wallet } = setup();

    const hasRole = await contract.hasRole(ALLOCATOR_ROLE, wallet.address);
    if (hasRole === false) {
        console.log("Missing ALLOCATOR_ROLE");
        return;
    }

    const transactionHash = await contract.reserveSpace(ADDRESS_TO_ASSIGN_SPACE, AMOUNT_OF_SPACE);
    console.log("Transaction Hash: ", transactionHash);

    return;
}

main()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
