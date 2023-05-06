import {ReactNode, useEffect} from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Badge, Divider, List } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SideNavSectionPrimary, SideNavSectionSecondary } from '../navs/SideNavSection';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/Auth/AuthContext';

interface AppWrapperProps {
    children: ReactNode;
}

const drawerWidth: number = 240;
  
interface AppBarProps extends MuiAppBarProps {
open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  
  const mdTheme = createTheme();
  

  export const AppWrapper = ({children}: AppWrapperProps) => {

    const {loginUser, logoutUser} = useAuth()

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const {currentUser} = useAuth()

    const handleSignIn = async () => {
      try {
        const userAction =  await loginUser()
      } catch (error) {
        console.log('error')
      }
    }
    const handlelogout = async () => {
      try {
        const userAction = await logoutUser()
      } catch (error) {
        console.log('error')
      }
    }

    return (

        <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }} data-name="app-container">
          <CssBaseline />
          <AppBar position="absolute" open={open} data-name="app-bar">
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
                background: '#084B55'
              }}
              data-name="app-tool-bar"
            >
              <Box sx={{ flexGrow: 1}}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <Link to='/' style={{textDecoration:'none', color: "#E4B337"}}>OBG</Link>
                </Typography>
              </Box>
              <Box sx={{display:'flex', gap:2, alignItems:"center"}}>

                {
                  currentUser
                  ?<Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  onClick={handlelogout}
                >
                  Log Out
                </Typography>
                :<Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Typography>
                }
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    {currentUser && currentUser.email}
                  </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <SideNavSectionPrimary/>
              <Divider sx={{ my: 1 }} />
              <SideNavSectionSecondary/>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    )
  }