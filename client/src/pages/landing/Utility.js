/* eslint-disable */
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Typography, Stack } from '@material-ui/core';
//
import { MotionInView, varFadeInDown } from '../../components/animate';

// ----------------------------------------------------------------------
const UTILITY_INFO = [
  'Regular, virtual meet-ups of diverse Bogans offering opportunities for new friendships, networking and community contribution to future ABC pursuits.',
  'Exclusive access to a high-resolution 4,000 x 4,000 pixel file of your Aussie Bogan Club NFT via IPFS.',
  'IRL (In Real Life), Aussie Bogan Club exclusive functions and parties with special guest appearances based on ABC NFT holders’ suggestions.',
  'Exclusive Aussie Bogan Club merchandise available for purchase by NFT holders including opportunity for ABC NFT holders to make suggestions for future merchandise.',
  'Early access to Aussie Bogan Club NFT holders to upcoming ABC NFT drops including other Aussie Bogan Club NFT family members.',
  'Breeding (more info. to come).',
  'Access to future partner programs (more info. to come).',
  'NFT holders will be eligible to post approx. 30 second skit portrayal of a “typical” Aussie Bogan on Tik-tok or Discord. ABC community will vote on selecting winner, whose skit will be turned into an NFT and then sold.  Creator will receive a percentage of the net revenue.  Winner will also receive an Aussie Bogan Club NFT.',
  'NFT holders will be eligible to post an original artwork or photo portrayal of a “typical” Aussie Bogan on Instagram or Discord.  ABC community will vote on selecting winner, whose art or photo will be turned into either a single NFT or NFT collection (based on potential of content and ABC community feedback).  Creator will receive percentage of the net revenue.  Winner will also receive an Aussie Bogan Club NFT.',
  'Competitions (referred to in 8 and 9 above) will each run every (approx.) 6 months for a 5-year period or based on demand / interest.  Winners will be selected by the ABC community (ABC NFT holders) based on content posted in the most recent 6-month period.',
  'Aussie Bogan Club boasting rights!'
];


const TableStyle = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
  // width:'100%',
  maxWidth: '800px',
  [theme.breakpoints.up('md')]: {
    margin: 'auto',
    width: '100%'
  }
}));

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 15)
  },
  backgroundImage:
    theme.palette?.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette?.grey[300], 0)} 0%, ${theme.palette?.grey[300]} 100%)`
      : 'none'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));


// ----------------------------------------------------------------------

export default function Utility() {
  const theme = useTheme();
  const isLight = theme.palette?.mode === 'light';
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle>
      <MotionInView variants={varFadeInDown}>
        <Typography className='flux_title' variant="h2" color='primary.main' sx={{ textAlign: 'center', mb: 3 }}>
          Utility
        </Typography>
      </MotionInView>
      <ContentStyle>
        <Stack direction='column' spacing={2}>
          {
            UTILITY_INFO.map((item, index) =>
              <Stack direction='row' key={index} spacing={3} alignItems='center'>
                <Typography variant='h3' color='primary.main' textAlign='right'>{`${index + 1}`}</Typography>
                <Typography variant='h6'>{item}</Typography>
              </Stack>
            )
          }
        </Stack>
      </ContentStyle>
    </RootStyle>
  );
}
