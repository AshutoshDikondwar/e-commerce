import React from 'react'
import { TextField, Grid, InputLabel } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import './colorChange.css'




const FormInput = ({ name, label, mode }) => {
    const { control } = useFormContext();
    const isError = false;



return (
    <Grid item xs={12} sm={6}  >

        <Controller render={({ field }) => <TextField InputLabelProps={{ className:'tocolor' }} variant="standard" {...field} fullWidth label={label} defaultValue="" required sx={{ input: { color: mode === 'dark' ? 'white' : 'black' } }} />} defaultValue="" name={name} control={control} error={isError} />
    </Grid>
);
}
// color:mode==='dark'?'white':'black'
// input: { color: 'red' }
export default FormInput