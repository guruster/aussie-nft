import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// material
import { styled } from '@material-ui/core/styles';
import { Stack, Grid, Typography } from '@material-ui/core';
// components
import NftItem from './NftItem';
import AlertDialog from '../AlertDialog'
import { StyledCircleProgress } from '../styled/StyledInput'
//actions
import { getNFTsWithHighResImage } from '../../actions/manager';
import { getTokenIdsOf } from '../../lib/mint'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // paddingTop: theme.spacing(15),
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15)
  },
  minHeight: window.innerHeight + 'px'
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  const wallet = useSelector(state => state.manager.wallet)
  const [nfts, setNfts] = useState([])
  const [loadingAssets, setLoadingAssets] = useState(false)

  const getNftsOf = async (wallet) => {
    setLoadingAssets(true)
    let nftIds = await getTokenIdsOf(wallet)
    console.log('nftIds',nftIds)
    setNfts(await getNFTsWithHighResImage(nftIds))
    setLoadingAssets(false)
  }

  useEffect(() => {
    if (wallet) {
      getNftsOf(wallet)
    }else if(window.localStorage.getItem('wallet')){
      getNftsOf(window.localStorage.getItem('wallet'))
    }
  }, [])


  return (
    <RootStyle title="Aussie Bogan" id="move_top">
      {
        loadingAssets ?
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <StyledCircleProgress />
          <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Loading now, please wait... </Typography>
        </Stack>
        : nfts?.length ===0 &&
        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>There is no collection.</Typography>
      }
      <Grid container>
        {
          nfts?.map(nft => <NftItem nft={nft} />)
        }
      </Grid>
      <AlertDialog />
    </RootStyle>
  );
}
