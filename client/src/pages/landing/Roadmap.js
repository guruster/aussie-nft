/* eslint-disable */
// material
import { useTheme, styled } from '@material-ui/core/styles';
// import { Box, useMediaQuery, Typography, ListItem, ListItemIcon, Stack } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Stack from '@material-ui/core/Stack'
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab';
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
//
import { MotionInView, varFadeInDown, varFadeInLeft, varFadeInRight } from '../../components/animate';
import CheckIcon from '@material-ui/icons/Check';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 15)
  }
}));

const BorderStyle = styled(Stack)(({ theme }) => ({
  border: '1px solid #1CCAFF',
  borderLeft: '10px solid #1CCAFF',
  padding: '5px'
}))

const RoadmapItem = ({ title, contents }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <BorderStyle direction='column'>
      <Typography variant="h4" color='primary'>
        {title}
      </Typography>
      {
        contents.map((text, index) =>
          <ListItem key={index}>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <Typography variant={matches ? 'h6' : 'body1'}>{text}</Typography>
          </ListItem>
        )
      }
    </BorderStyle>
  )
}

export default function Roadmap() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <RootStyle>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <MotionInView variants={varFadeInDown}>
          <Typography className='flux_title' variant="h2" color='primary.main' sx={{ mb: 3 }}>
            Roadmap
          </Typography>
        </MotionInView>
      </Box>
      {
        matches ?
          <Timeline position='alternate'>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                  <Typography variant='h4'>0%</Typography>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h4" color='primary'>
                  The Launch
                </Typography>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Aussie Bogan Club NFTs will be available for minting.</Typography>
                </ListItem>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                  <Typography variant='h4'>25%</Typography>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h4" color='primary.main' component="span">
                  ABC Airdrop
                </Typography>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Exclusive for the first few NFT holders (randomly selected) Chief Bogan will airdrop 50 NFTs.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>ABC NFT holders to commence uploading, to our social channels, their creations including skits, art and photos for a chance to be selected as a winner by the ABC community.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Aussie Bogan Club utility commences.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Enjoy the interaction with your fellow Aussie Bogan Club member.</Typography>
                </ListItem>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                  <Typography variant='h4'>50%</Typography>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h4" color='primary' component="span">
                  More Giveaways & Utility
                </Typography>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>A further 50 ABC NFTs will be given away to existing NFT holders.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>ABC breeding program specification development commences.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Pursue utility expansion opportunities including partnerships.</Typography>
                </ListItem>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                  <Typography variant='h4'>75%</Typography>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h4" color='primary' component="span">
                  Merch. Store & Next ABC NFT Drop
                </Typography>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Continue to pursue utility expansion opportunities including partnerships.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Commence development of merchandise store and collection.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Chief Bogan will give away another 50 ABC NFTs to holders on a randomly selected basis.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Creation of next ABC NFT drop will commence including integration into breeding program.</Typography>
                </ListItem>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                  <Typography variant='h4'>100%</Typography>
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h4" color='primary' component="span">
                  Bogans Rejoice!
                </Typography>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>A new beginning for the Aussie Bogan Club</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>In another act of generosity, Chief Bogan will give away another 50 ABC NFTs to holders on a randomly selected basis.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>Continue with development of ABC merchandise, breeding program, next ABC NFT drop creation and utility expansion including partnerships.</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <Typography variant='h6'>ABC NFT holders encouraged to upload, to our social channels, their creations including skits, art and photos for a chance to be selected as winners by the ABC community and enjoy the prizes including having their creations turned into NFTs.</Typography>
                </ListItem>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          :
          <Stack direction='column' spacing={2}>
            <MotionInView variants={varFadeInLeft}>

              <RoadmapItem title='0% - The Launch' contents={['Aussie Bogan Club NFTs will be available for minting.']} />
            </MotionInView>
            <MotionInView variants={varFadeInRight}>

              <RoadmapItem title='25% - ABC Airdrop'
                contents={[
                  'Exclusive for the first few NFT holders (randomly selected) Chief Bogan will airdrop 50 NFTs.',
                  'ABC NFT holders to commence uploading, to our social channels, their creations including skits, art and photos for a chance to be selected as a winner by the ABC community.',
                  'Aussie Bogan Club utility commences.',
                  'Enjoy the interaction with your fellow Aussie Bogan Club member.'
                ]}
              />
            </MotionInView>
            <MotionInView variants={varFadeInLeft}>

              <RoadmapItem title='50% - More Giveaways & Utility'
                contents={[
                  'A further 50 ABC NFTs will be given away to existing NFT holders.',
                  'ABC breeding program specification development commences.',
                  'Pursue utility expansion opportunities including partnerships.'
                ]}
              />
            </MotionInView>
            <MotionInView variants={varFadeInRight}>

              <RoadmapItem title='75% - Merch. Store & Next ABC NFT Drop'
                contents={
                  [
                    'Continue to pursue utility expansion opportunities including partnerships.',
                    'Commence development of merchandise store and collection.',
                    'Chief Bogan will give away another 50 ABC NFTs to holders on a randomly selected basis.',
                    'Creation of next ABC NFT drop will commence including integration into breeding program.'
                  ]
                }
              />
            </MotionInView>
            <MotionInView variants={varFadeInLeft}>

              <RoadmapItem title='100% - Bogans Rejoice!'
                contents={[
                  'A new beginning for the Aussie Bogan Club',
                  'In another act of generosity, Chief Bogan will give away another 50 ABC NFTs to holders on a randomly selected basis.',
                  'Continue with development of ABC merchandise, breeding program, next ABC NFT drop creation and utility expansion including partnerships.',
                  'ABC NFT holders encouraged to upload, to our social channels, their creations including skits, art and photos for a chance to be selected as winners by the ABC community and enjoy the prizes including having their creations turned into NFTs.'
                ]}
              />
            </MotionInView>
          </Stack>
      }
    </RootStyle>
  );
}
