import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAuth } from '../../utils/Auth/AuthContext';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import Grid from '@mui/material/Grid/Grid';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const  ErrorDialogue = () =>  {

  const {handleAlerts, dialog} = useAuth()

  const handleClose = () => {
    handleAlerts();
  };

  return (
    <Dialog
        open={dialog.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
    <Grid container sx={{p:4}} flexBasis={'column'}>
      <Grid item xs={12}>

        <DialogContentText id="alert-dialog-slide-description" sx={{mb:2}}>
            {dialog.message}
          </DialogContentText>
      </Grid>
      <Grid item xs={12}>

        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Grid>
    </Grid>
      </Dialog>
  );
}