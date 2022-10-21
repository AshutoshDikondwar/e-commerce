import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import Cartitem from './Cartitem/Cartitem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart,mode }) => {

    const EmptyCart = () => (
        <Typography variant='subtitle1' sx={{color:mode==='dark'?'white':'black'}}>You have no items in the cart {''}
        <Link to="/" style={{ textDecoration: 'underline',color:mode==='dark'?'white':'black', }}>Start Adding Some</Link>
        </Typography>
    )

    if (!cart.line_items) return 'Loading...'
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <Cartitem mode={mode} item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', marginTop: '10%', width: '100%', justifyContent: 'space-between', }}>
                <Typography variant='h4' sx={{color:mode==='dark'?'white':'black'}} >

                    Subtotal:{cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button sx={{ minWidth: '150px', marginRight: '20px' }} size='large' type='button' variant='contained' color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" sx={{ minWidth: '150px',textDecoration: 'none',"&:hover": {color:'white'} }} size='large' type='button' variant='contained' color="primary">Check Out</Button>
                </div>
            </div>
        </>

    )


    return (
        <Container>
            <div style={{ minHeight: 40 }} />
            <Typography sx={{ marginTop: '5%',color:mode==='dark'?'white':'black' }} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? EmptyCart() : FilledCart()}
            {/* { !cart.line_items.length ? renderEmptyCart() : renderCart() } */}

        </Container>
    )
}

export default Cart