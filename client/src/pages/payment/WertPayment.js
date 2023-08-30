import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent } from "@mui/material";

import WertWidget from '@wert-io/widget-initializer';

import { showPayment } from '../../actions/manager';
// import { getEthPrice } from '../../lib/mint';

const PRICE = Number(process.env.REACT_APP_PRICE)
const PARTNER_ID = '01FVYDA33ED897FV5Q1VW55651'
const options = {
    partner_id: PARTNER_ID,
    container_id: 'widget',
    width: 400,
    height: 600,
    currency: 'USD',
    commodity: 'ETH',
    commodities: 'ETH',
    theme:'dark'
    // currency_amount: 100,
};
// const options = {
//     "partner_id": "01FVYDA33ED897FV5Q1VW55651",
//     "container_id": "wert-widget",
//     "theme": "dark",
//     "commodities": "ETH"
// }

const wertWidget = new WertWidget(options);


const WertPayment = ({ onSucceed }) => {
    const dispatch = useDispatch()
    const open = useSelector(state => state.manager.paymentOpen)


    useEffect(() => {
        // getETHPrice()
        // wertWidget.mount()
    }, [])

    const handleClose = () => {
        dispatch(showPayment(false))
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>Use Google's location service?</DialogTitle> */}
            <DialogContent>
                <iframe src={wertWidget.getEmbedUrl()} width='400' height='600' allow='camera *; microphone *' />
            </DialogContent>
        </Dialog>
    )
}

export default WertPayment;