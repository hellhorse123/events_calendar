import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useWindowSize } from '../../../../rules/index';

const SkeletonProjects = () => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;

  return (
    <Grid container columnSpacing={6} style={{ margin: 'auto' }}>
      <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={
            width < 1280 && width > 599
              ? secondDefaultBlockHeight
              : width < 600
              ? thirdDefaultBlockHeight
              : firstDefaultBlockHeight
          }
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </Grid>
      <Grid
        item
        xl={4}
        lg={4}
        md={6}
        sm={6}
        xs={12}
        // style={{ padding: width < 1280 && width > 599 ? 15 : width < 600 ? 0 : 30 }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={
            width < 1280 && width > 599
              ? secondDefaultBlockHeight
              : width < 600
              ? thirdDefaultBlockHeight
              : firstDefaultBlockHeight
          }
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </Grid>
      <Grid
        item
        xl={4}
        lg={4}
        md={6}
        sm={6}
        xs={12}
        // style={{ padding: width < 1280 && width > 599 ? 15 : width < 600 ? 0 : 30 }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={
            width < 1280 && width > 599
              ? secondDefaultBlockHeight
              : width < 600
              ? thirdDefaultBlockHeight
              : firstDefaultBlockHeight
          }
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </Grid>
    </Grid>
  );
};

export default SkeletonProjects;
