const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;
const rp = require('request-promise');

const app = express();

const port = process.argv[2];

const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var blockchain = require('./blockchain.js');
var bitcoin = new blockchain();

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({
        note: `Transaction will be added in block ${blockIndex}.`,
        transaction: newTransaction
    });
});

app.post('/transaction/broadcast', function (req, res) {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
        .then(data => {
            res.json({
                note: 'Transaction created and broadcast successfully.',
                transaction: newTransaction
            });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error broadcasting transaction.' });
        });
})

app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: 'New block mined successfully',
        block: newBlock
    });
});

app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl); {
        const regNodesPromises = [];
        bitcoin.networkNodes.forEach(networkNodeUrl => {
            const requestOptions = {
                uri: networkNodeUrl + '/register-node',
                method: 'POST',
                body: { newNodeUrl: newNodeUrl },
                json: true
            };
            regNodesPromises.push(rp(requestOptions));
        });
        Promise.all(regNodesPromises)
            .then(data => {
                const bulkRegisterOptions = {
                    uri: newNodeUrl + '/register-nodes-bulk',
                    method: 'POST',
                    body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
                    json: true
                };
                return rp(bulkRegisterOptions);
            })
            .then(data => {
                res.json({
                    note: 'New node registered with network successfully.'
                });
            })
    }
});

app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1 && bitcoin.currentNodeUrl !== newNodeUrl) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({
        note: 'New node registered successfully.'
    });
});

app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        if (bitcoin.networkNodes.indexOf(networkNodeUrl) == -1 && bitcoin.currentNodeUrl !== networkNodeUrl) {
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    });
    res.json({
        note: 'Bulk registration successful.'
    });
});

app.listen(port, function () {
    console.log(`Blockchain API is running on port ${port}`);
});