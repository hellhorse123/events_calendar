import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarType {
  openSnack: boolean;
  setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>;
  textInSnack: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarOnChange(props: SnackbarType): JSX.Element {
  const handleClose: (
    event?: React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined,
  ) => void = () => {
    props.setOpenSnack(!props.openSnack);
  };

  return (
    <Snackbar open={props.openSnack} autoHideDuration={4000} onClose={() => handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.textInSnack}
      </Alert>
    </Snackbar>
  );
}
