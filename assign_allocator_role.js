const setup = require("./setup");
const { id } = require("ethers");

const ADDRESS_TO_ASSING_ALLOCATOR_ROLE = "0x2c20Ef3fc0248FCA2DC57bcb202F2CAe504A9A66";
const ALLOCATOR_ROLE = id("ALLOCATOR_ROLE");
const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function main() {
    const { contract, wallet } = setup();

    if (await contract.hasRole(ALLOCATOR_ROLE, ADDRESS_TO_ASSING_ALLOCATOR_ROLE)) {
        console.log("Already has ALLOCATOR_ROLE");
        return;
    }

    if (await contract.hasRole(DEFAULT_ADMIN_ROLE, wallet.address)) {
        const transactionHash = await contract.grantRole(ALLOCATOR_ROLE, ADDRESS_TO_ASSING_ALLOCATOR_ROLE);
        console.log("Transaction Hash: ", transactionHash);

        return;
    } else {
        throw new Error("Cannot Allocate Role, Missing DEFAULT_ADMIN_ROLE");
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
