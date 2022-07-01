import React from 'react';

import useStyles from './Styles';

interface LineProps {
  marginTop?: number;
  marginBottom?: number;
  display?: string;
}

const Line: (props: LineProps) => JSX.Element = (props: LineProps) => {
  const classes = useStyles();

  return (
    <div
      className={classes.line}
      style={{
        marginTop: props.marginTop ? props.marginTop : 30,
        marginBottom: props.marginBottom ? props.marginBottom : 30,
        display: props.display ? props.display : 'block',
      }}
    />
  );
};

export default Line;
