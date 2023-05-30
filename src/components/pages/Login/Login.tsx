import React, { useState } from 'react';
import Grid from '@mui/material/Grid/Grid';
import { createLoginStyles } from './login-style';
import Typography from '@mui/material/Typography/Typography';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Input from '@mui/material/Input/Input';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';

import Button from '@mui/material/Button/Button';
import { useAuth } from '../../../utils/Auth/AuthContext';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';



export const LoginPage = () => {

    const {loginUser, loginWithEmail} = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleEmailLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginWithEmail(email, password)
    }

    const handleGoogleCreateAccount = async () => {
        try {
            await loginUser()
          } catch (error) {
            console.log('error')
          }
    }
    
    return (
        <Grid container sx={createLoginStyles.mainContainer} justifyContent={'center'}>
            <Grid container item xs={12} md={6}>
                <Grid item xs={12} sx={createLoginStyles.formContainer}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={6}>
                            <Grid container sx={{bgcolor:'red', color: "white"}} alignItems={'center'}>
                                <Grid item  xs={2}sx={{padding: '1rem', borderRight: '1px solid white'}}>
                                    <GoogleIcon />
                                </Grid>
                                <Grid item  xs={10} sx={{padding: '.5rem', textAlign:'center'} }>

                                    Google
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} onClick={handleGoogleCreateAccount}>
                            <Grid container alignItems={'center'} my={2.5}>
                                <Grid item xs={5.5}>
                                    <hr style={{width: '100%'}}/>
                                </Grid>
                                <Grid item xs={1} sx={{textAlign:'center'}}>
                                    or
                                </Grid>
                                <Grid item xs={5.5}>
                                    <hr style={{width: '100%'}}/>
                                </Grid>
                            </Grid>
                      
                    </Grid>
                    </Grid>
                    <Typography variant='h4'component={'legend'} sx={{mb:5}}>Sign In</Typography>

                    <form onSubmit={(event) => handleEmailLogin(event)}>
                        <FormControl  required sx={createLoginStyles.formControl}>
                            <InputLabel htmlFor="my-email">Email address</InputLabel>
                            <Input id="my-email" aria-describedby="my-helper-text" type={'email'} value={email} onChange={(event) => setEmail(event.target.value)} />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <FormControl  required sx={createLoginStyles.formControl}>
                            <InputLabel htmlFor="my-password">Password</InputLabel>
                            <Input id="my-password" aria-label="enter password" type="password"  value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </FormControl>

                        <Button type="submit" variant='contained' color='primary' sx={createLoginStyles.btn}>Submit</Button>
                    </form>
                </Grid>
                <Grid item xs={12} sx={createLoginStyles.formContainer}>
                    <Grid container>
                        <Typography variant='h6'>
                            Do not have an account? <Link to="/create-account" >Register</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}