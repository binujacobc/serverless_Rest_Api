import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function AlertMessage(props) {
	const { vertical, horizontal} = {vertical: 'top',horizontal: 'right'};

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar 
			open={props.open??true} 
			autoHideDuration={3000}             
	        anchorOrigin={{ vertical, horizontal }}
        >
        <Alert  severity={props.message.severity??"error"} sx={{ width: '100%' }}>
          {props.message.msg??"N/a"}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
