import { useState } from 'react';
// material
import { styled} from '@material-ui/core/styles';
// import { Box, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Accordion from '@material-ui/core/Accordion'
import Typography from '@material-ui/core/Typography'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
// import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
//
import { MotionInView, varFadeInDown, varFadeInRight } from '../../components/animate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// ----------------------------------------------------------------------
const FAQ_DATA = [
  {
    title: "What is an NFT?",
    content: `A non-fungible token, also known as an NFT is a unique unit of data that is stored on a digital ledger (Blockchain). They often represent easily reproducible items such as digital images, photos, videos and audio and use blockchain technology to show verified proof of ownership.`,
  },
  {
    title: "How many Aussie Bogan Club NFTs will there be?",
    content:
      "There will be a total of 10,000 Aussie Bogan Club NFTs.",
  },
  {
    title: "What is the quality of a Aussie Bogan Club NFT?",
    content: `Only be owning a Aussie Bogan Club NFT will you be able to unlock its super high resolution 4000 x 4000 (pixel) version, which will be available on IPFS.  You’ll then be free to print the art yourself to create your own physical items and of course, boast about your Aussie Bogan Club NFT ownership status. `,
  },
  {
    title: "When is the public sale?",
    content: `We will announce our public sale date on our social media platforms.  Please connect to one or all of our social channels to stay up-to-date`,
  },
  {
    title: 'What kind of NFTs are Aussie Bogan Club NFTs?',
    content: 'ERC-721 with high resolutions images hosted on IPFS.',
  },
  {
    title: 'How can I get a Aussie Bogan Club NFT?',
    content: 'Once the sale commences, you will need a MetaMask wallet holding enough Ethereum cryptocurrency to purchase a Aussie Bogan Club NFT, which can be minted on our website. Or secondary sales will be available at opensea.io or clubvirtual.io or other reputable NFT marketplace/s.',
  },
  {
    title: 'What should I do after minting an Aussie Bogan Club NFT?',
    content: 'You can use your Aussie Bogan Club NFT as a profile picture (PFP) online, or you can resell your Aussie Bogan Club NFT on the secondary market. We think you should consider holding it to enjoy the current and future utility and up-coming developments',
  },
  {
    title: 'What is MetaMask?',
    content: 'MetaMask is a decentralized digital wallet that can be used to store digital currency (cryptocurrency) and NFTs. It can be accessed through a browser extension or through a mobile/smart phone app.',
  },
  {
    title: 'I don’t have a cryptocurrency wallet yet?',
    content: 'If you don’t have a digital wallet, you can create a MetaMask wallet by visiting https://metamask.io/',
  },
  {
    title: 'How much is it for a Aussie Bogan Club NFT?',
    content: '0.05 Eth + Gas',
  },
  {
    title: 'What is Gas or Gas fee?',
    content: 'Gas fees are payments made by users to compensate for the computing energy required to process and validate transactions on a blockchain.  These fees are not collected or retained by Aussie Bogan Club.',
  },
  {
    title: 'After I buy a Aussie Bogan Club NFT where will it be?',
    content: 'Aussie Bogan Club NFTs are safely stored in your MetaMask wallet or other compatible digital wallet that you use.',
  },
  {
    title: 'How many Aussie Bogan Club NFTs can I buy at once?',
    content: 'You can buy (mint) up to 10 Aussie Bogan Club NFTs per transaction.',
  },
  {
    title: 'After I purchase a Aussie Bogan Club NFT will I own the IP? ',
    content: 'No, NFTs and IP are two different things.  The copyright and all associated IP rights belong to Aussie Bogan Club.',
  },
  {
    title: 'What are the royalty fees for secondary sales of Aussie Bogan Club NFTs?',
    content: 'The royalty fees are fixed at 7.5%. A portion of those royalties will be used for marketing to help the Aussie Bogan Club community grow. Our team is very committed to the long-term success of this project. ',
  },
  {
    title: 'Will you have any team tokens?',
    content: '500 Aussie Bogan Club NFTs will be reserved for promotion, give aways and our developers.',
  },
  {
    title: 'How can I contact an official Aussie Bogan Club team member?',
    content: 'You can contact our official team be sending an email to our official email admin@aussiebogan.club',
  },
  {
    title: 'Do you do giveaways?',
    content: 'We will hold giveaways in our Discord server and social media accounts and be rewarding those who refers us to their friends.  Please follow through our links to benefit from these and don’t forget to refer us to your friends.  Please also refer to our Roadmap.',
  },
  {
    title: 'How do I get involved?',
    content: 'Head over to the Discord and join the conversation.',
  },
  {
    title: 'Will there be utility for the Aussie Bogan Club?',
    content: 'Absolutely. Between our IRL meetup plans, planned merch sale release, and future NFT drops, we will be continually adding value for those holding any of the Aussie Bogan Club NFTs.  Also, you’ll be an exclusive member of the Aussie Bogan Club socialite community and who knows what that may bring in the future.',
  },
  {
    title: 'Will you work with partners?',
    content: 'The Aussie Bogan Club is committed to working with those how continue to promote and participate constructively in the NFT space.  If you are building the next exciting metaverse, a reputable streetwear brand or maybe a drink label looking to collaborate with an exciting and progressive NFT project (and passionate team) then we’d love to hear from you.  Please send us an email to admin@aussiebogan.club',
  },
  {
    title: 'Are Aussie Bogan Club NFTs a good investment?',
    content: 'That is a decision for you to make. The Aussie Bogan Club NFTs are non-fungible tokens that represent ownership of a digital artwork only. No information on this website is or may be considered investment advice.  Our team is committed to building a strong community around the project and we believe the Aussie Bogan Club will have a long life ahead of it and will be an ever-evolving project. However, the success of the Aussie Bogan Club relies on so many factors that no one knows! Please don’t spend money you can’t afford to lose.'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10,3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10,15)
  }
}));

export default function Faq() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <RootStyle>
      <Box sx={{ mb: 5 }}>
        <MotionInView variants={varFadeInDown}>
          <Typography className='flux_title' variant="h2" textAlign='center' color='primary.main' sx={{ mb: 3 }}>
            Faq
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInRight}>
          {
            FAQ_DATA.map((item, index) =>
              <Accordion expanded={expanded === `panel${index}`} key={index} onChange={handleChange(`panel${index}`)}
                sx={{
                  border: '1px solid #1CCAFF',
                  backgroundImage: 'repeating-linear-gradient(45deg,#0b1414,#0b1414 10px,#061724 10px,#061724 20px)'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                >
                  <Typography variant='h4' color='primary.main' sx={{ width: '90%', flexShrink: 0 }}>
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='h6'>
                    {item.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          }
        </MotionInView>
      </Box>
    </RootStyle>
  );
}
