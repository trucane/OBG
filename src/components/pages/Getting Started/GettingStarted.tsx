import React, { useEffect } from 'react';
import { useAuth } from '../../../utils/Auth/AuthContext';
import { useNavigate } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {StyledEngineProvider} from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LinkIcon from '@mui/icons-material/Link';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import {gettingStarted, gettingStartedProgressContainer, gettingStarted_btn, gettingStarted_btn_container} from './getting-started.jsx';


type BtnContainerPrps = {
    isDisabled?: boolean
    submitAction: () => void
    confirmation?: boolean
}


export const GettingStartedComponent = () => {

    const {currentUser, updateUserProgression, loginCredentials, getAllUsers, users, logoutUser} = useAuth()
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(true);
    const [recruiterSelection, setRecruiterSelection] = React.useState<string | null>('');
    const [igeniusId, setIgeniusId] = React.useState<string>('');
    const [telegramIdInput, setTelegramIdInput] = React.useState<string | null>('');
    const handleClose = () => setOpen(false);

    const showProgressionStage = () => {
        switch (currentUser?.onBoardStatus) {
            case 1:
                return telegramId()
            case 2:
                return recruiter() 
            case 3:
                return igenius()
            case 4:
                return fxsway()
            case 5:
                return mt4Trader()
            case 6:
                return linkMT4_to_Fxsway()
            case 7:
                return addOptionsOn_Mt4() 
            case 8:
                return null
        
            default: return null
        }
    }

    const recruiter = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'recruitedBy',
                locationValue: recruiterSelection
            }
            updateUserProgression(loginCredentials.uid, obj)
        }

        const getRecruits = () => {
            return users.filter(user => user.email !== currentUser?.email).map(a => a.nickName)
        }
    
        return <div className="igenius" >
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Who recruited you</Typography>
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
                    isDisabled={recruiterSelection && recruiterSelection.length > 2 ? false : true}
                    submitAction={onBoardProgression}
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
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>What is you iGenius #</Typography>
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


    const fxsway = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Did you set up FXSWAY account?</Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
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
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Did you download MT4 App</Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
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
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Did you link you MT4 trader account to FXWay account?</Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
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
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Added options on your MT4 trader app?</Typography>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                confirmation={true}
            />
        </div>
    }

    const telegramId = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'add_mt4_options',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>What is your Telegram Id?</Typography>
            <Box sx={{ minWidth: 120, margin:"4rem 0", display:"flex", justifyContent:"center"  }}>
                <TextField id="outlined-basic" label="Example: .te/my name" variant="outlined" value={telegramIdInput} onChange={(event) => setTelegramIdInput(event.target.value)}/>
            </Box>
            <ProgressionBtnCont
                submitAction={onBoardProgression}
                isDisabled={telegramIdInput && telegramIdInput.length > 3 ? false : true}
            />
        </div>
    }

    const ProgressionBtnCont = ({isDisabled, submitAction, confirmation}: BtnContainerPrps) => {
        return(
            <Box sx={gettingStarted_btn_container}>
                <Button onClick={() => submitAction() } title='Next step' variant='contained' color={"success"} sx={gettingStarted_btn} disabled={isDisabled ? true : false} >
                    {confirmation ? 'Yes': "Next Step"}
                </Button>
                <Button onClick={logoutUser} title='Warning this will save your progression and exit out of the onboarding process' variant='contained' color={"error"} sx={gettingStarted_btn}  >Save and Exit </Button>
            </Box>
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
    1: <WavingHandIcon />,
    2: <SupportAgentIcon />,
    3: <SchoolIcon />,
    4: <ShowChartIcon />,
    5: <AccountBalanceIcon />,
    6: <LinkIcon />,
    7: <ChecklistRtlIcon />,
    8: <SettingsIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Telegram Id',  'Recruited By', 'Register for Igenius', 'Setup FXSWAY account', 'Setup MT4 Trader app', 'Link Demo to MT4', 'Add options list to MT4' ];

type Props = {
    progress: number
}
const ProgressStepper = ({progress}: Props) =>  {
  return (
    <Stack sx={{ width: '100%', mb: 4, }} spacing={4}>
      <Stepper alternativeLabel activeStep={progress} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}> <span style={{color:"white"}}>{label}</span></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

const OnboardComplete = () => {

    return(
        <>
            <Typography variant="h3" gutterBottom> You have successfully completed the onboarding processs</Typography>
            <Button onClick={handleClose} title='Submit' variant='contained' color={"primary"} sx={gettingStarted_btn}  >Proceed to dashboard </Button>
        </>
        )
}


    useEffect(() => {
        if(currentUser && currentUser.onBoardStatus  === 8){
            navigate('/dashboard')
        }

        getAllUsers()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return( 
        <StyledEngineProvider>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                    timeout: 500,
                    },
                }}
            >

            <Fade in={open}>
                <Box sx={gettingStarted}>
                    <ProgressStepper progress={(currentUser && currentUser.onBoardStatus) ?  (currentUser.onBoardStatus - 1) : 0} />
                    <Box sx={gettingStartedProgressContainer}>
                        { currentUser?.onBoardStatus !== 8

                            ? showProgressionStage()
                            : <OnboardComplete/>
                        }
                    </Box>
                </Box>
            </Fade>
        </Modal>
        </StyledEngineProvider>
    )
        
}