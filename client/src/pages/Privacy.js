/* eslint-disable */
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
// import { Box, Button, Typography, Container, ListItem } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ListItem from '@material-ui/core/ListItem'
// components
import { MotionContainer, varBounceIn, varFadeInRight } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Privacy() {
  return (
    <RootStyle>
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ margin: 'auto' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" color='primary.main' paragraph>
                PRIVACY POLICY
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                Aussie Bogan Club Pty Ltd (ACN 653 514 231) ("we", "us", “Company", or “ABC”) is committed to privacy protection.
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                ABC is the creator and owner of the Aussie Bogan Club concept, design and all associated intellectual property (“IP”) including the domain name aussiebogan.club.
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                At ABC and the aussiebogan.club website ("Site"), we understand the importance of keeping personal information private and secure. This privacy policy ("Privacy Policy") describes generally how we manage personal information and safeguard privacy. If you would like more information, please do not hesitate to contact us.
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                This Privacy Policy forms part of, and is subject to the provisions of, our Website Terms and Conditions of Use.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography variant='h6' color='primary' paragraph={true}>
                We care about your privacy:
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                We will never rent, trade or sell your email address to anyone.
                We will never publicly display your email address or other personal details that identify you.
              </Typography>
              <Typography variant='h5' color='primary' paragraph={true}>
                THE AUSTRALIAN PRIVACY PRINCIPLES
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                We will treat all personal information in accordance with any and all obligations that are binding upon us under the Privacy Act 1988 (Cth) (“Privacy Act”). The Privacy Act lays down 13 key principles in relation to the collection and treatment of personal information, which are called the “Australian Privacy Principles”.
              </Typography>
              <Typography variant='h5' color='primary' paragraph={true}>
                WHAT IS "PERSONAL INFORMATION"?
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                Personal information held by ABC may include your:
                <ListItem>
                  o&nbsp;&nbsp;&nbsp;   name and date of birth;

                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   residential and business postal addresses, telephone/mobile/fax numbers and email addresses;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   bank account and/or credit/debit card details for agreed billing purposes;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   crypto wallet address for agreed billing purposes;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   your computer and connection information; and
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   any information that you otherwise share with us.
                </ListItem>
              </Typography>
              <Typography variant="h5" color='primary.main' paragraph>
                HOW WE MAY COLLECT YOUR PERSONAL INFORMATION
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                At this Site, we only collect personal information that is necessary for us to conduct our business as an NFT marketplace, NFT collection site, auction platform and management and promotions agency representing local and global artists, designers, photographers, videographers, celebrities and original content rights holders, and facilitating partnerships with influencers, marketers, brands and complementary digital artists to design and release official, exclusive and limited-edition non-fungible token (NFT) collections and one-of-a-kind drops.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography variant="h6" color='primary.main' paragraph>
                Information that you provide to us
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                We may collect personal information that you provide to us about yourself when you:
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   use this Site, including (without limitation) when you:
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   purchase any products through this Site;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   add reviews, forum or chat room messages or comments in any elements of this Site that permit user-generated content; or
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   complete an online contact form to contact us;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   provide information to us by telephone or through marketing or competition application forms; or
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   send us an email or other communication.
                </ListItem>
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography variant="h6" color='primary.main' paragraph>
                IP addresses
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                This Site may also collect Internet Protocol (IP) addresses. IP addresses are assigned to computers on the internet to uniquely identify them within the global network. ABC collects and manages IP addresses as part of the service of providing internet session management and for security purposes. ABC may also collect and use web log, computer and connection information for security purposes and to help prevent and detect any misuse of, or fraudulent activities involving, this Site.
              </Typography>
              <Typography variant="h5" color='primary.main' paragraph>
                COOKIES
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                This Site uses "cookies" to help personalise your online experience. A cookie is a text file or a packet of information that is placed on your local storage device by a web page server to identify and interact more effectively with your computer. There are two types of cookies that may be used at this Site; a persistent cookie and a session cookie. A persistent cookie is entered by your web browser into the "Cookies" folder on your computer and remains in that folder after you close your browser, and may be used by your browser on subsequent visits to this Site. A session cookie is held temporarily in your computer’s memory and disappears after you close your browser or shut down your computer. Cookies cannot be used to run programs. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you. In some cases, cookies may collect and store personal information about you. ABC extends the same privacy protection to your personal information, whether gathered via cookies or from other sources.
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                You can configure your internet browser to accept all cookies, reject all cookies or notify you when a cookie is sent. Please refer to your internet browser’s instructions to learn more about these functions. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of this Site.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography variant="h6" color='primary.main' paragraph>
                Why we use cookies
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                This Site uses cookies in order to:
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   remember your preferences for using this Site;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   facilitate e-commerce transactions, to ensure that your order is remembered between pages during the checkout process;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   show relevant notifications to you (e.g., notifications that are relevant only to users who have, or have not, subscribed to newsletters or email or other subscription services); and
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   remember details of data that you choose to submit to us (e.g., through online contact forms or by way of comments, forum posts, chat room messages, reviews, ratings, etc.).
                </ListItem>
                Many of these cookies are removed or cleared when you log out but some may remain so that your preferences are remembered for future sessions.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>

              <Typography variant="h6" color='primary.main' paragraph>
                Third party cookies
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                In some cases, third parties may place cookies through this Site. For example:
                <ListItem>
                  o&nbsp;&nbsp;&nbsp;   Google Analytics, one of the most widespread and trusted website analytics solutions, may use cookies’ de-identified data about how long users spend on this Site and the pages that they visit;
                </ListItem>
                <ListItem>
                  o&nbsp;&nbsp;&nbsp;   Google AdSense, one of the most widespread and trusted website advertising solutions, may use cookies to serve more relevant advertisements across the web and limit the number of times that a particular advertisement is shown to you; and
                </ListItem>
                <ListItem>
                  o&nbsp;&nbsp;&nbsp;   third party social media applications (e.g. Facebook, Twitter, LinkedIn, Pinterest, YouTube, Instagram, TikTok, etc.) may use cookies in order to facilitate various social media buttons and/or plugins in this Site.
                </ListItem>
              </Typography>

              <Typography variant="h5" color='primary.main' paragraph>
                HOW WE MAY USE YOUR PERSONAL INFORMATION
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                Your personal information may be used in order to:
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   verify your identity;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   assist you to place orders through this Site;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   process any purchases of products that you may make through this Site, including charging, billing and collecting debts and shipment of products to you;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   respond to any queries or feedback that you may have;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   conduct appropriate checks for credit-worthiness and for fraud prevent and detect any misuse of, or fraudulent activities involving, this Site;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   conduct research and development in respect of our products and/or services;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   gain an understanding of your information and communication needs or obtain your feedback or views about our products and/or services in order for us to improve them; and/or
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   maintain and develop our business systems and infrastructure, including testing and upgrading of these systems,
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   and for any other purpose reasonably considered necessary or desirable by ABC in relation to the operation of our business.
                </ListItem>
                From time-to-time we may email our customers with news, information and offers relating to our own products/services or those of selected partners. Your personal information may also be collected so that ABC can promote and market products and services to you. This is to keep you informed of products, services, and special offers we believe you will find valuable and may continue after you cease acquiring products from us. If you would prefer not to receive promotional or other material from us, please let us know and we will respect your request. You can unsubscribe from such communications at any time if you choose.
              </Typography>
              <Typography variant="h5" color='primary.main' paragraph>
                WHEN WE MAY DISCLOSE YOUR PERSONAL INFORMATION
              </Typography>

              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                In order to deliver the products or services you require or for the purposes set out above, ABC may disclose your personal information to organisations outside ABC. Your personal information may be disclosed to these organisations only in relation to this Site, and ABC takes reasonable steps to ensure that these organisations are bound by confidentiality and privacy obligations in relation to the protection of your personal information. These organisations may carry out or provide:
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   customer enquiries;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   mailing systems;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   billing and debt-recovery functions;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   information technology services;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   marketing, telemarketing and sales services;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   market research; and
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   website usage analysis.
                </ListItem>
                In addition, we may disclose your personal information to:
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   your authorised representatives or legal advisers (when requested by you to do so);
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   credit-reporting and fraud-checking agencies;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   credit providers (for credit-related purposes such as creditworthiness, credit rating, credit provision and financing);
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   our professional advisers, including our accountants, auditors and lawyers;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   government and regulatory authorities and other organisations, as required or authorised by law;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   organisations who manage our business strategies, including those involved in a transfer/sale of all or part of our assets or business (including accounts and trade receivables) and those involved in managing our business risk and funding functions;
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   third party organisations and other service providers who may require access to your information for the purposes of carrying out services on ABC’s behalf, including by way of example, data analysis and key insight services, marketing, auditing, email, mobile application, infrastructure provision services, and any other services as deemed necessary by ABC; and
                </ListItem>
                <ListItem>

                  o&nbsp;&nbsp;&nbsp;   the police or other appropriate persons where your communication suggests possible illegal activity or harm to others.
                </ListItem>
              </Typography>
              <Typography variant="h5" color='primary.main' paragraph>
                CONTACTING US ABOUT PRIVACY
              </Typography>
              <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
                If you would like more information about the way we manage personal information that we hold about you, or are concerned that we may have breached your privacy, please contact us by email at admin@aussiebogan.club or otherwise you may write to us at our postal address, being <span style={{ fontWeight: 'bold' }}>PO Box 2026, Clovelly West, NSW, 2031, Australia</span> .
              </Typography>
            </motion.div>

            <Typography variant="h6" color='primary.main' paragraph>
              Access to your personal information
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              In most cases, you may have access to personal information that we hold about you. We will handle requests for access to your personal information in accordance with the Australian Privacy Principles. All requests for access to your personal information must be directed to the Privacy Officer by email or by writing to us at our postal address, being <span style={{ fontWeight: 'bold' }}>PO Box 2026, Clovelly West, NSW, 2031, Australia</span>. We will deal with all requests for access to personal information as quickly as possible. Requests for a large amount of information, or information that is not currently in use, may require further time before a response can be given. We may charge you a fee for access if a cost is incurred by us in order to retrieve your information, but in no case will we charge you a fee for your application for access.
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              In some cases, we may refuse to give you access to personal information that we hold about you. This may include circumstances where giving you access would:
              <ListItem>

                o&nbsp;&nbsp;&nbsp;   be unlawful (e.g., where a record that contains personal information about you is subject to a claim for legal professional privilege by one of our contractual counterparties);
              </ListItem>
              <ListItem>

                o&nbsp;&nbsp;&nbsp;   have an unreasonable impact on another person’s privacy; or
              </ListItem>
              <ListItem>

                o&nbsp;&nbsp;&nbsp;   prejudice an investigation of unlawful activity.
              </ListItem>
              We may also refuse access where the personal information relates to existing or anticipated legal proceedings, and the information would not be accessible by the process of discovery in those proceedings.
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              If we refuse to give you access, we will provide you with reasons for our refusal.
            </Typography>
            <Typography variant="h6" color='primary.main' paragraph>
              Correcting your personal information
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              We will amend any personal information about you that is held by us and that is inaccurate, incomplete or out of date if you request us to do so. If we disagree with your view about the accuracy, completeness or currency of a record of your personal information that is held by us, and you ask us to associate with that record a statement that you have a contrary view, we will take reasonable steps to do so.
            </Typography>
            <Typography variant="h5" color='primary.main' paragraph>
              STORAGE AND SECURITY OF YOUR PERSONAL INFORMATION
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              We are committed to maintaining the confidentiality of the information that you provide us and we will take all reasonable precautions to protect your personal information from unauthorised use or alteration. In our business, personal information may be stored both electronically (on our computer systems and with our website hosting provider) and in hard-copy form. Firewalls, anti-virus software and email filters, as well as passwords, protect all of our electronic information. Likewise, we take all reasonable measures to ensure the security of hard-copy information.
            </Typography>
            <Typography variant="h5" color='primary.main' paragraph>
              THIRD PARTY WEBSITES
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              You may click-through to third party websites from this Site, in which case we recommend that you refer to the privacy statement of the websites you visit. This Privacy Policy applies to this Site only and ABC assumes no responsibility for the content of any third-party websites.
            </Typography>
            <Typography variant="h6" color='primary.main' paragraph>
              Re-marketing
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              We may use the Google AdWords and/or Facebook re-marketing services to advertise on third party websites to previous visitors to this Site based upon their activity on this Site. This allows us to tailor our marketing to better suit your needs and to only display advertisements that are relevant to you. Such advertising may be displayed on a Google search results page or a website in the Google Display Network or inside Facebook. Google and Facebook may use cookies and/or pixel tags to achieve this. Any data so collected by Google and/or Facebook will be used in accordance with their own respective privacy policies. None of your personal Google and/or Facebook information is reported to us.
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              You can set preferences for how Google advertises to you using the Google Ads Settings page (https://www.google.com/settings/ads). Facebook has enabled an AdChoices link that enables you to opt out of targeted advertising.
            </Typography>
            <Typography variant="h5" color='primary.main' paragraph>
              CHANGES TO THIS PRIVACY POLICY
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              From time to time, it may be necessary for us to revise this Privacy Policy. Any changes will be in accordance with any applicable requirements under the Privacy Act and the Australian Privacy Principles. We may notify you about changes to this Privacy Policy by posting an updated version on this Site.
            </Typography>
            <Typography paragraph={true} sx={{ color: 'text.secondary' }}>
              If you require any further information about the Privacy Act and the Australian Privacy Principles, you can visit the Federal Privacy Commissioner’s website.(see <a href='https://www.privacy.gov.au' target='_blank'>www.privacy.gov.au</a>).
            </Typography>



            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle >
  );
}
