const Blockchain = require("./blockchain.js");
const bitcoin = new Blockchain();

console.log("=== Testing Blockchain Demo ===\n");

// Test 1: Create some transactions and mine blocks
console.log("1. Creating transactions and mining blocks...");

// Create first transaction
const tx1 = bitcoin.createNewTransaction(100, "Alice", "Bob");
bitcoin.addTransactionToPendingTransactions(tx1);
console.log("Created transaction: Alice -> Bob (100 coins)");

// Mine first block
const lastBlock1 = bitcoin.getLastBlock();
const prevHash1 = lastBlock1['hash'];
const blockData1 = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock1['index'] + 1
};
const nonce1 = bitcoin.proofOfWork(prevHash1, blockData1);
const hash1 = bitcoin.hashBlock(prevHash1, blockData1, nonce1);
const block1 = bitcoin.createNewBlock(nonce1, prevHash1, hash1);
console.log(`Mined block ${block1.index} with nonce: ${nonce1}`);

// Create more transactions
const tx2 = bitcoin.createNewTransaction(50, "Bob", "Charlie");
bitcoin.addTransactionToPendingTransactions(tx2);
const tx3 = bitcoin.createNewTransaction(30, "Charlie", "Alice");
bitcoin.addTransactionToPendingTransactions(tx3);
console.log("Created transactions: Bob -> Charlie (50), Charlie -> Alice (30)");

// Mine second block
const lastBlock2 = bitcoin.getLastBlock();
const prevHash2 = lastBlock2['hash'];
const blockData2 = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock2['index'] + 1
};
const nonce2 = bitcoin.proofOfWork(prevHash2, blockData2);
const hash2 = bitcoin.hashBlock(prevHash2, blockData2, nonce2);
const block2 = bitcoin.createNewBlock(nonce2, prevHash2, hash2);
console.log(`Mined block ${block2.index} with nonce: ${nonce2}`);

// Test 2: Validate blockchain
console.log("\n2. Testing blockchain validation...");
const isValid = bitcoin.chainIsValid(bitcoin.chain);
console.log(`Blockchain is valid: ${isValid}`);

// Test 3: Display blockchain summary
console.log("\n3. Blockchain summary:");
console.log(`Total blocks: ${bitcoin.chain.length}`);
console.log(`Pending transactions: ${bitcoin.pendingTransactions.length}`);

// Test 4: Test address functionality
console.log("\n4. Testing address data...");
const aliceData = bitcoin.getAddressData("Alice");
console.log(`Alice's balance: ${aliceData.addressBalance} coins`);
console.log(`Alice's transactions: ${aliceData.addressTransactions.length}`);

const bobData = bitcoin.getAddressData("Bob");
console.log(`Bob's balance: ${bobData.addressBalance} coins`);

// Display the entire blockchain
console.log("\n5. Complete blockchain:");
console.log(JSON.stringify(bitcoin, null, 2));
