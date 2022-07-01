import React from 'react';

import EventsBlock from '../../Components/Calendar/EventsBlock';
import Grid from '@material-ui/core/Grid';

import { useWindowSize } from '../../rules/index';
import Header from '../../Components/Home/Header/Header';

import useStyles from './Styles';

const Home: () => JSX.Element = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} xs={12}>
      <Header />
      <Grid container xs={10} className={classes.articleBox}>
        <EventsBlock />
      </Grid>
    </Grid>
  );
};

export default Home;
