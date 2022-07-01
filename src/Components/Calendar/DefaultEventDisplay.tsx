import React, { useState } from 'react';

import Background from '../../assets/img/ImageProject.png';

import Grid from '@mui/material/Grid';

import useStyles from './Styles';

const DefaultEventDisplay: () => JSX.Element = () => {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  return (
    <Grid
      container
      xs={12}
      direction="row"
      style={{
        gap: 60,
        height: '100%',
      }}
    >
      <Grid
        container
        xs={6}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
          transition: 'filter 0.5s linear',
          filter: hover ? 'brightness(2) grayscale(0.1) opacity(0.7)' : 'none',
        }}
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
      >
        <Grid container direction="column" justifyContent="space-between" style={{ padding: 20 }}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid className={classes.dateText}>29 октября</Grid>
            <Grid className={classes.dateText}>1</Grid>
          </Grid>
          <Grid container direction="column">
            <Grid className={classes.headerText}>asd</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        xs
        container
        direction="column"
        style={{
          gap: 60,
          height: '100%',
        }}
      >
        <Grid
          container
          xs
          style={{
            backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '50%',
            cursor: 'pointer',
          }}
        >
          <Grid container direction="column" justifyContent="space-between" style={{ padding: 20 }}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid className={classes.dateText}>29.19</Grid>
              <Grid className={classes.dateText}>sda</Grid>
            </Grid>
            <Grid container direction="column">
              <Grid className={classes.headerText}>1</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          xs
          style={{
            backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '50%',
            cursor: 'pointer',
          }}
        >
          <Grid container direction="column" justifyContent="space-between" style={{ padding: 20 }}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid className={classes.dateText}>29.19</Grid>
              <Grid className={classes.dateText}>asdas</Grid>
            </Grid>
            <Grid container direction="column">
              <Grid className={classes.headerText}>dsadasd</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DefaultEventDisplay;
