import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scroller } from 'react-scroll';
// material
import { styled } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack';
// components
import Page from '../../components/Page';
import BoganForever from './BoganForever'
import Collection from './Collection'
import Faq from './Faq'
import Home from './Home'
import KeyInfo from './KeyInfo'
import Membership from './Membership'
import Minting from './Minting'
import Roadmap from './Roadmap'
import Team from './Team'
import Utility from './Utility'
import AlertDialog from '../AlertDialog'
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  const { hash } = useLocation();
  useEffect(() => {
    console.log(hash);
    scroller.scrollTo(hash.replace('#', ''), {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  })
  return (
    <RootStyle title="Aussie Bogan" id="move_top">
      <Stack id='home'>
        <Home />

      </Stack>
      <ContentStyle>
        <Stack id='mint'>
          <Minting />

        </Stack>
        <Stack id='about'>

          <BoganForever />
        </Stack>
        <Stack id='collection'>

          <Collection />
        </Stack>
        <Membership />
        <Stack id='utility'>
          <Utility />
        </Stack>
        <Stack id='team'>

          <Team />
        </Stack>
        <Stack id='key'>
          <KeyInfo />
        </Stack>
        <Stack id="roadmap">
          <Roadmap />
        </Stack>
        <Stack id='faq'>
          <Faq />

        </Stack>
        <AlertDialog />
      </ContentStyle>
    </RootStyle>
  );
}
