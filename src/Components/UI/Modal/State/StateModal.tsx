/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
import { ErrorAlert } from '../../../UI/CustomErrorAlert/ErrorAlert';
import Button from '../../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../../UI/NoneClickableField/NoneClick';

import { GET_EVENT_STATISTIC_QUERY } from '../../../../Queries';

import useStyles from './Styles';

interface ModalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
}

const StateModal: (props: ModalFrameProps) => JSX.Element = (props: ModalFrameProps) => {
  const [titleValue, setTitleValue] = useState('');
  const [organizerValue, setOrganizerValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [placeValue, setPlaceValue] = useState('');
  const [eventFormatValue, setEventFormatValue] = useState('');
  const [eventTypeValue, setEventTypeValue] = useState('');
  const [eventTelegrammValue, setEventTelegrammValue] = useState('');
  const [eventSeatsValue, setEventSeatsValue] = useState('');

  const [posterValue, setPosterValue] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: '',
    type: '',
    size: 0,
  });

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const handleChangeFormat = (event: SelectChangeEvent) => {
    setEventFormatValue(event.target.value);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setEventTypeValue(event.target.value);
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick: () => void = () => {
    // @ts-ignore
    hiddenFileInput.current.click();
  };

  const classes = useStyles();

  console.log(props);

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            Статистика Мероприятия
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default StateModal;
