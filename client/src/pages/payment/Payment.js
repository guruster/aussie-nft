import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Stack, Typography, Box, Dialog, DialogContent } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import StripeForm from "./StripeForm";
import "./stripe.css";
import PaypalForm from "./PaypalForm";
///     actions
import { showPayment } from '../../actions/manager';
// import { getEthPrice } from '../../lib/mint';

const PRICE = Number(process.env.REACT_APP_PRICE)

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBKEY_TEST);

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const Payment = ({ onSucceed }) => {
    const dispatch = useDispatch()
    const quantity = useSelector(state => state.manager.quantity)
    const [ethPrice, setEthPrice] = useState(0)
    const [expanded, setExpanded] = React.useState('stripe');
    const open = useSelector(state => state.manager.paymentOpen)

    useEffect(() => {
        // getETHPrice()
    }, [])

    // const getETHPrice = async () => {
    //     // setEthPrice(await getEthPrice())
    // }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleClose = () => {
        dispatch(showPayment(false))
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>Use Google's location service?</DialogTitle> */}
            <DialogContent>
                <Stack direction='column' spacing={1}>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='h5' className='caption'>
                            PAYMENT METHOD
                        </Typography>
                        <Typography variant='h6' color='red'>
                            {`${ethPrice.toFixed(2)} USD / ETH`}
                        </Typography>
                    </Stack>
                    <Typography variant='body1'>
                        {`You should pay ${(quantity * PRICE * ethPrice).toFixed(2)} USD for ${quantity} NFTs`}
                    </Typography>

                </Stack>
                <Accordion expanded={expanded === 'stripe'} onChange={handleChange('stripe')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Box component='img' src='/static/stripe.png' width='60px' height='auto' />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Elements stripe={promise}>
                            <StripeForm onSucceed={onSucceed} />
                        </Elements>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'paypal'} onChange={handleChange('paypal')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Box component='img' src='/static/paypal.png' width='90px' height='auto' />
                    </AccordionSummary>
                    <AccordionDetails>
                        <PaypalForm onSucceed={onSucceed} />
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
        </Dialog>
    )
}

export default Payment;