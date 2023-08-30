import { useState, useEffect } from "react";
import Web3 from "web3";

import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES} from "@web3auth/base"

const NETWORK = 'rinkeby';
const RINKEBY_CHAINID = 4;
const MAINNET_CHAINID = 1;

const ethChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x4",
  rpcTarget: `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
  displayName: "rinkeby",
  blockExplorer: "https://rinkeby.etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};
// We are initializing with EIP155 namespace which
// will initialize the modal with ethereum mainnet
// by default.
const web3auth = new Web3Auth({
  chainConfig: ethChainConfig,
  clientId: "BE83lwjSZWqzq5RK8otCMICiozL8nZX2iUvIC09inwiSoILK8L1pXwda_fPaVFAWXC4BXTd5G_7EGBlEXMSEN9M" // get your clientId from https://developer.web3auth.io
});

export default function Web3Login() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initWeb3()
  }, [])

  const initWeb3 = async () => {
    setLoading(false)
    await web3auth.initModal();
    setLoading(true)
  }

  const onLogin = async () => {
    try {
      await web3auth.connect();
      const web3 = new Web3(web3auth.provider);
      web3auth.provider.on('accountsChanged', function (accounts) {
        // if (accounts[0] !== account) {
        console.log("change", accounts[0]);
        // }
      });
      web3auth.provider.on('networkChanged', function (networkId) {
        if (Number(networkId) !== (NETWORK === 'rinkeby' ? RINKEBY_CHAINID : MAINNET_CHAINID)) {
          console.log(`Connect to network on metamask.`);
          return;
        }
      });
      const address = (await web3.eth.getAccounts())[0];
      const balance = await web3.eth.getBalance(address);
      console.log(await web3auth.getUserInfo())
      console.log(address, balance)
    } finally {
    }
  };

  const onLogout = async() => {
    try{
      await web3auth.logout()
      console.log('logout')

    }catch(err){
      console.log(err.message)
    }
  }

  if (!loading) {
    return <div>loading...</div>
  }
  return <>
    <button onClick={onLogin}>Login</button>
    <button onClick={onLogout}>Logout</button>
  </>;
}