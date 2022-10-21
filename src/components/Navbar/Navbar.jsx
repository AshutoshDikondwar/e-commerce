import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from '../../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import image from '../../assets/image.png'





const Navbar = ({ totalItems,mode,handleMode }) => {


    const location = useLocation();
    return (
        <>
            <AppBar  position='fixed' sx={{ boxShadow: '10px grey', borderBottom: '1px solid rgba(0, 0, 0, 0.12)',backgroundColor:mode==='dark'?'#22303c':'#f5f5f5' }} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' sx={{ "&:hover": {color: mode === 'dark' ? 'white' : 'black'},flexGrow: 1, alignItems: 'center', display: 'flex',textDecoration: 'none',color: mode === 'dark' ? 'white' : 'black' }}>
                        <img src={mode==='dark'?image:logo} alt='Commerce.js' height='25px' style={{ marginRight: '5px',}} />
                        LookOut
                    </Typography>
                    <div style={{ flexGrow: 1, }} />
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleMode} />
                            <label class="form-check-label" style={{ color:mode==='dark'?'white':'black'}} for="flexSwitchCheckChecked">Dark Mode</label>
                    </div>
                    {location.pathname === '/' && (

                        <div className='button'>
                            <IconButton component={Link} to="/cart" aria-label='Show cart items' color='inherit' sx={{ color:mode==='dark'?'white':'black'}}>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )

                    }

                </Toolbar>

            </AppBar>
        </>
    )
}


export default Navbar