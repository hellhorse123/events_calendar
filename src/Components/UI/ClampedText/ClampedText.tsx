import { Grid } from '@material-ui/core';
import React from 'react';

interface ClampedTextProps {
  linesToShow: number;
  lineHeight: number;
  toColor: string;
}

const ClampedText: React.FC<ClampedTextProps> = ({ linesToShow, lineHeight, toColor, children }) => {
  // высота одной строки lineHeight (em)
  // высота блока linesToShow * lineHeight (em)
  const blockHeight = (linesToShow * lineHeight).toString() + 'em';

  return (
    <Grid
      style={{
        position: 'relative',
        maxHeight: blockHeight,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontSize: 'inherit',
          lineHeight: lineHeight,
          fontWeight: 'inherit',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          top: blockHeight,
          right: 0,
          transform: 'translateY(-100%)',
          width: '70%',
          height: lineHeight.toString() + 'em',
          background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(${toColor}, 0.95) 60%)`,
        }}
      />
    </Grid>
  );
};
export default ClampedText;
