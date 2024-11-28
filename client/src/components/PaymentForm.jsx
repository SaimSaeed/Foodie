import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { usePayOrderMutation } from '../features/orderApiSlice'
import Message from './Message'
import { Link } from 'react-router-dom'
function PaymentForm({ id, order }) {
    const [payOrder, { isLoading, error }] = usePayOrderMutation()
    // setting up stripe
    const stripe = useStripe()
    // setting up elements
    const elements = useElements()
    // setting Error Message
    const [errorMsg, setErrorMsg] = useState("")
    const handleError = (error) => {
        setErrorMsg(error.message);
    }



    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }


        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await payOrder(id)
        const clientSecret = await res.data.client_secret

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/order/${id}`,
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
        } else {
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };



    return (
        <>
            {order?.isPaid ?<div className='text-center'> <h6>Your Order is Paid</h6> <Link to={"/"} className='btn btn-sm btn-danger'>Go Back</Link></div> : <Form onSubmit={handleSubmit}>
                <PaymentElement />
                <Button variant={"dark"} className='my-2' type="submit" disabled={!stripe || isLoading}>Pay Now</Button>
                {errorMsg && <Message>{errorMsg}</Message>}
            </Form>}
        </>
    )
}

export default PaymentForm