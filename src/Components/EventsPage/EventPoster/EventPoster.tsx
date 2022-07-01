/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import EditIcon from '@mui/icons-material/Edit';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';

import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';

import ShownModalEventContent from '../../UI/Modal/ShownModalEventContent';
import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import Line from '../../Line/Line';
import Input from '@mui/material/Input';
import { useWindowSize } from '../../../rules/index';

import useStyles from './Styles';

interface EventPosterProps {
  id: number;
  name: string;
  poster: {
    link: string;
  };
  description: string;
  shortDescription: string;
  date: Date;
  organizer: string;
  format?: string;
  theme: string;
  address: string;
  stream?: {
    id: number;
    streamKey: string;
    active: boolean;
  };
}
// : (props: ProjectPosterProps) => JSX.Element = (props: ProjectPosterProps)

const EventPoster = (props: EventPosterProps) => {
  const classes = useStyles();
  // const updateEventsHandler = UpdateEventsMutation();
  const [edit, setEdit] = useState(true);
  const [shortDescription, setShortDescription] = useState(props.shortDescription);
  // const [title, setTitle] = useState(props.title);
  const [openFullscreenEventModal, setOpenFullscreenEventModal] = useState(false);

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 5;
  const secondDefaultBlockHeight = width / 2.9;
  const thirdDefaultBlockHeight = width / 2.6;
  const fourthDefaultBlockHeight = width / 3.6;
  const fifthDefaultBlockHeight = width / 4;

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
  // const dateToShow: string = formattedDate.slice(0, 10) + ' ' + formattedDate.slice(12, formattedDate.length);

  const fullscreenModalEventHandler = () => {
    if (openFullscreenEventModal) {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    } else {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    }
  };

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" className={classes.event} style={{}}>
        <Grid container direction="row">
          <Grid container xl={7} lg={7} md={12} sm={12} xs={12}>
            <Grid
              container
              xs
              className={classes.eventImage}
              style={{
                backgroundImage: `url(${props.poster?.link})`,

                // height:
                //   width < 601
                //     ? firstDefaultBlockHeight
                //     : width < 900
                //     ? secondDefaultBlockHeight
                //     : width < 1280
                //     ? thirdDefaultBlockHeight
                //     : width < 1920
                //     ? fourthDefaultBlockHeight
                //     : fifthDefaultBlockHeight,
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
            <Grid container className={classes.eventDescriptionHeader}>
              {props.name}
            </Grid>

            <Grid container className={classes.organizerText}>
              {props.organizer}
            </Grid>

            <Grid container className={classes.eventDescriptionTitle}>
              {shortDescription}
            </Grid>
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Тема
              </Grid>

              <Grid container xs className={classes.eventInfoText}>
                {props.theme}
              </Grid>
            </Grid>
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Дата
              </Grid>

              <Grid container xs className={classes.eventInfoText}>
                {formattedDateLetters}&emsp;
                {timeToShow}
              </Grid>
            </Grid>
            {props.format ? (
              <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
                <Grid container xs={4} className={classes.eventInfoTitle}>
                  Формат
                </Grid>
                <Grid container xs className={classes.eventInfoText}>
                  {props.format === 'offline'
                    ? props.format.replace('offline', 'Оффлайн')
                    : props.format === 'online'
                    ? props.format.replace('online', 'Онлайн')
                    : props.format}
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
        {/* <ShownModalEventContent
          id={props.id}
          date={props.date}
          time={timeToShow}
          header={props.name}
          img={props.poster?.link}
          article={props.description}
          onImage={false}
          isEvent={true}
          isCancel={true}
          eventOrganizer={props.organizer}
          eventAddress={props.address}
          eventFormat={props.format}
          eventTheme={props.theme}
          open={openFullscreenEventModal}
          handleOpenClose={() => setOpenFullscreenEventModal(!openFullscreenEventModal)}
          stream={props.stream}
        /> */}
      </Grid>
      <Line />
    </>
  );
};

export default EventPoster;
