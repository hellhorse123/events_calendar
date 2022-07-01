import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useWindowSize } from '../../../../rules/index';

const SkeletonCompanyCards = () => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = (width - width / 4.5) / 3.2;
  const secondDefaultBlockHeight = width / 2;

  return (
    <Grid container columnSpacing={6}>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkeletonCompanyCards;
