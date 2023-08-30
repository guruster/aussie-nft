import { Button, Container, Card, CircularProgress} from '@material-ui/core';
import { styled} from '@material-ui/core/styles';

export const RootStyle = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(11)
    }
}));

export const NavMenuItem = styled(Button)(({ theme }) => ({
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "400",
    fontSize: "1.2rem",
    lineHeight: "1.334",
    letterSpacing: "0em",
    // maxWidth: "100px",
    // textShadow:"7px 6px 10px #17a2b8",
    '&:hover': {
        color: "white",
    },
    textTransform: "inherit"
}));

export const StyledCard = styled(Card)({
    backgroundColor: "rgb(62, 62, 62)",
    // p: "6px",
    // maxWidth: {xs:"260px"},
    width: '100%',
    borderRadius: "18px",
    boxShadow: "11px 11px 6px -1px rgb(160 160 160 / 20%)",

});

export const StyledCircleProgress = styled(CircularProgress)({
    color: 'white'
});