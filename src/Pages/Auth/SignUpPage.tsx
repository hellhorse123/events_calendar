import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';

import Header from '../../Components/Home/Header/Header';
import NavBar from '../../Components/UI/NavBar/NavBar';
import HeaderImage from './headerImage.png';
import { SIGN_UP_MUTATION } from './Graphql/Mutations';
import useStyles from './Style';
import Footer from '../../Components/Home/Footer/Footer';

interface UserCreateInput {
  firstname: string;
  lastname: string;
  login: string;
  email: string;
  password: string;
}

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Права защищены © '}
      <Link color="inherit" href="#">
        Oggetto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp: () => JSX.Element = () => {
  const classes = useStyles();
  const [fNameValue, setFnameValue] = useState('');
  const [lNameValue, setLNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [emailFormValue, setEmailFormValue] = useState('');
  const [passwordFormValue, setPaswordFormValue] = useState('');
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [signUpHandler, { data }] = useMutation<{ signUp: { token: string } }>(SIGN_UP_MUTATION);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (data && data.signUp !== null) {
    localStorage.setItem('token', data.signUp.token);
    history.push('/signin');
  } else if (data && data.signUp === null) {
    if (!open) {
      setOpen(true);
    }
  }

  const signUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInput: UserCreateInput = {
      firstname: fNameValue,
      lastname: lNameValue,
      email: emailFormValue,
      login: loginValue,
      password: passwordFormValue,
    };
    alert('asdasd');
    await signUpHandler({
      variables: {
        data: userInput,
      },
    });
    alert('asdasd');
    history.push('/signin');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Header />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${HeaderImage})`,
          }}
          className={classes.image}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
            <form className={classes.form} onSubmit={(e: React.FormEvent) => signUpSubmit(e)} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fName"
                value={fNameValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFnameValue(e.target.value)}
                label="Имя"
                name="fName"
                autoFocus
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Lastname"
                label="Фамилия"
                type="lName"
                id="lName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLNameValue(e.target.value)}
                value={lNameValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="login"
                label="Логин"
                type="login"
                id="login"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLoginValue(e.target.value)}
                value={loginValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Адрес почты"
                type="email"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailFormValue(e.target.value)}
                value={emailFormValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPaswordFormValue(e.target.value)}
                value={passwordFormValue}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submitButton}
                onClick={async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
                  e.preventDefault();
                  const userInput: UserCreateInput = {
                    firstname: fNameValue,
                    lastname: lNameValue,
                    email: emailFormValue,
                    login: loginValue,
                    password: passwordFormValue,
                  };
                  await signUpHandler({
                    variables: {
                      data: userInput,
                    },
                  });
                  history.push('/signin');
                }}
              >
                Зарегистрироваться
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Неправильный логин или пароль
                </Alert>
              </Snackbar>
              <Grid container />
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
