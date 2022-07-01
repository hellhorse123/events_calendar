/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@mui/material/Tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TextField } from '@mui/material';
import { IconButton } from '@material-ui/core';
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import EditEventModal from '../EntityEditModals/EventEditModal';
import EditIcon from '@mui/icons-material/Edit';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';

import ShownModalEventContent from '../../UI/Modal/ShownModalEventContent';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import Line from '../../Line/Line';
import { useWindowSize } from '../../../rules/index';

import DateTimePicker from 'react-datetime-picker';

import { DeleteOneEventMutation, UpdateEventMutation } from '../graphql/mutations';

import { PutEventPosterMutation } from '../graphql/mutations';

import useStyles from './Styles';
import Telegram from '../../../assets/icons/Telegram.svg';

interface ProfileEventProps {
  id: number;
  inviteLink?: string;
  name: string;
  description: string;
  shortDescription?: string;
  organizer?: string;
  poster: string;
  date: Date;
  address?: string;
  format?: string;
  type?: string;
  telegramm?: string;
  seats?: number;
  author: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  };
  members: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  }[];

  visitors: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  }[];
  participians: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  }[];

  guests: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  }[];

  maybe: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  }[];

  isOwner?: boolean;
  role: string;
}

const ProfileEvent = (props: ProfileEventProps) => {
  const classes = useStyles();
  const updateEventsHandler = UpdateEventMutation();
  const [edit, setEdit] = useState(false);
  const [shortDescription, setShortDescription] = useState(props.shortDescription);
  const [title, setTitle] = useState(props.name);
  const deleteOneEventHandler = DeleteOneEventMutation();
  // const [themeValue, setThemeValue] = useState(props.theme);
  const [formatValue, setFormatValue] = useState(props.format);
  const [organizerValue, setOrganizerValue] = useState(props.organizer);
  const [dateValue, setDateValue] = useState(new Date());
  const putEventPosterHandler = PutEventPosterMutation();
  const [open, setOpen] = useState(false);

  const [openFullscreenEventModal, setOpenFullscreenEventModal] = useState(false);

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 5;
  const secondDefaultBlockHeight = width / 2.9;
  const thirdDefaultBlockHeight = width / 2.6;
  const fourthDefaultBlockHeight = width / 3.6;
  const fifthDefaultBlockHeight = width / 4;

  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (edit) {
      // const newEventData = {
      //   eventId: props.id,
      //   name: title,
      //   shortDescription,
      //   theme: themeValue,
      //   organizer: organizerValue,
      //   format: formatValue,
      //   date: dateValue,
      // };
      // await updateEventsHandler(newEventData);
      // window.location.reload();
    } else {
      setOpen(!open);
    }
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick: () => void = () => {
    hiddenFileInput?.current!.click();
  };

  const onTelegramHandle: () => void = () => {
    window.open(props.inviteLink);
  };

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileUploaded = event.target.files![0];
    const userImageData = {
      entityId: Number(props.id),
      fileName: fileUploaded.name,
      fileType: fileUploaded.type,
    };
    try {
      const uploadUrl = (await putEventPosterHandler(userImageData)).data;
      await fetch(uploadUrl!.putEventPoster.signedURL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: fileUploaded, // body data type must match "Content-Type" header
      });
      window.location.reload();
    } catch (e) {
      console.error('FILE_UPLOAD_ERROR', e);
    }
  };

  const fullscreenModalEventHandler = () => {
    if (openFullscreenEventModal) {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    } else {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    }
  };

  const formattedDate = new Date(props.date).toLocaleString().slice(0, -3);
  const formattedDateLetters = new Date(props.date)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .toLocaleString()
    .slice(0, -9);
  const timeToShow: string = formattedDate.slice(12, formattedDate.length);
  const dateToShow: string = formattedDate.slice(0, 10) + ' ' + formattedDate.slice(12, formattedDate.length);

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" className={classes.event}>
        <Grid container direction="row" justifyContent="space-between" xs={12} style={{ gap: 20 }}>
          {/* {props.isOwner ? (
            <Grid item>
              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
            </Grid>
          ) : null} */}
          <Grid item>
            <Grid container direction="row">
              <EditEventModal open={open} handleOpenClose={() => setOpen(!open)} eventId={props.id} />
              <Grid item>
                {/* {props.isOwner ? (
                  <IconButton aria-label="delete" onClick={(e: React.MouseEvent) => editButtonHandler(e)}>
                    {edit ? <DoneIcon fontSize="inherit" /> : <EditIcon fontSize="inherit" />}
                  </IconButton>
                ) : null} */}
              </Grid>
              <Grid item>
                {/* {props.isOwner ? (
                  <IconButton
                    aria-label="delete"
                    onClick={async () => {
                      await deleteOneEventHandler(props.id);
                      window.location.reload();
                    }}
                  >
                    <HighlightOffIcon fontSize="inherit" />
                  </IconButton>
                ) : null} */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid container xl={7} lg={7} md={12} sm={12} xs={12}>
            <Grid
              container
              xs
              className={classes.eventImage}
              style={{
                backgroundImage: `url(${props.poster})`,
                height: width > 1279 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
              }}
            />
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            xl
            lg
            md={12}
            sm={12}
            xs={12}
            className={classes.eventDescription}
            style={{
              gap: width < 1280 ? 12 : 12,
              paddingLeft: width < 1280 ? 0 : 50,
              paddingTop: width < 1280 ? 30 : 0,
            }}
          >
            {/* {edit && props.isOwner ? (
              <OutlinedInput
                fullWidth={true}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Название"
                color="primary"
                inputProps={{
                  maxLength: 96,
                }}
              />
            ) : ( */}
            <Grid container className={classes.eventDescriptionHeader}>
              {props.name}
            </Grid>
            {/* )} */}
            {/* {edit && props.isOwner ? (
              <OutlinedInput
                fullWidth={true}
                value={organizerValue}
                onChange={e => setOrganizerValue(e.target.value)}
                placeholder="Организатор"
                color="primary"
                inputProps={{
                  maxLength: 56,
                }}
              />
            ) : ( */}
            <Grid container className={classes.organizerText}>
              {props.organizer}
            </Grid>
            {/* )} */}
            {/* {edit && props.isOwner ? (
              <OutlinedInput
                fullWidth={true}
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                placeholder="Краткое описание"
                color="primary"
                inputProps={{
                  maxLength: 128,
                }}
              />
            ) : ( */}
            <Grid container className={classes.eventDescriptionTitle}>
              {shortDescription}
            </Grid>
            {/* )} */}
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Дата
              </Grid>
              {/* {edit && props.isOwner ? (
                <Grid container xs>
                  <DateTimePicker onChange={setDateValue} value={dateValue} />
                </Grid>
              ) : ( */}
              <Grid container xs className={classes.eventInfoText}>
                {formattedDateLetters}&emsp;
                {timeToShow}
              </Grid>
              {/* )} */}
            </Grid>
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Тип события
              </Grid>
              {/* {edit && props.isOwner ? (
                <OutlinedInput
                  fullWidth={true}
                  value={themeValue}
                  onChange={e => setThemeValue(e.target.value)}
                  placeholder="Тема мероприятия"
                  color="primary"
                  inputProps={{
                    maxLength: 62,
                  }}
                />
              ) : ( */}
              <Grid container xs className={classes.eventInfoText}>
                {props.type === 'local'
                  ? props.type.replace('local', 'Личное')
                  : props.type === 'command'
                  ? props.type.replace('command', 'Командное')
                  : props.type === 'general'
                  ? props.type.replace('general', 'Общее')
                  : props.type}
              </Grid>
              {/* )} */}
            </Grid>

            {props.format ? (
              <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
                <Grid container xs={4} className={classes.eventInfoTitle}>
                  Формат
                </Grid>
                {/* {edit && props.isOwner ? (
                  <OutlinedInput
                    fullWidth={true}
                    value={formatValue}
                    onChange={e => setFormatValue(e.target.value)}
                    placeholder="Формат мероприятия"
                    color="primary"
                    inputProps={{
                      maxLength: 36,
                    }}
                  />
                ) : ( */}
                <Grid container xs className={classes.eventInfoText}>
                  {props.format === 'offline'
                    ? props.format.replace('offline', 'Оффлайн')
                    : props.format === 'online'
                    ? props.format.replace('online', 'Онлайн')
                    : props.format}
                </Grid>
                {/* )} */}
              </Grid>
            ) : null}
            {props.inviteLink ? (
              <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
                <Grid container xs={4} className={classes.eventInfoTitle} onClick={onTelegramHandle}>
                  <img src={Telegram} />
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Button
            onClick={fullscreenModalEventHandler}
            onImage={false}
            isCancel={true}
            text="Узнать подробнее"
            className={classes.modalButton}
          />
        </Grid>
        <ShownModalEventContent
          id={props.id}
          inviteLink={props.inviteLink}
          img={props.poster}
          title={props.name}
          content={props.description}
          shortContent={props.shortDescription}
          date={props.date}
          time={timeToShow}
          telegramm={props.telegramm}
          address={props.address}
          format={props.format}
          type={props.type}
          organizer={props.organizer}
          author={props.author}
          open={openFullscreenEventModal}
          handleOpenClose={() => setOpenFullscreenEventModal(!openFullscreenEventModal)}
          isOwner={props.isOwner}
          role={props.role}
        />
      </Grid>
    </>
  );
};

export default ProfileEvent;
