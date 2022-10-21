import React from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@mui/material'
import { useState } from 'react';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment Details'];
const Checkout = ({ cart, order, onCaptureCheckout, error, handleEmptyCart, mode }) => {


    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState('')
    const [isFinished, setIsFinished] = useState(false)

    const history = useNavigate();
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token);
            } catch (error) {
                history.pushState('/');
            }
        }
        generateToken();

    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data);
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank You! for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider sx={{ margin: '20px 0', }}></Divider>
                <Typography variant='subtitle2'>Order ref:{order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography sx={{ color: mode === 'dark' ? 'white' : 'black' }} variant='h5'>Thank You! for your purchase</Typography>
                <Divider sx={{ margin: '20px 0', }}></Divider>
            </div>
            <br />
            <Button component={Link} to="/" onClick={handleEmptyCart} variant='outlined' type='button'>Back to Home</Button>
        </>

    ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <CircularProgress />
        </div >
    )
    if (error) {
        <>
            <Typography variant='h5'>Error:{error}</Typography>
            <br />
            <Button component={Link} to="/" variant='outlined' type='button'>Back to Home</Button>

        </>
    }




    const Form = () => activeStep === 0 ?
        <AddressForm mode={mode} checkoutToken={checkoutToken} next={next} />
        : <PaymentForm mode={mode} timeout={timeout} shippingData={shippingData} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} backStep={backStep} />

    return (
        <>
            <CssBaseline />
            <div style={{ minHeight: 40 }}>
                <main style={{ marginTop: '6%', width: 'auto', marginLeft: '30%', marginRight: '30%', }}>
                    <Paper sx={theme => ({ marginTop: theme.spacing(3), marginBottom: theme.spacing(3), padding: theme.spacing(3),backgroundColor:mode==='dark'?'#22303c':'white' })}>
                        <Typography variant='h4' align="center" sx={{ color: mode === 'dark' ? 'white' : 'black' }}>Checkout</Typography>
                        <Stepper activeStep={activeStep} sx={theme => ({ padding: theme.spacing(3, 0, 4), })}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel ><a style={{ color: mode === 'dark' ? 'white' : 'black' }}>{step}</a></StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

                    </Paper>

                </main>

            </div>
        </>
    )
}





export default Checkout