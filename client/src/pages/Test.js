/* eslint-disable */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
import Web3 from 'web3'
import { toast } from 'react-toastify';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { Typography, useMediaQuery, Stack,Button, InputBase } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Stack from '@material-ui/core/Stack'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
// import { LoadingButton } from '@material-ui/lab';
import LoadingButton from '@material-ui/lab/LoadingButton'
import WertWidget from '@wert-io/widget-initializer';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS, CustomChainConfig } from "@web3auth/base";
import Torus from '@toruslabs/torus-embed'
//
import { setModal, setQuantity, setWallet } from '../actions/manager';
import { hasEnoughEth, mint, getTotalMinted, getSignatureForMint, shortAddress, renameNFT, hasEnoughEthForRename, getSignatureForRename, getGroupId, getContractOwner } from '../lib/mint';
import AlertDialog from './AlertDialog';
import { IconButton } from '@material-ui/core';

const PRICE = Number(process.env.REACT_APP_PRICE)
const RENAME_PRICE = process.env.REACT_APP_RENAME_PRICE


// ----------------------------------------------------------------------
const NETWORK = process.env.REACT_APP_NETWORK;
const CHAIN_ID = Number(process.env.REACT_APP_MAINNET_ID)
// const CHAIN_ID = 3

const ethChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: `https://${NETWORK}.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
  displayName: `${NETWORK}`,
  blockExplorer: `https://etherscan.io/`,
  ticker: "ETH",
  tickerName: "Ethereum",
};
// We are initializing with EIP155 namespace which
// will initialize the modal with ethereum mainnet
// by default.
const web3auth = new Web3Auth({
  chainConfig: ethChainConfig,
  clientId: process.env.REACT_APP_CLIENT_ID // get your clientId from https://developer.web3auth.io
});

const RootStyle = styled('div')(({ theme }) => ({
  // paddingTop: theme.spacing(15),
  padding: theme.spacing(3),
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15)
  }
}));

const ButtonStyle = styled(Button)(({ theme }) => (
  {
    borderRadius: 0,
    minWidth: '10px',
    backgroundColor: '#0f2938'
  }
));

const ConnectButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 0,
  width: '200px'
}));


// ----------------------------------------------------------------------

export default function Test() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [quantity, setQuantity] = useState(1);
  const quantity = useSelector(state => state.manager.quantity)
  const wallet = useSelector(state => state.manager.wallet)
  const [initWeb3, setInitWeb3] = useState(false);
  const [minting, setMinting] = useState(false);
  const [buying, setBuying] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [web3authReady, setWeb3authReady] = useState(false)
  const [totalMinted, setTotalMinted] = useState(0);
  const [tokenId, setTokenId] = useState(-1)
  const [name, setName] = useState("")

  useEffect(() => {
    if (getGroupId(id) === -1) {
      navigate('/', { replace: true })
    }
    if (window.ethereum && !initWeb3) {
      setInitWeb3(true);
      window.web3 = new Web3(window.ethereum);

      window.ethereum.on('accountsChanged', function (accounts) {
        // if (accounts[0] !== account) {
        console.log("change", accounts[0]);
        conMetamask();
        // }
      });

      window.ethereum.on('networkChanged', function (networkId) {
        if (Number(networkId) !== CHAIN_ID) {

          dispatch(setModal(true, `Connect to ${NETWORK} network.`));
          return;
        }
        conMetamask();
      });

      conMetamask();
    } else {
      // initWeb3Modal()
    }
    setTotal()
    // getRyoshiBalance(account, zksyncWallet);
  }, []);

  /// window.ethereum used to get addrss
  const conMetamask = async (e) => {
    // console.log(e);
    if (window.ethereum) {
      try {
        // const addressArray = await window.ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        // window.web3 = new Web3(window.ethereum);
        //   console.log("account",addressArray[0]);
        const chainId = await window.ethereum.request({
          method: "eth_chainId"
        });
        if (Number(chainId) !== CHAIN_ID) {
          console.log(chainId)
          dispatch(setModal(true, `Connect to ${NETWORK} network on metamask.`));
          return;
        }
        const accounts = await window.ethereum.enable();
        console.log(accounts);
        dispatch(setWallet(accounts[0]))
        window.localStorage.setItem('wallet', accounts[0])
        // console.log(await window.web3.eth.getBalance(accounts[0]));
        let groupId = getGroupId(id)
        if (groupId >= 0) {
          if (accounts[0] && e) {
            setMinting(true);
            if ((await getContractOwner()).toLowerCase() === accounts[0]) {
              if (await mint(accounts[0], quantity, groupId)) {
                dispatch(setModal(true, `${quantity} NFT Minted Successfully.`));
                setTotal();
              }
            } else {
              if (await hasEnoughEth(accounts[0], quantity)) {
                if (await mint(accounts[0], quantity, groupId)) {
                  dispatch(setModal(true, `${quantity} NFT Minted Successfully.`));
                  setTotal();
                }
              } else {
                dispatch(setModal(true, `Insufficient funds. Check your wallet balance. You need ${PRICE} ETH + GAS fee at ${accounts[0]}`));
              }
            }
            setMinting(false);
          }
        }
      } catch (err) {
        setMinting(false);
      }
    } else {
      dispatch(setModal(true, "Install web3 wallet"));
    }
  }

  // const initWeb3Modal = async () => {
  //   setWeb3authReady(false)
  //   // await web3auth.initModal();

  //   setWeb3authReady(true)
  // }

  // const login = async () => {
  //   try {
  //     await web3auth.connect();
  //     const web3 = new Web3(web3auth.provider);
  //     web3auth.provider.on('accountsChanged', function (accounts) {
  //       // if (accounts[0] !== account) {
  //       dispatch(setWallet(accounts[0]))
  //       window.localStorage.setItem('wallet', accounts[0])
  //       console.log("change", accounts[0]);
  //       // }
  //     });
  //     web3auth.provider.on('networkChanged', function (networkId) {
  //       if (Number(networkId) !== CHAIN_ID) {
  //         dispatch(setModal(true, `Connect to ${NETWORK} network.`));
  //         return;
  //       }
  //     });
  //     const address = (await web3.eth.getAccounts())[0];
  //     dispatch(setWallet(address))
  //     window.localStorage.setItem('wallet', address)
  //     const balance = await web3.eth.getBalance(address);
  //     console.log(await web3auth.getUserInfo())
  //     console.log(address, balance)
  //   } finally {
  //   }
  // };

  const login = async () => {
    try {
      const torus = new Torus();
      await torus.init();
      await torus.login(); // await torus.ethereum.enable()
      const web3 = new Web3(torus.provider);
      torus.provider.on('accountsChanged', function (accounts) {
        // if (accounts[0] !== account) {
        dispatch(setWallet(accounts[0]))
        window.localStorage.setItem('wallet', accounts[0])
        console.log("change", accounts[0]);
        // }
      });
      torus.provider.on('networkChanged', function (networkId) {
        if (Number(networkId) !== CHAIN_ID) {
          dispatch(setModal(true, `Connect to ${NETWORK} network.`));
          return;
        }
      });
      const address = (await web3.eth.getAccounts())[0];
      dispatch(setWallet(address))
      window.localStorage.setItem('wallet', address)
      const balance = await web3.eth.getBalance(address);
      // console.log(await web3auth.getUserInfo())
      console.log(address, balance)
    } finally {
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout()
      dispatch(setWallet(""))
      window.localStorage.setItem('wallet', "")
      console.log('logout')

    } catch (err) {
      console.log(err.message)
    }
  }

  const setTotal = async () => {
    let total = await getTotalMinted();
    setTotalMinted(total);
  }

  const changeQuantity = (e) => {
    if (e.target.value > 10) {
      return;
    }
    dispatch(setQuantity(e.target.value));
  }

  const changeTokenId = (e) => {
    if (e.target.value >= 0 && e.target.value <= 10000) {
      setTokenId(e.target.value)
    } else {
      dispatch(setModal(true, 'please input correct token ID'))
    }
  }

  const changeName = (e) => {
    let name = e.target.value.trim();
    setName(name)
  }

  const handleBuy = async () => {
    if (wallet) {
      buy()
    } else {
      login()
    }
  }

  const buy = async () => {
    setBuying(true)
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    let groupId = getGroupId(id)
    if (groupId >= 0) {
      let signature = await getSignatureForMint(wallet, quantity, groupId)
      const signedData = signSmartContractData({
        address: wallet, //user wallet
        commodity: 'ETH',
        commodity_amount: (PRICE * quantity).toString(),
        pk_id: 'key2',
        sc_address: process.env.REACT_APP_NFT_ADDRESS,//ropsten abc contract
        sc_id: uuidv4(), // must be unique for any request
        sc_input_data: signature,
      }, privateKey);

      const otherWidgetOptions = {
        partner_id: process.env.REACT_APP_PARTNER_ID,
        container_id: 'wert-widget',
        click_id: uuidv4(), // unique id of purhase in your system
        // origin: 'https://sandbox.wert.io', // this option needed only for this example to work
        origin: 'https://widget.wert.io', // this option needed only for this example to work
        width: 400,
        height: 600,
      };

      const wertWidget = new WertWidget({
        ...signedData,
        ...otherWidgetOptions,
      });

      window.open(wertWidget.getRedirectUrl())
    }
    setBuying(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(wallet)
    toast.info(`address copied.`, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
    });
  }

  const rename = async () => {
    if (tokenId < 0 || tokenId > 9999) {
      dispatch(setModal(true, `Please input correct token ID`))
      return
    }
    if (name.length < 3 || name.length > 20) {
      dispatch(setModal(true, `Please input 3~20 characters for name`))
      return
    }
    try {
      setRenaming(true)

      if (initWeb3 && wallet) {
        if (await hasEnoughEthForRename(wallet)) {
          if (await renameNFT(wallet, tokenId, name)) {
            dispatch(setModal(true, `Your NFT name was changed to "${name}"`))
          }
        } else {
          dispatch(setModal(true, `Your ETH balance is not enough for renaming`))
        }
      } else if (wallet) {
        const privateKey = process.env.REACT_APP_PRIVATE_KEY;
        let signature = await getSignatureForRename(wallet, tokenId, name)
        if (signature) {
          const signedData = signSmartContractData({
            address: wallet, //user wallet
            commodity: 'ETH',
            commodity_amount: RENAME_PRICE,
            pk_id: 'key2',
            sc_address: process.env.REACT_APP_NFT_ADDRESS,//ropsten abc contract
            sc_id: uuidv4(), // must be unique for any request
            sc_input_data: signature,
          }, privateKey);

          const otherWidgetOptions = {
            partner_id: process.env.REACT_APP_PARTNER_ID,
            container_id: 'widget',
            click_id: uuidv4(), // unique id of purhase in your system
            origin: 'https://sandbox.wert.io', // this option needed only for this example to work
            width: 400,
            height: 600,
          };

          const wertWidget = new WertWidget({
            ...signedData,
            ...otherWidgetOptions,
          });

          window.open(wertWidget.getRedirectUrl())
        } else {
          dispatch(setModal(true, `You can't rename ABC now. Please try later.`))
        }
      }

      setRenaming(false)
    } catch (err) {
      console.log(err.message)
    }
    setRenaming(false)
  }

  return (
    <RootStyle>
      <Stack direction='column'
        sx={{
          p: 3,
          border: '1px solid #1CCAFF',
          backgroundImage: 'repeating-linear-gradient(45deg,#0b1414,#0b1414 10px,#061724 10px,#061724 20px)'
        }}
        spacing={3} alignItems='center'
      >
        <Stack direction='column'>
          <Typography className='flux_title' variant="h2" color='primary.main' sx={{ textAlign: 'center' }}>
            Mint ABC NFTs
          </Typography>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <Typography variant="h6" color='common.white'>
              Total minted:
            </Typography>
            <Typography variant='h6' color='primary.main'>{`${totalMinted} / 10000`}</Typography>
          </Stack>
        </Stack>

        <Stack direction='column'>
          <Typography variant='h6' color='common.white' textAlign='center'>{`${PRICE} Eth + Gas fee`}</Typography>
          <Typography variant='h6' color='common.white' textAlign='center'>Max 10 ABCs per transactions</Typography>
        </Stack>
        <Stack direction={isDesktop ? 'row' : 'column'} justifyContent='center' spacing={1}>
          <Stack direction='row' sx={{ border: '1px solid #0E77B7', p: '5px', backgroundColor: '#0f2938' }}>
            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(quantity - 1 > 0 ? quantity - 1 : 1))}>-</ButtonStyle>
            <InputBase variant='outlined' type='number'
              fullWidth={true}
              inputProps={{
                min: 1, max: 10,
                sx: { textAlign: 'center' },
              }}
              value={quantity}
              onChange={changeQuantity}
            />
            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(quantity + 1 <= 10 ? quantity + 1 : 10))}>+</ButtonStyle>
          </Stack>
          <Stack direction='row' spacing={1}>

            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(3))}>3</ButtonStyle>
            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(5))}>5</ButtonStyle>
            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(10))}>10</ButtonStyle>
          </Stack>
        </Stack>
        {/* <Stack direction={isDesktop ? 'row' : 'column'} spacing={1}> */}
        {
          initWeb3 ?
            <>
              <ConnectButton loading={minting} loadingPosition='start' variant='contained' size='large' onClick={conMetamask}>{`MINT`}</ConnectButton>
              {
                minting && <Typography variant='body1' color='primary'>Processing - Please Wait</Typography>
              }
            </>
            :
            <>
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <Typography variant='body1' sx={{ color: 'white' }}>
                  {
                    wallet ? shortAddress(wallet) : 'No Wallet Detected'
                  }
                </Typography>
                {
                  wallet &&
                  <IconButton onClick={copy}>
                    <ContentCopyIcon />
                  </IconButton>
                }
              </Stack>
              <ConnectButton loading={buying} loadingPosition='start' variant='contained' size='large' onClick={handleBuy}>
                {wallet ? `Mint using Cash / Fiat` : `Create Wallet Using Email Address`}
              </ConnectButton>
            </>
        }
        {
          wallet &&
          <RouterLink to='/collection' style={{ textDecoration: 'none', color: 'yellow' }}>
            My Collection
          </RouterLink>
        }
        <a href={`https://etherscan.io/address/${process.env.REACT_APP_NFT_ADDRESS}`} target='_blank' style={{ textDecoration: 'none' }}>
          <Typography variant='body1' color='primary'>View Contract</Typography>
        </a>
      </Stack>
      <Stack direction='column'
        sx={{
          p: 3,
          border: '1px solid #1CCAFF',
          backgroundImage: 'repeating-linear-gradient(45deg,#0b1414,#0b1414 10px,#061724 10px,#061724 20px)'
        }}
        spacing={3} alignItems='center'
      >
        <Stack direction='column'>
          <Typography className='flux_title' variant="h4" color='primary.main' sx={{ textAlign: 'center' }}>
            Rename your ABC
          </Typography>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <Typography variant="h6" color='common.white'>
              {`${RENAME_PRICE} Eth + Gas fee`}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={isDesktop ? 'row' : 'column'} justifyContent='center' alignItems='center' spacing={1}>
          <Stack direction='row' spacing={1} >
            <InputBase variant='outlined' type='number' placeholder='Token ID'
              inputProps={{
                min: 1, max: 10,
                sx: { textAlign: 'center', width: '100px', border: '1px solid #0E77B7', p: '10px', backgroundColor: '#0f2938' },

              }}
              onChange={changeTokenId}
            />
          </Stack>
          <Stack direction='row'>

            <InputBase variant='outlined' type='text' placeholder='New Name (3-20 Characters)'
              inputProps={{
                sx: { textAlign: 'center', width: '200px', border: '1px solid white', border: '1px solid #0E77B7', p: '10px', backgroundColor: '#0f2938' },
              }}
              onChange={changeName}
            />
          </Stack>

          {
            ((initWeb3 && wallet) || wallet) &&
            <Stack direction='row' spacing={1}>
              <ConnectButton loading={renaming} loadingPosition='start' variant='contained' size='large' onClick={rename} sx={{ width: '100px' }}>{`RENAME`}</ConnectButton>
            </Stack>
          }
          {
            renaming && <Typography variant='body1' color='primary'>Processing - Please Wait</Typography>
          }
        </Stack>
      </Stack>
      <AlertDialog />
    </RootStyle >
  );
}
