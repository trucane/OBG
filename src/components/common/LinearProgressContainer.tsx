import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import React from 'react';








export const LinearProgressContainer = () => {

    return(
        <Grid container justifyContent={'center'} sx={{ width: '100%', height:"100vh" }}>
            <Box sx={{width:'50%', textAlign:'center',mt: '15%'}}>
                <Typography variant="h6" gutterBottom>Loading...</Typography>
                <LinearProgress />
            </Box>

        </Grid>
    )
}