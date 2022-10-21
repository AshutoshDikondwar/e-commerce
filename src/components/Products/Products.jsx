import React from 'react'
import { Grid } from '@mui/material'
import Product from './Product/Product'




const Products = ({products,onAddToCart,mode}) => {
    let mystyle={
        flexGrow: 1, padding: '24px',
        backgroundColor:mode==='dark'?'#15202B':'#f5f5f5'
    }

    return (

        // <main style={{ flexGrow: 1, padding: '24px',backgroundColor:'#f5f5f5' }}>
        // <main style={{ flexGrow: 1, padding: '24px',backgroundColor:'#15202B' }}>
        <main style={mystyle}>
            <div style={{ minHeight:77}} />
            <Grid container justifyContent='center' spacing={4}>
                {products.map((element) => {
                    return (
                        <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
                            <Product mode={mode} product={element} onAddToCart={onAddToCart} />
                        </Grid>
                    )
                })}
            </Grid>
        </main>
    )
}

export default Products