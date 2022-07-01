import React, { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import Fade from '@mui/material/Fade';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import useStyles from './Styles';

interface ModalProps {
  id: number;
  header: string;
  img: string;
  shortDescription: string;
  description: string;
  date: string;
}

export default function ResourcesModal(props: ModalProps): JSX.Element {
  const classes = useStyles();

  const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
    color: #aaadb3;
    :hover {
      color: #252525;
    }
  `;
  const [open, setOpen] = useState(false);
  const handleOpen: () => void = () => {
    setOpen(true);
  };
  const handleClose: () => void = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        onClick={handleOpen}
        style={{
          cursor: 'pointer',
          textTransform: 'uppercase',
          color: '#252525',
          fontSize: 18,
          lineHeight: '130%',
          fontWeight: 400,
          marginTop: 20,
        }}
      >
        <Grid container alignItems="center">
          Открыть описание&nbsp;
          <HiOutlineArrowNarrowRight style={{ fontSize: 'clamp(1rem, 0.3438rem + 2.9167vw, 1.875rem)' }} />
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          zIndex: 1600,
        }}
      >
        <Fade in={open}>
          <Grid container xs={12} direction="row" justifyContent="center">
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                p: 4,
                color: '#252525',
                overflow: 'scroll',
              }}
            >
              <Grid container xs={10} direction="column" alignItems="center" style={{ margin: 'auto' }}>
                <Typography id="transition-modal-title" variant="h4" align="center" gutterBottom={true}>
                  {props.header}
                </Typography>
                <Typography id="transition-modal-description" sx={{ margin: 'auto' }}>
                  <p>
                    {props.img ? (
                      <img
                        src={props.img}
                        style={{
                          float: 'left',
                          marginRight: 20,
                        }}
                        className={classes.articleImage}
                      />
                    ) : null}
                    {props.description}
                  </p>
                </Typography>
              </Grid>

              <CloseModalButton aria-label="Close modal" onClick={handleClose} />
            </Box>
          </Grid>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
