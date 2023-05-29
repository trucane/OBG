import React, { useEffect } from 'react';
import { useAuth } from '../../../utils/Auth/AuthContext';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {StyledEngineProvider} from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import CloseIcon from '@mui/icons-material/Close';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LinkIcon from '@mui/icons-material/Link';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import TelegramIcon from '@mui/icons-material/Telegram';
import BadgeIcon from '@mui/icons-material/Badge';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import {gettingStarted, gettingStartedProgressContainer, btn, gettingStarted_btn_container, back_btn} from './getting-started.jsx';
import Grid from '@mui/material/Grid';
import FxswayVideo from '../../../assets/tutorials/FXSway_Demo_Setup.mp4'
// import { useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import FxswayVideo from 'src/assets/tutorials/FXSway_Demo_Setup.mp4'


type BtnContainerPrps = {
    isDisabled?: boolean
    submitAction: () => void
    backActionID?: string
    confirmation?: boolean
}


export const GettingStartedComponent = () => {

    const {currentUser, updateUserProgression, loginCredentials, getAllUsers, users, logoutUser, backUserProgression} = useAuth()
    const navigate = useNavigate()
    const [recruiterSelection, setRecruiterSelection] = React.useState<string | null>('');
    const [igeniusId, setIgeniusId] = React.useState<string>('');
    const [telegramIdInput, setTelegramIdInput] = React.useState<string | null>('');
    const [firstname, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');

    const showProgressionStage = () => {
        switch (currentUser?.onBoardStatus) {
            case 1:
                return igenius()
            case 2:
                return addName()
            case 3:
                return telegramId()
            case 4:
                return igId_to_Bio()
            case 5:
                return recruiter() 
            case 6:
                return fxsway()
            case 7:
                return mt4Trader()
            case 8:
                return linkMT4_to_Fxsway()
            case 9:
                return addOptionsOn_Mt4()
            case 10:
                return <OnboardComplete/>
        
            default: return null
        }
    }

    const recruiter = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'recruitedBy',
                locationValue: recruiterSelection ?? "no one"
            }
            updateUserProgression(loginCredentials.uid, obj)
        }

        const getRecruits = () => {
            return users.filter(user => user.email !== currentUser?.email).filter((a) => a.userName).map(a => (`${a.userName.firstName}, ${a.userName.lastName}`))
        }
    
        return <div className="recruited_by" >
                <Box sx={{ minWidth: 120, margin:"4rem 0", display:"flex", justifyContent:"center"  }}>
                    <Autocomplete
                        onChange={(event, value) => setRecruiterSelection(value)}
                        disablePortal
                        id="members-list"
                        options={getRecruits()}
                        sx={{ width: 300,}}
                        renderInput={(params) => <TextField {...params} label="Members List" />}
                        />
                </Box>
                <ProgressionBtnCont
                    submitAction={onBoardProgression}
                    backActionID={loginCredentials.uid}
                />
        </div>
    }

    const igenius = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'igeniusId',
                locationValue: igeniusId
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return(
            <div className="igenius">
                <Box sx={{ minWidth: 120, margin:"4rem 0", textAlign:"center" }}>
                    <TextField id="outlined-basic" label="Example: 1684651" variant="outlined" value={igeniusId} onChange={(event) => setIgeniusId(event.target.value)}/>
                </Box>

                <ProgressionBtnCont
                    isDisabled={igeniusId.length > 4 ? false : true}
                    submitAction={onBoardProgression}
                />

            </div>
        )
    }


    const addName = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'userName',
                locationValue: {
                    firstName: firstname,
                    lastName: lastName
                }
            }
            updateUserProgression(loginCredentials.uid, obj)
        }


       return <div className="add-name-container">
            <Grid container sx={{ minWidth: 120, margin:"4rem 0", textAlign:"center" }} gap={2}>
                <TextField id="add-name-fn" label="First name: " variant="outlined" value={firstname} onChange={(event) => setFirstName(event.target.value)}/>
                <TextField id="add-name-ln" label="Last name: " variant="outlined" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
            </Grid>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                isDisabled={(firstname.length > 1 && lastName.length > 1) ? false : true}
            />
        </div>
    }


    const fxsway = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
                <a href='https://fxsway.com/' aria-label="view currency strength from live charts " target="_blank" rel="noreferrer" style={{marginLeft: '.5rem'}}>visit site</a>
            </Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                confirmation={true}
            />
        </div>
    }

    const mt4Trader = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="progress">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
                <a href='https://www.metatrader4.com/en' aria-label="metatrader4 trading app to download " target="_blank" rel="noreferrer" style={{marginLeft: '.5rem'}}>download</a>
            </Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                confirmation={true}
            />
        </div>
    }
    const linkMT4_to_Fxsway = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'link_mt4_fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="progress">
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                confirmation={true}
            />
        </div>
    }

    const addOptionsOn_Mt4 = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'add_mt4_options',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="progress">
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                confirmation={true}
            />
        </div>
    }

    const igId_to_Bio = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'add_id_to_bio',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="progress">
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                confirmation={true}
            />
        </div>
    }

    const telegramId = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'telegramId',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="progress">
            <Box sx={{ minWidth: 120, margin:"4rem 0", display:"flex", justifyContent:"center"  }}>
                <TextField id="outlined-basic" label="Example: .te/my name" variant="outlined" value={telegramIdInput} onChange={(event) => setTelegramIdInput(event.target.value)}/>
            </Box>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                backActionID={loginCredentials.uid}
                isDisabled={telegramIdInput && telegramIdInput.length > 3 ? false : true}
            />
        </div>
    }

    const ProgressionBtnCont = ({isDisabled, submitAction, confirmation, backActionID}: BtnContainerPrps) => {

        const backProgression = () => {
            backUserProgression(loginCredentials.uid)
        }

        return(
            <Grid container sx={gettingStarted_btn_container}>
                {backActionID && (
                    <Button onClick={backProgression} title='Warning this will save your progression and exit out of the onboarding process' variant='contained' sx={{...back_btn, ...btn}}  >
                        <KeyboardBackspaceIcon/>
                    </Button>
                )}
                <Button onClick={() => submitAction() } title='Next step' variant='contained' sx={{...btn, marginLeft:'auto'}} disabled={isDisabled ? true : false} >
                    {confirmation ? 'Yes': "Next"}
                </Button>
            </Grid>
        )
    }


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SchoolIcon/>,
    2: <BadgeIcon />,
    3: <TelegramIcon />,
    4: <LeakAddIcon />,
    5: <SupportAgentIcon />,
    6: <AccountBalanceIcon />,
    7: <ShowChartIcon />,
    8: <LinkIcon />,
    9: <ChecklistRtlIcon />,
    10: <SettingsIcon />,
  };
//   WavingHandIcon

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
    'What is you iGenius #',
    'Add Name',
    'What is your Telegram Id?', 
    'Did you add your IGenius Id to your Telegram Bio?',
    'Who recruited you?',
    'Did you set up FXSWAY account?',
    'Did you download MT4 App?',
    'Did you link you MT4 trader account to FXWay account?',
    'Added options on your MT4 trader app?',
    'You have successfully completed the onboarding processs'
];

type Props = {
    progress: number
}

const ProgressStepper = ({progress}: Props) =>  {
  return (
    <Stack spacing={4}>
      <Stepper alternativeLabel activeStep={progress} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}> <span style={{color:"white"}}></span></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

const OnboardComplete = () => {

    const handleComplete = () => {
        const obj = {
            location: 'onboardStatus',
            locationValue: true
        }
        updateUserProgression(loginCredentials.uid, obj)
    }

    return(
        <>
            <Button onClick={handleComplete} title='Submit' variant='contained' color={"primary"}  >Proceed to dashboard </Button>
        </>
        )
}


    useEffect(() => {
        if(currentUser && currentUser.onBoardStatus  === null){
            return navigate('/dashboard')
        }

        getAllUsers()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const showVideo = () => {
        if(currentUser){
            if(currentUser.onBoardStatus > 3 && currentUser.onBoardStatus < 8)
                return FxswayVideo
            
        }

        return FxswayVideo
    }

    // const theme = useTheme();

    // const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    // const isSmall = useMediaQuery(theme.breakpoints.down('sm'));




    return( 
        <StyledEngineProvider>
            <Grid container justifyContent={'center'} alignItems={'center'} sx={gettingStarted}>

                <Grid item xs={12} md={4}>

                    <Grid container  justifyContent={'center'}>
                        <Grid item mb={1} display={{ xs: "none", md:"flex"}}>
                        {currentUser && (

                            <ProgressStepper progress={
                                currentUser.onBoardStatus
                                    ?  (currentUser.onBoardStatus - 1) 
                                    : 0
                                } />
                        )}

                        </Grid>
                            <Grid item mb={6}>

                            <video
                                style={{width: '100%', height: '100%'}}
                                controls
                            
                            >
                                <source src={showVideo()} type='video/mp4'/>
                            </video>
                            </Grid>
                        <Grid item xs={12} mb={12}>
                            <Grid container sx={gettingStartedProgressContainer}>
                                {currentUser && (

                                    <Grid container justifyContent={'space-between'} alignItems={'center'}  gap={4}>   
                                        <Typography variant="h6" gutterBottom sx={{fontWeight:"bold"}}>{steps[currentUser.onBoardStatus - 1]}</Typography>
                                        <CloseIcon  onClick={logoutUser} sx={{cursor:"pointer"}}/>
                                    </Grid>
                                )}

                                
                                { showProgressionStage() }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



                
            </Grid>
        </StyledEngineProvider>
    )
        
}