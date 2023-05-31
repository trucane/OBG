import { Container, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart } from '../../../pages/Dashboard/Chart/Chart';
import { Deposits } from '../../../pages/Dashboard/Deposits';
import { SignUps } from './Signups';

import { useAuth } from '../../../../utils/Auth/AuthContext';




export const AdminPanel = () => {
  // const location = useLocation()
//   const navigate = useNavigate()

  const {currentUser, getAllUsers, users, uploadVideoFiles} = useAuth()
  const [videoFile, setVideoFile] = useState<any>()


  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.currentTarget.files

    if(file === null) return 
    
    // console.log(file[0])
    
    setVideoFile(file[0])
  }
  
  const uploadVideo = () => {
    if(videoFile === null) return 

    // console.log(videoFile)
    const {name} = videoFile
    let fileName = name
    uploadVideoFiles(fileName, videoFile)
  }



  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return(
        <React.Fragment>
            <div>Admin Panel</div>
            <div>
              <input type='file' onChange={handleVideoChange}/>
              <button onClick={uploadVideo}>Upload</button>
            </div>
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
                {/* Recent SignUps */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <SignUps users={users}/>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          )}
        </React.Fragment>
    )
}