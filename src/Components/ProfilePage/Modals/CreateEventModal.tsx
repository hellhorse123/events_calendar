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
import { CreateEventMutation, GetUrlToUploadEventPoster } from './mutation';
import { ErrorAlert } from '../../UI/CustomErrorAlert/ErrorAlert';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';

import imgModalDefault from '../../../assets/img/imgModal.svg';
import useStyles from './Styles';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';

interface ModalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  userId: number;
}

const CreateEventModal: (props: ModalFrameProps) => JSX.Element = (props: ModalFrameProps) => {
  const getUrlToUploadEventPosterHandler = GetUrlToUploadEventPoster();
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

  const [imgModal, setImgModal] = useState(imgModalDefault);

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

  const createEventHandler = CreateEventMutation();

  const handleChangeFormat = (event: SelectChangeEvent) => {
    setEventFormatValue(event.target.value);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setEventTypeValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (
      titleValue &&
      eventFormatValue &&
      shortDescriptionValue &&
      descriptionValue &&
      dateValue &&
      organizerValue &&
      placeValue &&
      eventTypeValue
    ) {
      setOpenNoneClick(true);
      const newEventData = {
        title: titleValue,
        organizer: organizerValue,
        description: descriptionValue,
        shortDescription: shortDescriptionValue,
        date: dateValue,
        place: placeValue,
        format: eventFormatValue,
        type: eventTypeValue,
        ...(eventTelegrammValue && { telegramm: eventTelegrammValue }),
        ...(eventSeatsValue && { seats: eventSeatsValue }),
      };

      const eventId = await createEventHandler(newEventData);
      if (posterValue.size !== 0) {
        const PosterData = {
          fileName: posterValue.name,
          entityId: Number(eventId.data?.createOneEvent),
          fileType: posterValue.type,
        };
        const uploadUrl = await getUrlToUploadEventPosterHandler(PosterData);
        await fetch(uploadUrl.data!.putEventPoster.signedURL, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': posterValue.type,
          },
          //@ts-ignore
          body: posterValue, // body data type must match "Content-Type" header
        });
      }
      props.handleOpenClose();
      window.location.reload();
      setOpenNoneClick(false);
    } else {
      ErrorAlert();
    }
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick: () => void = () => {
    // @ts-ignore
    hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileUploaded = event.target.files![0];
    setImgModal(URL.createObjectURL(fileUploaded));
    setPosterValue(fileUploaded);
  };

  const classes = useStyles();

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            ???????????????? ??????????????????????
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ????????????????
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={titleValue}
                value={titleValue}
                placeholder="????????????????"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitleValue(e.target.value)}
                inputProps={{
                  maxLength: 96,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ?????????????? ????????????????
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={shortDescriptionValue}
                value={shortDescriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
                placeholder="?????????????? ????????????????"
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ????????
            </Grid>
            <Grid container xs>
              <DateTimePicker onChange={setDateValue} value={dateValue} />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ???????????????? ???????????? ??????????????????????
            </Grid>
            <Grid container xs>
              <Select value={eventFormatValue} onChange={handleChangeFormat} fullWidth>
                <MenuItem value={'online'}>????????????</MenuItem>
                <MenuItem value={'offline'}>??????????????</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ??????????????????????
            </Grid>
            <Grid container xs direction="column" style={{ gap: 15 }}>
              <Grid>???????????????? ?????????????????????? ?????? ???????????? ?????????????????????? (???? ??????????????????????)</Grid>
              <Grid container direction="row" style={{ gap: 20 }}>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                <ModalImageContainer
                  container
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleClick}
                  xs={4}
                  isDefault={imgModal === imgModalDefault}
                >
                  <ModalImage src={imgModal} isDefault={imgModal === imgModalDefault} />
                </ModalImageContainer>
                <Grid container xs alignItems="center" className={classes.imgConditionText}>
                  JPEG ?????? PNG
                  <br />
                  ?????????????????????? ???????????? - 930x385px
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ???????????????? ?????? ??????????????????????
            </Grid>
            <Grid container xs>
              <Select value={eventTypeValue} onChange={handleChangeType} fullWidth>
                <MenuItem value={'local'}>????????????</MenuItem>
                <MenuItem value={'command'}>??????????????????</MenuItem>
                <MenuItem value={'general'}>??????????</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ???????????? ???????????????? ?????????????????????? (???????????????????? ????????????, ???????? ????????????????????)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder="????????????????"
                multiline={true}
                color="primary"
                inputProps={{
                  maxLength: 8128,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ?????????????????????? ??????????????????????
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={organizerValue}
                value={organizerValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setOrganizerValue(e.target.value)}
                placeholder="?????????????????????? ??????????????????????"
                inputProps={{
                  maxLength: 56,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ???????????????? ?????? ?????????? (???? ??????????????????????)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={eventTelegrammValue}
                value={eventTelegrammValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEventTelegrammValue(e.target.value)}
                placeholder="????????????????"
                inputProps={{
                  maxLength: 62,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ?????????? ????????????????????
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={placeValue}
                value={placeValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPlaceValue(e.target.value)}
                placeholder="?????????? ????????????????????"
                inputProps={{
                  maxLength: 96,
                }}
              />
            </Grid>
          </Grid>

          {/* <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              ???????????????????? ???????? (???? ??????????????????????)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={eventSeatsValue}
                value={eventSeatsValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEventSeatsValue(e.target.value)}
                placeholder="???????????????????? ????????"
                inputProps={{
                  maxLength: 36,
                }}
              />
            </Grid>
          </Grid> */}
          <Grid container justifyContent="flex-end">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              xs={9}
              style={{ border: '0px solid #000', marginTop: 40, paddingLeft: 60, gap: 20 }}
            >
              <Grid container xs>
                <Button
                  onClick={props.handleOpenClose}
                  isCancel={true}
                  text="????????????????"
                  className={classes.modalButton}
                />
              </Grid>

              <Grid container xs>
                <Button onClick={onClickHandler} text="??????????????" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
