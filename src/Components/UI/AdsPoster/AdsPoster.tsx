import React from 'react';
import Grid from '@material-ui/core/Grid';

import Line from '../../Line/Line';
import { useWindowSize } from '../../../rules/index';

import useStyles from './Styles';

interface AdsPosterProps {
  header: string;
  authors: string[];
  title: string;
  img: string;
}

const AdsPoster: (props: AdsPosterProps) => JSX.Element = (props: AdsPosterProps) => {
  const classes = useStyles();

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6;

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" className={classes.project} xs={8}>
        <Grid container xl={8} lg={7} md={12} sm={12} xs={12}>
          <Grid
            className={classes.projectImage}
            style={{ backgroundImage: `url(${props.img})`, height: firstDefaultBlockHeight }}
          />
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          xl
          lg
          md={12}
          sm={12}
          xs={12}
          className={classes.projectDescription}
        >
          <Grid className={classes.projectDescriptionHeader}>
            {props.header}
            <Grid className={classes.projectDescriptionTitle}>{props.title}</Grid>
          </Grid>
          <Grid className={classes.projectDescriptionLinkContainer}>
            {props.authors.map(author => (
              <Grid key={author} className={classes.projectDescriptionLink}>
                {author}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Line />
    </>
  );
};

export default AdsPoster;
