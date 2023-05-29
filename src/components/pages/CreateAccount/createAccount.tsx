import React, { useState } from 'react';
import Grid from '@mui/material/Grid/Grid';
import { createAccountStyles } from './create-account';
import Typography from '@mui/material/Typography/Typography';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Input from '@mui/material/Input/Input';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';

import Button from '@mui/material/Button/Button';
import { useAuth } from '../../../utils/Auth/AuthContext';








export const CreateAccount = () => {

    const {signUpwithEmail} = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [reEnterPassword, setReEnterPassword] = useState<string>("")

    const handleSubmitCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signUpwithEmail(email, password)
    }
    
    return (
        <Grid container sx={createAccountStyles.mainContainer} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={6} sx={createAccountStyles.formContainer}>
                <Typography variant='h4'component={'legend'} sx={{mb:5}}>Create Account</Typography>
                <Grid item>

                    <form onSubmit={(event) => handleSubmitCreateAccount(event)}>
                        <FormControl  required sx={createAccountStyles.formControl}>
                            <InputLabel htmlFor="my-email">Email address</InputLabel>
                            <Input id="my-email" aria-describedby="my-helper-text" type={'email'} value={email} onChange={(event) => setEmail(event.target.value)} />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl  required sx={createAccountStyles.formControl}>
                            <InputLabel htmlFor="my-password" error={password.length < 6}>Password</InputLabel>
                            <Input id="my-password" aria-describedby="my-helper-password" type="password"  value={password} onChange={(event) => setPassword(event.target.value)}/>
                            {reEnterPassword !== password && (
                                <FormHelperText id="my-helper-password">Password must be atleast 6 characters</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl required sx={createAccountStyles.formControl}>
                            <InputLabel htmlFor="my-password2">Re-enter password</InputLabel>
                            <Input id="my-password2" aria-describedby="my-helper-repassword" type="password"  error={reEnterPassword !== password} value={reEnterPassword} onChange={(event) => setReEnterPassword(event.target.value)}/>
                            {reEnterPassword !== password && (
                                <FormHelperText id="my-helper-repassword">Passwords do not match.</FormHelperText>
                            )}
                        </FormControl>

                        <Button type="submit" variant='contained' color='primary'>Submit</Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}