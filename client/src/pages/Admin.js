/* eslint-disable */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
import Web3 from 'web3'
// material
import { useTheme, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Stack from '@material-ui/core/Stack'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
// import { LoadingButton } from '@material-ui/lab';
import LoadingButton from '@material-ui/lab/LoadingButton'
import { Web3Auth } from "@web3auth/web3auth";
//
import { setModal, setQuantity, setWallet } from '../actions/manager';
import { hasEnoughEth, giveaway, getTotalMinted, getGroupId } from '../lib/mint';
import AlertDialog from './AlertDialog';

const PRICE = Number(process.env.REACT_APP_PRICE)


// ----------------------------------------------------------------------
const NETWORK = process.env.REACT_APP_NETWORK;
const CHAIN_ID = Number(process.env.REACT_APP_MAINNET_ID)
// const CHAIN_ID = 3

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

export default function Admin() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [quantity, setQuantity] = useState(1);
  const quantity = useSelector(state => state.manager.quantity)
  const wallet = useSelector(state => state.manager.wallet)
  const [giveWallet, setGiveWallet] = useState('')
  const [initWeb3, setInitWeb3] = useState(false);
  const [minting, setMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);
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
            if (await hasEnoughEth(accounts[0], quantity)) {
              if (await giveaway(accounts[0], giveWallet, quantity, groupId)) {
                dispatch(setModal(true, `${quantity} NFT Minted Successfully.`));
                setTotal();
              }
            } else {
              dispatch(setModal(true, `Insufficient funds. Check your wallet balance. You need ${PRICE} ETH + GAS fee at ${accounts[0]}`));
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
            Gift a Bogan
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
        <InputBase variant='outlined' type='text' placeholder='Input give away address'
          inputProps={{
            sx: { textAlign: 'center', width: { md: '380px', xs: '300px' }, fontSize: { md: '14px', xs: '11px' }, border: '1px solid #0E77B7', p: '10px', backgroundColor: '#0f2938' },
          }}
          onChange={e => setGiveWallet(e.target.value)}
        />
        <Stack direction={isDesktop ? 'row' : 'column'} justifyContent='center' spacing={1}>
          <Stack direction='row' sx={{ border: '1px solid #0E77B7', p: '5px', backgroundColor: '#0f2938' }}>
            <ButtonStyle variant='outlined' onClick={() => dispatch(setQuantity(quantity - 1 > 0 ? quantity - 1 : 1))}>-</ButtonStyle>
            <InputBase variant='outlined' type='number'
              fullWidth={true}
              inputProps={{
                min: 1, max: 10,
                sx: { textAlign: 'center' }
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
          initWeb3 &&
          <>
            <ConnectButton loading={minting} loadingPosition='start' variant='contained' size='large' onClick={conMetamask}>{`Gift away`}</ConnectButton>
            {
              minting && <Typography variant='body1' color='primary'>Processing - Please Wait</Typography>
            }
          </>

        }
      </Stack>
      <AlertDialog />
    </RootStyle >
  );
}
