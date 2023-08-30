/* eslint-disable */
import { alpha, useTheme, styled } from '@material-ui/core/styles';

// import { Box, Grid, Button, Container, Typography, Stack } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { varFadeInUp, MotionInView } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10,3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7,15)
  },
  backgroundImage:
    theme.palette?.mode === 'light'
      ? `linear-gradient(180deg, ${alpha(theme.palette?.grey[300], 0)} 0%, ${theme.palette?.grey[300]} 100%)`
      : 'none'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(7),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));


const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 }
};
const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 }
};
const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 }
};

// ----------------------------------------------------------------------

export default function About() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <ContentStyle>
            {/* <MHidden width='mdDown'> */}
            <MotionInView variants={varFadeInUp}>
              <Box component='img' src='https://ucarecdn.com/a6fcd01f-7781-4f4d-b522-069fb430bbbc/boy_1.JPG' sx={{width:'100%'}}/>
            </MotionInView>

            {/* </MHidden> */}
          </ContentStyle>
        </Grid>

        <Grid item xs={12} md={6} dir="ltr">
          <ContentStyle>

            <MotionInView variants={varFadeInUp}>
              <Typography variant="h2" color='primary.main' className='flux_title' sx={{ mb: 3, mt: { md: 8 } }}>
                Forever
              </Typography>
              <Typography
                variant='h6'
                paragraph
              >
                In celebration of the contribution of your fellow  The Right Honourable Chief Justice  AC QC  Esq. has officially launched the   Club ().
              </Typography>
              <Typography
                variant='h6'
                paragraph
              >
                The   Club is a collection of 10,000 exclusive NFTs cohabiting in the shire of ville and the Ethereum blockchain being secured by a fearless smart contract that can never be altered or changed.
              </Typography>
              <Typography
                variant='h6'
                paragraph
              > Each  NFT is completely unique, randomly generated from a selection of over 220 hand drawn  traits.  Ownership of an  NFT doubles as your membership to the highly exclusively   Club, which on its own brings bragging rights, a society of like-minded  socialites.
              </Typography>
            </MotionInView>
          </ContentStyle>
        </Grid>
      </Grid>
    </RootStyle >
  );
}
