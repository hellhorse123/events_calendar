/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Input from '@mui/material/Input';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { EmailDispatchMutation } from './graphql/mutations';

import Button from '../UI/Buttons/OutlinedButton/Button';
import useStyles from './Styles';

const EventInfo: () => JSX.Element = () => {
  const EmailDispatchHandler = EmailDispatchMutation();

  const [emailValue, setEmailValue] = useState('');

  const onClickHandler: () => Promise<void> = async () => {
    if (emailValue) {
      const emailData = {
        email: emailValue,
      };
      await EmailDispatchHandler(emailData);
      window.location.reload();
      // await refetch();
    }
  };

  const classes = useStyles();

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiOutlinedInput-root': {
      // borderColor: '#AAADB2',
      '& fieldset': {
        border: 0,
        borderBottom: '1px solid #AAADB2',
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderBottom: '1px solid #FF5631',
        borderRadius: 0,
      },
      '&.Mui-focused fieldset': {
        border: 0,
        borderBottom: '1px solid',
      },
      '& .MuiOutlinedInput-input': {
        padding: '0 0 10px 0',
      },
    },
  });

  return (
    <>
      <Grid container direction="column" className={classes.eventInfoContainer}>
        <Grid container className={classes.eventInfoHeader}>
          Будьте в курсе всех событий
        </Grid>
        <Grid container className={classes.eventInfoTitle}>
          Оформите бесплатную подписку и узнавайте о предстоящих мероприятиях платформы
        </Grid>
        <Grid container direction="row" justifyContent="space-between" className={classes.eventInfoMailBox}>
          <Grid item xs={9}>
            <OutlinedInput
              placeholder="Адрес почты"
              defaultValue={emailValue}
              value={emailValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailValue(e.target.value)}
              fullWidth={true}
              id="custom-css-outlined-input"
            />
          </Grid>
          <Grid item xs>
            <Button onClick={onClickHandler} text="ОК" className={classes.eventInfoButton} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EventInfo;
