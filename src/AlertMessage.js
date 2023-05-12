import React from 'react'
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const AlertMessage = ({ alertData }) => {
  const {severity, message, open} = alertData
  const [openAlert, setOpenAlert] = useState(false)
  const vertical = 'top', horizontal = 'center'
  useEffect(()=>{
    if(open){
      setOpenAlert(true)
      alertData.open = false
    }
  }, [open])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={openAlert} autoHideDuration={4000}  anchorOrigin={{ vertical, horizontal }} onClose={handleClose} >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage