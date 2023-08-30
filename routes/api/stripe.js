const express = require('express');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PK_TEST || 'sk_test_51JXxg2CDjQLWm9hRmboRlONQctPfntwi9shPzFFk1K84483Yv33l11x30v4aPE3o8CcUGa8du9fcRXUZ9XxL16bF00jW6TMFe9');
const router = express.Router();
const { ethers } = require('ethers')

/////   Get price of ETH / USD
const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const provider = new ethers.providers.JsonRpcProvider(mainnet)
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const eth_usd = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
const priceFeed = new ethers.Contract(eth_usd, aggregatorV3InterfaceABI, provider)

const NFT_PRICE = Number(process.env.NFT_PRICE)

const getEthPrice = async quantity => {
    try {
        let res = await priceFeed.latestRoundData()
        // Do something with roundData
        let ethPrice = res.answer / (10 ** 8)
        console.log("ETH / USD", ethPrice)
        return ethPrice
    } catch (err) {
        console.log(err.message)
        return null
    }
};

router.post("/create-payment-intent", async (req, res) => {
    const quantity = Number(req.body.quantity);
    // Create a PaymentIntent with the order amount and currency
    try {
        let ethPrice = await getEthPrice()
        let totalPrice = (quantity * NFT_PRICE * ethPrice * 100).toFixed(0)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,//cent or pense
            currency: process.env.STRIPE_CURRENCY || 'usd'
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        console.log(err.message);
    }

});

module.exports = router;