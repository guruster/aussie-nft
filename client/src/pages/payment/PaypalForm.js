import React, { useState } from "react";
import { Stack} from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalForm = ({ onSucceed }) => {
    const PAYMENT_CURRENCY = "USD";
    const amount = {
        currency_code: PAYMENT_CURRENCY,
        value: "10"
    };

    function createOrder(data, actions) {
        // throw new Error("force the createOrder callback to fail");
        return actions.order.create({
            purchase_units: [
                {
                    amount,
                    shipping: {
                        // name: "Hello Brother",
                        // method: "United States Postal Service",
                        name: {
                            full_name: "John"
                        },
                        type: "SHIPPING",
                        address: {
                            address_line_1: "test",
                            address_line_2: "test",
                            admin_area_2: "asd",
                            admin_area_1: "CA",
                            postal_code: "95131",
                            country_code: "US"
                        }
                    }
                }
            ]
            // application_context: {
            //   shipping_preference: "NO_SHIPPING"
            // }
        });
    }
    function onShippingChange(data, actions) {
        console.log("inside onshipping change", data);
        // Trying to send error
        return new Promise(function (resolve, reject) {
            reject(new Error());
        });

        if (data.selected_shipping_option) {
            return actions.resolve();
        }
        return actions.order.patch([
            {
                op: "replace",
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                    currency_code: PAYMENT_CURRENCY,
                    value: "12"
                }
            },
            {
                op: "add",
                path: "/purchase_units/@reference_id=='default'/shipping/address",
                value: {
                    address_line_1: "test",
                    address_line_2: "test",
                    admin_area_2: "asd",
                    admin_area_1: "CA",
                    postal_code: "95131",
                    country_code: "US"
                }
            }
        ]);

        // on initial load
        return actions.approve();
        // works fine with
        // return actions.resolve();
    }
    function oninit(data, actions) {
        // actions.disable();
        // return actions.disable();
        console.log("inside init");
    }
    function clickPaypal(e, data, actions) {
        // actions.disable();
        console.log("inside click");
        // return actions.resolve();
    }
    function onApprove(data, actions) {
        console.log("data", data);
        onSucceed(data);
        // return actions.order.authorize().then((details) => {
        //   console.log(details);
        //   console.log(details.purchase_units[0].payments.authorizations[0].id);
        // });
    }
    function onError(err) {
        console.error("error from the onError callback", err);
    }
    return (
        <Stack direction='column'>
            <PayPalScriptProvider
                options={{
                    "client-id": "ASNOXtf9lVa63O8sWpE8Sk84FmdMIXvQ6uRAnT_YGZ5d3Q_lmCDUNCMIew184piwJbzJVL_eaWe7wpf6",
                    components: "buttons",
                    intent: "authorize",
                    commit: false,
                    "disable-funding": "credit,card"
                }}
            >
                <PayPalButtons
                    style={{ color: "white", label: "checkout" }}
                    createOrder={createOrder}
                    onClick={clickPaypal}
                    onShippingChange={onShippingChange}
                    onApprove={onApprove}
                    onError={onError}
                    onInit={oninit}
                />
            </PayPalScriptProvider>
        </Stack>
    );
}

export default PaypalForm;
