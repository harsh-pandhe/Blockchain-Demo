const Blockchain = require("./blockchain.js");
const bitcoin = new Blockchain();

// bitcoin.createNewBlock(2389, "0", "0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9");
// bitcoin.createNewTrasaction(100, "Alice", "Bob");
// bitcoin.createNewBlock(2390, "0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9", "0000b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e");

// bitcoin.createNewTrasaction(50, "Bob", "Charlie");
// bitcoin.createNewTrasaction(30, "Charlie", "Alice");
// bitcoin.createNewBlock(2391, "0000b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e", "0000c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f");

// const previousBlockHash = "0000c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f";
// const currentBlockData = [
//     {
//         amount: 50,
//         sender: "Bob",
//         recipient: "Charlie",
//     },
//     {
//         amount: 30,
//         sender: "Charlie",
//         recipient: "Alice",
//     }
// ];
// const nonce = (bitcoin.proofOfWork(previousBlockHash, currentBlockData));
// console.log(nonce);
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// console.log(bitcoin.chainIsValid(bc1.chain));
