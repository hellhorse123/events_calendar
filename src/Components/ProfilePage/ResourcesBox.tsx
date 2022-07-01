import React, { Dispatch } from 'react';
import Grid from '@mui/material/Grid';

interface ResourcesBoxProps {
  classes: any;
  open: boolean;
  setOpen: Dispatch<boolean>;
  resourcesBoxName: string;
  title: string;
  description: string;
}

const ResourcesBox: (props: ResourcesBoxProps) => JSX.Element = (props: ResourcesBoxProps) => {
  return (
    <Grid container style={{ gap: 25, border: '0px solid' }} id={props.resourcesBoxName} className={props.classes.box}>
      <Grid container className={props.classes.modalFrame} />
    </Grid>
  );
};

export default ResourcesBox;
