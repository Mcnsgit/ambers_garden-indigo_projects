import { Button, CardActions, CardContent, CircularProgress, Typography } from "@mui/material";
import {  PaymentElement, } from "@stripe/react-stripe-js";
import { useSubmitPayment } from "../hooks/useCapturePayment";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const StripeForm = ({ paymentIntent, handleClear, }) => {
    const [confirmData, updateConfirmData] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    const { mutate, isLoading, data, error } = useSubmitPayment(elements, stripe, paymentIntent.client_secret);

    const handleSubmit = async (e) => {
        elements.submit();
        e.preventDefault();
        mutate();
    };

    useEffect(() => {
        if (data) updateConfirmData(data);
    }, [data]);

    return (
    <CardContent>
        <Typography variant="h6" pb={3} color='primary'>Thanks for your support!</Typography>
        <PaymentElement/>
        <CardActions sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleClear}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>{isLoading ? <CircularProgress/> :`Donate ${paymentIntent.amount / 100}`}</Button>
        </CardActions>
    </CardContent>
)
}
export default StripeForm
