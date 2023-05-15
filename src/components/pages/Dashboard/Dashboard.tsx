import { Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {Chart} from './Chart/Chart';
import {Deposits} from './Deposits';
import {Orders} from './Orders';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Auth/AuthContext'; 




export const DashboardComponent = () => {
  // const location = useLocation()
  const navigate = useNavigate()

  const {currentUser} = useAuth()



  useEffect(() => {
    if(currentUser && currentUser.onBoardStatus < 8){
      navigate('/getting-started')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
    return(
        <React.Fragment>
          {currentUser && (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          )}
        </React.Fragment>
    )
}

const Copyright = (props: any) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://tranquil-pothos-593410.netlify.app/">
          OBG 888
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }