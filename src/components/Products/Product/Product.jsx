import React from 'react'
import { Card, CardMedia, CardActions, Typography, IconButton, CardContent } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'

const Product = ({ product, onAddToCart, mode }) => {
    let mystyle = {
        maxWidth: '100%',
        backgroundColor: mode === 'dark' ? '#22303c' : 'white',
        color: mode === 'dark' ? 'white' : 'black',
        "&:hover": {
            cursor: 'pointer',
            boxShadow: '-8px 10px 15px 	#505ba7 '

        },
    }
    return (

        // <Card sx={{ maxWidth: '100%' }}>
        // <Card sx={{ maxWidth: '100%',backgroundColor:'rgb(41 47 47)',color:'#ffff' }}>
        // <Card sx={{ maxWidth: '100%',backgroundColor:'#22303c',color:'#ffff' }}>
        <Card sx={mystyle}>
            <CardMedia sx={{ height: 0, paddingTop: '58.25%', }} image={product.image.url} title={product.name} />
            <CardContent>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>

                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecodary' />
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)} sx={{ color: mode === 'dark' ? 'white' : 'black' }} >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card >
    )
}

export default Product