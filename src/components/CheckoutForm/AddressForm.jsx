import React from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from './CustomTextField'
import { useState } from 'react'
import { commerce } from '../../lib/commerce'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, next, mode }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description}-(${sO.price.formatted_with_symbol})` }))



    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])

    }
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setShippingOptions(options);
        setShippingOption(options[0].id);

    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom sx={{ color: mode === 'dark' ? 'white' : 'black' }}>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput mode={mode} name='firstName' label='First name' />
                        <FormInput mode={mode} name='lastName' label='Last name' />
                        <FormInput mode={mode} name='address1' label='Address' />
                        <FormInput mode={mode} name='email' label='Email' />
                        <FormInput mode={mode} name='city' label='City' />
                        <FormInput mode={mode} name='zip' label='ZIP/ Postal code'/>

                        <Grid item xs={12} sm={6}>
                            <InputLabel sx={{color:'#8899A6'}}>Shipping Country</InputLabel>
                            <Select variant="standard" value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (

                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel sx={{color:'#8899A6'}}>Shipping Subdivision</InputLabel>
                            <Select variant="standard" value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (

                                    <MenuItem key={subdivision.id} value={subdivision.id} >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel sx={{color:'#8899A6'}}>Shipping Options</InputLabel>
                            <Select variant="standard" value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (

                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Back to cart</Button>
                        <Button type="submit" variant='contained'>next</Button>

                    </div>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm