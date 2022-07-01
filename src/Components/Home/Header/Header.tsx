import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';

import useStyles from './Styles';
import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import NavBar from '../../UI/NavBar/NavBar';

import headerBG from '../../../assets/img/header.svg';

interface HeaderProps {
  platformTitle?: string;
  platformDescription?: string;
}

const Header: (props: HeaderProps) => JSX.Element = (props: HeaderProps) => {
  const history = useHistory();

  const onClickHandler: () => void = () => {
    window.open('https://oggetto.ru/');
  };

  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      className={classes.sloganImageBox}
      style={{
        backgroundImage: `url(${headerBG})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid xs={7} container justifyContent="space-evenly" className={classes.sloganTextContainer}>
        <Grid xs={12} container direction="column" alignItems="center" className={classes.sloganText}>
          <Grid item style={{ fontFamily: 'Playfair Display', cursor: 'pointer' }} onClick={onClickHandler}>
            Афиша
          </Grid>
          <Grid
            item
            style={{
              fontFamily: 'https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap',
              marginLeft: 'clamp(3.5rem, 1.6129rem + 8.3871vw, 10.3rem)',
              cursor: 'pointer',
            }}
            onClick={onClickHandler}
          >
            Oggetto
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={5} container alignItems="flex-start" justifyContent="flex-end" className={classes.sloganTextContainer}>
        <NavBar text="header" />
      </Grid>
    </Grid>
  );
};

export default Header;
