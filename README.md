# Blockchain Demo

A complete blockchain implementation in Node.js featuring a distributed network of nodes, proof-of-work consensus, transaction broadcasting, and a RESTful API. This project demonstrates core blockchain concepts including mining, transaction validation, network consensus, and blockchain integrity verification.

## Features

- **Complete Blockchain Implementation**: Custom blockchain with blocks, transactions, and hashing
- **Proof of Work**: Mining algorithm with customizable difficulty
- **Distributed Network**: Multiple network nodes that can communicate and synchronize
- **Transaction System**: Create, broadcast, and validate transactions across the network
- **Consensus Algorithm**: Longest chain rule with blockchain validation
- **RESTful API**: Comprehensive HTTP endpoints for blockchain interaction
- **Address Balance Tracking**: Query balance and transaction history for any address
- **Block & Transaction Lookup**: Search functionality for blocks and transactions

## Project Structure

```
Blockchain-Demo/
├── dev/
│   ├── blockchain.js      # Core blockchain implementation
│   ├── networkNode.js     # HTTP API server for blockchain network
│   └── test.js           # Test file for blockchain functionality
├── package.json          # Dependencies and npm scripts
└── README.md            # Project documentation
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/harsh-pandhe/Blockchain-Demo.git
cd Blockchain-Demo
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Testing the Blockchain

Before running the network nodes, you can test the core blockchain functionality:

```bash
# Run the comprehensive test suite
node dev/test.js
```

This test will demonstrate:
- Transaction creation and mining
- Blockchain validation
- Address balance calculation
- Complete blockchain structure

### Running Network Nodes

The project includes npm scripts to run multiple blockchain nodes simultaneously:

```bash
# Terminal 1 - Node 1 (Port 3001)
npm run node_1

# Terminal 2 - Node 2 (Port 3002)
npm run node_2

# Terminal 3 - Node 3 (Port 3003)
npm run node_3

# Terminal 4 - Node 4 (Port 3004)
npm run node_4

# Terminal 5 - Node 5 (Port 3005)
npm run node_5
```

Each node runs on a different port and can communicate with other nodes in the network.

## API Endpoints

### Blockchain Information
- `GET /blockchain` - Get the entire blockchain

### Transactions
- `POST /transaction` - Add a transaction to pending transactions
- `POST /transaction/broadcast` - Create and broadcast a transaction to all network nodes
- `GET /transaction/:transactionId` - Get specific transaction details

### Mining
- `GET /mine` - Mine a new block with pending transactions

### Network Management
- `POST /register-and-broadcast-node` - Register a new node and broadcast to network
- `POST /register-node` - Register a node with current node
- `POST /register-nodes-bulk` - Bulk register multiple nodes
- `GET /consensus` - Synchronize with network using longest chain rule

### Block & Address Queries
- `GET /block/:blockHash` - Get specific block by hash
- `GET /address/:address` - Get address balance and transaction history

## API Usage Examples

### Create a Transaction
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/transaction/broadcast" -Method POST -ContentType "application/json" -Body '{"amount": 100, "sender": "ALICE123", "recipient": "BOB456"}'

# Linux/macOS (curl)
curl -X POST http://localhost:3001/transaction/broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "sender": "ALICE123",
    "recipient": "BOB456"
  }'
```

### Mine a Block
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/mine"

# Linux/macOS (curl)
curl http://localhost:3001/mine
```

### Get Blockchain
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/blockchain"

# Linux/macOS (curl)
curl http://localhost:3001/blockchain
```

### Register Network Nodes
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/register-and-broadcast-node" -Method POST -ContentType "application/json" -Body '{"newNodeUrl": "http://localhost:3002"}'

# Linux/macOS (curl)
curl -X POST http://localhost:3001/register-and-broadcast-node \
  -H "Content-Type: application/json" \
  -d '{"newNodeUrl": "http://localhost:3002"}'
```

### Check Address Balance
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/address/ALICE123"

# Linux/macOS (curl)
curl http://localhost:3001/address/ALICE123
```

### Synchronize Network
```bash
# PowerShell/Windows
Invoke-RestMethod -Uri "http://localhost:3001/consensus"

# Linux/macOS (curl)
curl http://localhost:3001/consensus
```

## Core Concepts

### Blockchain Structure
Each block contains:
- **Index**: Sequential block number
- **Timestamp**: Block creation time
- **Transactions**: Array of transactions included in the block
- **Nonce**: Number used in proof-of-work
- **Hash**: Unique block identifier
- **Previous Block Hash**: Hash of the previous block

### Proof of Work
- Uses SHA-256 hashing algorithm
- Mining difficulty: blocks must start with "1704"
- Miners compete to find the correct nonce value
- Reward: 12.5 coins per successfully mined block

### Network Consensus
- Implements "longest chain rule"
- Nodes synchronize by adopting the longest valid chain
- Automatic validation ensures blockchain integrity
- Distributed consensus prevents double-spending

### Transaction System
- Each transaction includes amount, sender, recipient, and unique ID
- Transactions are broadcast to all network nodes
- Pending transactions are included in the next mined block
- Address balances calculated from transaction history

## Dependencies

- **express**: Web framework for API endpoints
- **body-parser**: Parse incoming request bodies
- **sha256**: SHA-256 hashing for blocks
- **uuid**: Generate unique transaction IDs
- **request & request-promise**: HTTP client for node communication
- **crypto-js**: Additional cryptographic functions
- **nodemon**: Development tool for auto-restarting

## Development

### Testing
```bash
# Run the comprehensive blockchain test
node dev/test.js

# Expected output includes:
# - Transaction creation and mining demonstration
# - Blockchain validation results
# - Address balance calculations
# - Complete blockchain structure in JSON format
```

### Development Mode
The npm scripts use nodemon for automatic restart on file changes during development.

### Project Scripts
- `npm run node_1` through `npm run node_5`: Start blockchain nodes on ports 3001-3005
- `node dev/test.js`: Run the blockchain functionality test suite

## Example Output

When running `node dev/test.js`, you'll see output similar to:

```
=== Testing Blockchain Demo ===

1. Creating transactions and mining blocks...
Created transaction: Alice -> Bob (100 coins)
Mined block 2 with nonce: 64523
Created transactions: Bob -> Charlie (50), Charlie -> Alice (30)
Mined block 3 with nonce: 87265

2. Testing blockchain validation...
Blockchain is valid: true

3. Blockchain summary:
Total blocks: 3
Pending transactions: 0

4. Testing address data...
Alice's balance: -70 coins
Alice's transactions: 2
Bob's balance: 50 coins

5. Complete blockchain:
[JSON structure of the entire blockchain]
```

## Technical Details

- **Hashing Algorithm**: SHA-256
- **Consensus Mechanism**: Longest Chain Rule with Proof of Work
- **Mining Difficulty**: 4 leading characters ("1704")
- **Block Reward**: 12.5 coins
- **Network Protocol**: HTTP/REST API
- **Data Format**: JSON
- **Node.js Version**: Compatible with Node.js v18+

## Troubleshooting

### Common Issues

**Issue**: `TypeError: bitcoin.createNewTrasaction is not a function`
- **Solution**: This was a typo in earlier versions. The method is `createNewTransaction` (not `createNewTrasaction`).

**Issue**: Node won't start or port already in use
- **Solution**: Make sure no other processes are using ports 3001-3005, or modify the port numbers in package.json.

**Issue**: Mining takes too long
- **Solution**: The proof-of-work difficulty is set to "1704". You can modify this in the `proofOfWork` function in `blockchain.js` for faster testing.

**Issue**: Network nodes can't communicate
- **Solution**: Ensure all nodes are running and check firewall settings. Use `http://localhost:PORT` format for node URLs.

### Performance Notes
- Mining difficulty directly affects block creation time
- Each proof-of-work iteration tests a new nonce value
- Network size affects consensus synchronization time

## Educational Purpose

This project is designed for learning blockchain fundamentals:
- Understand how blocks are linked together
- Learn proof-of-work consensus mechanisms
- Explore distributed network synchronization
- Practice with blockchain data structures
- Experiment with mining and transaction creation

### Learning Path
1. **Start with the test file**: Run `node dev/test.js` to see the blockchain in action
2. **Examine the blockchain structure**: Review the JSON output to understand block relationships
3. **Experiment with the API**: Start network nodes and interact via HTTP endpoints
4. **Modify the code**: Try changing mining difficulty, reward amounts, or add new features
5. **Build a network**: Run multiple nodes and test consensus mechanisms

## Quick Start Guide

1. **Clone and install**:
   ```bash
   git clone https://github.com/harsh-pandhe/Blockchain-Demo.git
   cd Blockchain-Demo
   npm install
   ```

2. **Test the blockchain**:
   ```bash
   node dev/test.js
   ```

3. **Start a network node**:
   ```bash
   npm run node_1
   ```

4. **Test the API** (in another terminal):
   ```bash
   # PowerShell
   Invoke-RestMethod -Uri "http://localhost:3001/blockchain"
   ```

## License

This project is licensed under the MIT License. 📄 See the [LICENSE](LICENSE) file for more details.

## Author

**Harsh Pandhe**
- GitHub: [@harsh-pandhe](https://github.com/harsh-pandhe)

---

**Note**: This is a educational demonstration project. Do not use in production environments.


