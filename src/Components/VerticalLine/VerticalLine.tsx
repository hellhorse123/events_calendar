import React from 'react';

import useStyles from './Styles';

const VerticalLine: () => JSX.Element = () => {
  const classes = useStyles();

  return <div className={classes.line} />;
};

export default VerticalLine;
