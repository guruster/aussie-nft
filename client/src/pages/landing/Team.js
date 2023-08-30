/* eslint-disable */
import { useState } from 'react'
// material
import { useTheme, styled, alpha } from '@material-ui/core/styles';
// import { Box, Grid, Stack, Typography, Avatar, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Stack from '@material-ui/core/Stack'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../components/animate';

// ----------------------------------------------------------------------

const MEMBERS = [
  'Chief Bogan',
  'Bogan Project Manager',
  'Technical Wiz',
  'Blockchain / NFT Geek',
  'Artist Extraordinaire',
  'Support Artist',
  'Social Bogan',
  'Commercial & Marketing Guru',
  'Boring Accounting Type'
];

const IMAGES = [
  'https://ucarecdn.com/1693d7a6-77db-413a-8999-67b73ac66460/chief.jpg',
  'https://ucarecdn.com/a3045cce-551d-4054-8bfc-90abadd698d8/project.jpg',
  'https://ucarecdn.com/5ca15f52-0219-44c0-9305-6c54e9d6902f/technical.jpg',
  'https://ucarecdn.com/2f9bd0da-6d7c-4ee3-90ab-b81631d143b7/blockchain.jpg',
  'https://ucarecdn.com/e2b448ab-37ab-4a3b-accb-359a925c10d9/artist.jpg',
  'https://ucarecdn.com/c829027e-4a04-4f25-b34b-ef807572d720/support.jpg',
  'https://ucarecdn.com/091eea5b-1bfe-4d7b-926a-a5017e74aea0/creative.jpg',
  'https://ucarecdn.com/e515fc7c-38c8-4568-b5a6-7d40f3c6d438/marketing.jpg',
  'https://ucarecdn.com/25251cd2-60f9-40cb-91ff-c826823a050a/accounting.jpg'
]

const DESCRIPTION = [
  "Experienced entrepreneur and seagan (pescatarian who doesn’t eat dairy and eggs), with a strong technical background, having grown a start-up tech company to a multinational enterprise and listed on the ASX (Australian Securities Exchange).  Subsequently listed property focused company on the ASX.  Extensive experience in leading start-up, small and large private and public organisations. Actively involved in a variety of businesses including a number of blockchain-based, technology businesses. Providing funding, vision, leadership, and ideas to Aussie Bogan Club. Passionate about bringing ideas to life and rewarding those who provide support along the journey.",

  "The Team could not operate without our Bogan PM (proudly pansexual, fitness fanatic and social butterfly),  frankly there would be no Aussie Bogan Club without her! She is the glue that keeps everyone working harmoniously and focused. Our Bogan PM adds grease to the Bogan wheels of the project; from scoping, scheduling, risk management, contingency planning, quality control and resourcing.  Impressive hey?  Well, she is impressive, and we’re glad she’s part of the Team.",

  "Highly qualified software engineer (whose taste in music is questionable) with over 5 years’ international, industry experience including extensive blockchain, web3, smart contract, tokens and fiat payment systems domain expertise. Jointly responsible for UI, backend, minting engine, smart contract development and deployment of Aussie Bogan Club platform, including on-going technology management and enhancement.",

  "Master’s qualified computer science engineer (nerdy and we love him, also a gamer) with over 8 years’ international experience in all things blockchain, NFTs, smart contracts, random programmatic image generation, including development frameworks such as MEVN, MEAN, Laravel, node.js, and others (all the technical stuff required for our project). Jointly responsible for UI, backend, minting engine, smart contract development and deployment of Aussie Bogan Club, including on-going platform management and enhancement.",

  "Experienced international artist who has an incurable sweet tooth and bends over backwards for everyone. With over 15 years of experience in converting ideas and thoughts from concept drawings to final art (including digital art), she has raw talent and significant formal training in all things artistic and creative.  Responsible for the conceptualisation, design and creation of the Aussie Bogan Club NFT artwork with collaboration and vision of the Team.",

  "Extremely accomplished in his own right with over 10 years’ experience in the creation of digital art and digital design and a junk food addict (we’ll convert him yet).  Responsible for aiding our Artist Extraordinaire including contributing to design thoughts and creative ideas, drawing styles and techniques with the creation of the Aussie Bogan Club NFT artwork.  Oh, and a sports fanatic!",

  "Omnivore, with nut allergies and competent in all things social media including Discord, Instagram, Facebook and Twitter.  Obsessed in social media, has no life, spends his awake-time on social media (with a bit of jiu jitsu and a little 4WD in between) – poor guy?  Responsible for all things social media for Aussie Bogan Club, with assistance, input and guidance from the Team. ",

  "Former stockbroker and financial adviser, extreme carnivore, heavy coffee consumer, reformed smoker, commercially and marketing savvy, with strong local and multinational network of contacts in a broad cross-section of industries and disciplines.  Able to speak underwater with gravel in his mouth (figuratively speaking - he can’t in reality).  Responsible for expanding the reach and exposure of Aussie Bogan Club including on-boarding specialist marketeers, on-going utility expansion and partner recruitment and engagement.",

  "Qualified accountant with over 4 years’ industry experience within start-up, small and large organisations.  Keen interest in healthy living (veganism and pilates), music and art, but mostly all things blockchain, NFT and crypto.  Fervid (always wanted to use that word – means “passionate”) listed company share and cryptocurrency trader (including NFTs) and investor.  Providing financial guidance, management including cash-flow management, company compliance and formality to Aussie Bogan Club.  Always debates expense claim reimbursements!  Why can’t I claim my recent NTF purchase as a business expense? "
]

const PLANS = [...Array(9)].map((_, index) => ({
  name: MEMBERS[index],
  image: IMAGES[index],
  description: DESCRIPTION[index]
}));

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 15)
  }
}));

function PlanCard({ plan, cardIndex }) {
  const [more, setMore] = useState(false)
  const theme = useTheme();
  const { name, image, description } = plan;

  const isLight = theme.palette?.mode === 'light';

  return (
    <>
      <Stack direction='row' spacing={2} alignItems='center' sx={{ transform: 'translateY(25%)', zIndex: 10 }}>
        <div>
        </div>
        {/* <Box component="img" src={image} sx={{ width: '100%', height: 'auto' }} /> */}
        <Avatar src={image} sx={{ width: '192px', height: 'auto' }} />
        <Typography variant="h6">{name}</Typography>
      </Stack>
      <Paper
        sx={{
          zIndex: 1,
          p: 5,
          borderRadius: '0px',
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(isLight ? theme.palette?.grey[500] : theme.palette?.common.black, 0.12)}`,
          ...(cardIndex === 1 && {
            boxShadow: (theme) =>
              `0px 48px 80px ${alpha(isLight ? theme.palette?.grey[500] : theme.palette?.common.black, 0.48)}`
          })
        }}
      >
        {
          more ?
            <>
              <Typography sx={{ mt: 2 }}>{`${description}`} </Typography>
              <Typography color='primary.main' sx={{ cursor: 'pointer' }} onClick={() => setMore(false)}>less</Typography>
            </>
            :
            <>
              <Typography sx={{ mt: 2 }}>{`${description.slice(0, 200)}...`} </Typography>
              <Typography color='primary.main' sx={{ cursor: 'pointer' }} onClick={() => setMore(true)}>more</Typography>
            </>
        }
      </Paper>
    </>
  );
}

export default function Team() {
  return (
    <RootStyle>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <MotionInView variants={varFadeInDown}>
          <Typography className='flux_title' variant="h2" color='primary.main' sx={{ mb: 3 }}>
            Team
          </Typography>
          <Typography
            variant='h6'
            paragraph
          >
            The Aussie Bogan Club Team is comprised of real Australians who’s knowledge spans a wide variety of disciplines (and vices).
          </Typography>
          <Typography
            variant='h6'
            paragraph
          >
            Our vision is of a diverse Club of Aussie Bogans who respect the ABC values and join together to genuinely support each other in all areas of life including mental and physical health, education, personal development, career, business, special interests, socially entertainment and enjoyment.  To this end, all our utility, including future utility, will be based upon our pursuit to the fulfilment of our vision.
          </Typography>
        </MotionInView>
      </Box>

      <Grid container spacing={5}>
        {PLANS.map((plan, index) => (
          <Grid key={plan.name} item xs={12} md={4}>
            <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
              <PlanCard plan={plan} cardIndex={index} />
            </MotionInView>
          </Grid>
        ))}
      </Grid>
    </RootStyle>
  );
}
