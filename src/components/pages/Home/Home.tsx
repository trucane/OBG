import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../utils/Auth/AuthContext';
import './home.css'
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth } from '../../../utils/Auth/AuthContext';
import { useEffect } from 'react';

export const Home = () => {

    const {getHomePageVideo, homePageVideo, loading} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!homePageVideo){

            getHomePageVideo()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[homePageVideo])

    return(
        
        <div className="home-page">

            {loading && !homePageVideo && (

                <Grid container justifyContent={'center'} sx={{ width: '100%', height:"100vh" }}>
                    <Box sx={{width:'50%', textAlign:'center',mt: '15%'}}>
                        <Typography variant="h6" gutterBottom>Loading...</Typography>
                        <LinearProgress />
                    </Box>

                </Grid>
            )}

            {homePageVideo && (
                <Grid container>
                    <Grid item xs={12} sx={{height:'70vh'}}>

                        <video
                            className="hero-video"
                            src={`${homePageVideo}`}
                            title="YouTube video player"  
                            controls
                            autoPlay
                            />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justifyContent={'center'} className={'get-started'}>

                            <Button className="btn" variant='contained' onClick={() => navigate('/login')}>
                                Get Started
                            </Button>
                   
                        </Grid>
                    
                    </Grid>

                </Grid>
            )}
        </div>
    )
}




