import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import ShownModalEventContent from '../UI/Modal/ShownModalEventContent';

import { useWindowSize } from '../../rules/index';

import '../UI/Styles/CSS/Components/style.css';
import '../UI/Styles/CSS/Components/posterAnimation.css';

import useStyles, { ArrowIconWrapper, DescriptionResourceText } from './Styles';

interface EventCardProps {
  id: number;
  img: {
    link: string;
  };
  title: string;
  inviteLink?: string;
  content: string;
  shortContent?: string;
  date: Date;
  address?: string;
  format?: string;
  organizer?: string;
  seats?: number;
  type?: string;
  telegramm?: string;
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

const EventCard: (props: EventCardProps) => JSX.Element = (props: EventCardProps) => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 5;
  const secondDefaultBlockHeight = width / 2.96;

  const classes = useStyles();

  const [openFullscreenEventModal, setOpenFullscreenEventModal] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose: () => void = () => {
    setOpen(false);
  };
  const handleOpen: () => void = () => {
    setOpen(true);
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

  console.log(formattedDateLetters, timeToShow);
  const dateToShow: string = formattedDateLetters.slice(0, -9) + ' ' + formattedDate.slice(12, formattedDate.length);

  const fullscreenModalEventHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openFullscreenEventModal) {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    } else {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    }
  };

  return (
    // <Grid
    //   container
    //   xs
    //   style={{
    //     backgroundImage: `url(${props.img?.link})`,
    //     height: width > 1200 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
    //     position: 'relative',
    //   }}
    //   className={classes.eventCard}
    // >
    <>
      <Grid
        className="hover-text-one"
        style={{
          backgroundColor:
            props.img && props.img.link !== 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg'
              ? 'inherit'
              : '#AAADB3',
          cursor: 'pointer',
          marginBottom: 20,
        }}
        onClick={(e: React.MouseEvent) => fullscreenModalEventHandler(e)}
      >
        <figure
          className="effect-text-three"
          style={{
            height: width > 1200 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
            width: '100%',
            backgroundColor: '#AAADB3',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            margin: 0,
          }}
        >
          <img style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={props.img?.link} alt="" />
          <figcaption>
            <h3
              className={classes.dateText}
              style={{
                fontWeight: 400,
              }}
            >
              {formattedDateLetters}&emsp;
              {timeToShow}
            </h3>
            <p
              className={classes.titleText}
              style={{
                paddingBottom: 40,
              }}
            >
              {props.title}
            </p>
            <DescriptionResourceText>
              <Grid container justifyContent="center" alignItems="center" className={classes.posterTextBlock}>
                {props.shortContent}
              </Grid>
              <ArrowIconWrapper>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 26.9995L27 0.999667M27 0.999667L27 28.0005M27 0.999667L13.5001 0.999999L3.89473e-05 1.00045"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </ArrowIconWrapper>
            </DescriptionResourceText>
          </figcaption>
        </figure>
      </Grid>

      <ShownModalEventContent
        id={props.id}
        inviteLink={props.inviteLink}
        img={props.img.link}
        title={props.title}
        content={props.content}
        shortContent={props.shortContent}
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
        role={props.role}
      />
    </>
  );
};

export default EventCard;
