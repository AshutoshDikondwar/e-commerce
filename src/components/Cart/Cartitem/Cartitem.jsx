import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'

const Cartitem = ({ item, onUpdateCartQty, onRemoveFromCart,mode }) => {

    return (
        <Card sx={{ backgroundColor:mode==='dark'?'#22303c':'white',color:mode==='dark'?'white':'black'}}>
            <CardMedia image={item.image.url} alt={item.name} sx={{ height: 250, }} />
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant='h4'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <Button type='button' size='small' onClick={()=>onUpdateCartQty(item.id,item.quantity-1)} sx={{fontSize:20}}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={()=>onUpdateCartQty(item.id,item.quantity+1)} sx={{fontSize:20}}>+</Button> 
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={()=>onRemoveFromCart(item.id)} >Remove</Button>
            </CardActions>

        </Card>
    )
}

export default Cartitem