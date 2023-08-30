/* eslint-disable */
// material
import { useTheme, styled } from '@material-ui/core/styles';
// import {  Grid, Button, Container, Typography, Stack, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Box from '@material-ui/core/Box'
//
import { varFadeInUp, MotionInView } from '../../components/animate';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10,3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15)
  }
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

const ScreenStyle = styled(MotionInView)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  backgroundColor: theme.palette?.grey[theme.palette?.mode === 'light' ? 300 : 800],
  [theme.breakpoints.up('sm')]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12
  },
  '& img': {
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 12
    }
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
const MEMBERSHIP_TEXT = [
  "Recognition of Australia’s First Peoples",
  "Respect for the freedom and dignity of your follow bogan",
  "Freedom of religion",
  "Freedom of speech",
  "Freedom of association",
  "Tolerance",
  "Compassion for those in need",
  "Equality of opportunity for all",
  "Boganship (mateship)",
  "Easy - going and informal",
  "Common sense",
  "Humility"
];

export default function Membership() {
  const theme = useTheme();
  const isLight = theme.palette?.mode === 'light';
  const isRTL = theme.direction === 'rtl';

  const screenLeftAnimate = variantScreenLeft;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = variantScreenRight;

  return (
    <RootStyle>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography className='flux_title' variant="h2" color='primary.main' sx={{ mb: 3 }}>
                  Aussie Bogan Values
                </Typography>
                <List dense={false}>
                  {
                    MEMBERSHIP_TEXT.map((item,index) =>
                      <ListItem key={index}>
                        <ListItemIcon>
                          <LoyaltyIcon sx={{color:'primary.main'}}/>
                        </ListItemIcon>
                        <Typography variant='h6'>{item}</Typography>
                      </ListItem>
                    )
                  }
                </List>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <ContentStyle>
                  <Box component='img' src='https://ucarecdn.com/7d04d948-5c5b-4dc2-ae41-ea8905ac2cd7/bogan.gif' sx={{width:'100%'}}/>
            </ContentStyle>
          </Grid>
        </Grid>
    </RootStyle>
  );
}
