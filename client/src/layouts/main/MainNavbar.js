/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// import Web3 from "web3";
// import { Web3Auth } from "@web3auth/web3auth";
// import { CHAIN_NAMESPACES, ADAPTER_EVENTS, CustomChainConfig } from "@web3auth/base";
// import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography, Stack, IconButton, SvgIcon, Menu, MenuItem, ListItemIcon, Divider } from '@material-ui/core';

//////////////////////////
import { FacebookPath, DiscordPath, TwitterPath, InstagramPath } from '../../components/SvgIcon';
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
// import { setWallet } from '../../actions/manager'
import { shortAddress } from '../../lib/mint'

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// const ethChainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0x3",
//   rpcTarget: `https://${NETWORK}.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
//   displayName: `${NETWORK}`,
//   blockExplorer: `https://${NETWORK}.etherscan.io/`,
//   ticker: "ETH",
//   tickerName: "Ethereum",
// };
// // We are initializing with EIP155 namespace which
// // will initialize the modal with ethereum mainnet
// // by default.
// const web3auth = new Web3Auth({
//   chainConfig: ethChainConfig,
//   clientId: process.env.REACT_APP_CLIENT_ID // get your clientId from https://developer.web3auth.io
// });

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const dispatch = useDispatch()
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const wallet = useSelector(state => state.manager.wallet)
  const role = useSelector(state => state.auth.user?.role);
  const isHome = pathname === '/';
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          bgcolor: 'background.default',
          height: { md: APP_BAR_DESKTOP - 16, xs: APP_BAR_MOBILE - 16 }
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box component={RouterLink}
            spy={true}
            smooth={true}
            to='/#home'
            sx={{ cursor: 'pointer' }}>
            <Logo header={true} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <Stack direction='row' spacing={1} alignItems='center'>
              <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
              <a href='https://www.facebook.com/Aussieboganclub/' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{FacebookPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://discord.gg/DbDQC9ep29' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{DiscordPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://twitter.com/boganclub' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{TwitterPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://www.instagram.com/aussie_bogan_club/' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{InstagramPath}</SvgIcon>
                </IconButton>
              </a>
              {/* <Button variant='contained' disabled={!web3authReady} onClick={handleLogin}>
                {wallet ? `Logout` : `Login`}
              </Button> */}

            </Stack>

          </MHidden>

          <MHidden width="mdUp">
            {/* <Button variant='contained' disabled={!web3authReady} onClick={handleLogin}>
              {wallet ? `Logout` : `Login`}
            </Button>
            {
              wallet &&
              <a href={`https://opensea.io/${wallet}`} target='_blank'>
                <Typography variant='body1' color='white'>
                  {`${shortAddress(wallet)}`}
                </Typography>
              </a>
            } */}
            <Stack direction='row' spacing={1}>
              <a href='https://www.facebook.com/Aussieboganclub/' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{FacebookPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://discord.gg/DbDQC9ep29' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{DiscordPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://twitter.com/boganclub' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{TwitterPath}</SvgIcon>
                </IconButton>
              </a>
              <a href='https://www.instagram.com/aussie_bogan_club/' target='_blank'>
                <IconButton color='primary'>
                  <SvgIcon>{InstagramPath}</SvgIcon>
                </IconButton>
              </a>
              <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
            </Stack>
          </MHidden>
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
