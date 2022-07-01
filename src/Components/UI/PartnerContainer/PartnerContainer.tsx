import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import useStyles from './Styles';

interface PartnerContainerProps {
  img: string;
  link: string;
}

const PartnerContainer: (props: PartnerContainerProps) => JSX.Element = (props: PartnerContainerProps) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const onClickHandler: () => void = () => {
    window.open(props.link);
  };

  return (
    <Grid
      style={{
        color: 'black',
        backgroundColor: '#fff',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #d0d2d6',
      }}
    >
      <Grid
        container
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{
          maxWidth: 200,
          padding: '17% 10%',
          transform: hover ? 'scale(1.15)' : 'scale(1.0)',
          transition: 'all 0.5s ease',
          cursor: 'pointer',
        }}
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
        onClick={(): void => onClickHandler()}
      >
        <img src={props.img} className={classes.partnerImg} />
      </Grid>
    </Grid>
  );
};

export default PartnerContainer;
