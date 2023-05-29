import {ReactNode, useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BarComponent, BarDrawer} from './BarComponent';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Badge, Divider, List, MenuItem } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SideNavSectionPassive, SideNavSectionPrimary, SideNavSectionSecondary, SideNavSectionAdmin } from '../../navs/SideNavSection';
import { Link, useLocation  } from 'react-router-dom';
import { useAuth } from '../../utils/Auth/AuthContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

interface AppWrapperProps {
    children: ReactNode;
}
  
  const mdTheme = createTheme();
  

  export const AppWrapper = ({children}: AppWrapperProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const {loginUser, logoutUser, currentUser, loginCredentials, resetCurrentUser, loading} = useAuth()

    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const toggleDrawer = () => {
      setOpen(!open);
    };

    const handleSignIn = async () => {
      try {
        await loginUser()
      } catch (error) {
        console.log('error')
      }
    }
    const handlelogout = async () => {
      try {
        await logoutUser()
        handleClose()
      } catch (error) {
        console.log('error')
      }
    }

    const convertDisplayName = () => {
      let v;

      let name = loginCredentials.displayName.split(' ')

      if(name.length > 1){
        let firstInitial = name[0].toUpperCase().split('')[0]
        let secondInitial = name[1].toUpperCase().split('')[0]
        v = `${firstInitial}${secondInitial}`
      }else{
        let firstInitial = name[0].toUpperCase().split('')[0]
        v = `${firstInitial}`
      }
      return v;
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    useEffect(() => {

      // console.log(currentUser)
      // console.log(loginCredentials)

      // if a user is logged
      if(currentUser && loginCredentials){
        
        // check for onboard process is complete 
        if(currentUser.onBoardStatus !== null){
          return navigate('/getting-started')
        } 
        
        else{
          // no longer show home page or getting started page... send to respective dashboards
          if(location.pathname === '/' || location.pathname === '/getting-started'){
            if(currentUser.role.includes('admin')){
              navigate('/route/protected/admin')
            }else{
              navigate('/dashboard')
            }
          }
        }
      }



      if(!loading && !currentUser && loginCredentials){
        resetCurrentUser(loginCredentials?.auth?.currentUser?.uid || {})
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, loginCredentials])




    return (

        <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }} data-name="app-container">
          <CssBaseline />
          <BarComponent position="absolute" open={open} data-name="app-bar">
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
                background: '#084B55'
              }}
              data-name="app-tool-bar"
            >
              <Box sx={{ flexGrow: 1, display:"flex", alignItems:"center"}}>
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
                  <Link to='/' style={{textDecoration:'none', color: "#E4B337"}}>OBG 888</Link>
                </Typography>
              </Box>
              <Box sx={{display:'flex', gap:2, alignItems:"center"}}>

                {
                  !loginCredentials && window.location.pathname !== '/' && 
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      onClick={handleSignIn}
                      style={{cursor: 'pointer'}}
                    >
                      Sign In
                    </Typography>
                }
                <Box>
                  <IconButton 
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    >
                      {loginCredentials && <Avatar sx={{bgcolor:"#E4B337"}}>{convertDisplayName()}</Avatar>}
                  </IconButton>
                  {
                    loginCredentials && 
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="primary" sx={{bgColor:'orange'}}>
                        <NotificationsIcon/>
                      </Badge>
                    </IconButton>
                  }
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      top: "40px",
                      // ml: "5px",
                      width: "400px"
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handlelogout}>Log Out</MenuItem>
                    <MenuItem>Messages</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </BarComponent>
          { (location.pathname !== '/getting-started'  && location.pathname !== '/')
            && (
            <BarDrawer variant="permanent" open={open}>
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
                <Divider sx={{ my: 1 }} />
                <SideNavSectionPassive/>
                {currentUser?.role.includes('admin') && (
                  <SideNavSectionAdmin/>
                )}
              </List>
            </BarDrawer>
            )
          }
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
            <Box sx={{p:4}}>
              {children}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }