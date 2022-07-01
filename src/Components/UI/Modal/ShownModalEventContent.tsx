/* eslint-disable @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { HttpLink } from '@apollo/client';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import React, { useState } from 'react';
// @ts-ignore
import { ReactFlvPlayer } from 'react-flv-player';
import Countdown from 'react-countdown';
import { MdClose } from 'react-icons/md';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import styled from 'styled-components';

import Telegram from '../../../assets/icons/Telegram.svg';
import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';
import { useWindowSize } from '../../../rules/index';
import { ErrorAlert } from '../../UI/CustomErrorAlert/ErrorAlert';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import StateModal from './State/StateModal';

import useStyles from './style';
import { CreateRegisterMutation } from './mutation';

import { ShownModalEventContentProps } from './typings';

export default function ShownModalEventContent(props: ShownModalEventContentProps): JSX.Element {
  const classes = useStyles();
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 2;

  const [edit, setEdit] = useState(false);

  const [registerTypeValue, setRegisterTypeValue] = useState('');
  const [decideValue, setDecideValue] = useState('');

  const [openModalState, setOpenModalState] = useState(false);

  const onTelegramHandle: () => void = () => {
    window.open(props.telegramm);
  };

  const handleChangeRegister = (event: SelectChangeEvent) => {
    setRegisterTypeValue(event.target.value);
  };

  const handleChangeDecide = (event: SelectChangeEvent) => {
    setDecideValue(event.target.value);
  };

  const handleOpenCloseState: () => void = () => {
    setOpenModalState(!openModalState);
  };

  const createRegisterHandler = CreateRegisterMutation();

  const formattedDateLetters = new Date(props.date)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    right: 0;
    width: 48px;
    height: 48px;
    padding: 0;
    z-index: 10;
    color: #fff;
    :hover {
      transition: all 0.5s ease;
      color: #ff5631;
    }
  `;

  const onClickHandler: () => Promise<void> = async () => {
    if (registerTypeValue && decideValue) {
      const newRegData = {
        eventId: props.id,
        registerType: registerTypeValue,
        decided: decideValue,
      };
      await createRegisterHandler(newRegData);
    } else {
      ErrorAlert();
    }
  };

  console.log(props);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleOpenClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        zIndex: 16,
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            color: '#252525',
            overflow: 'auto',
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: 100, margin: 'auto', paddingBottom: 60 }}
            xs={12}
          >
            <Grid
              container
              xs={12}
              justifyContent="center"
              style={{
                backgroundImage: `url(${props.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: firstDefaultBlockHeight,
              }}
            >
              <Grid
                container
                justifyContent="center"
                xs={12}
                style={{ background: 'rgba(0,0,0,0.2)', padding: '100px 0' }}
              >
                <Grid container xs={9} direction="row" alignItems="flex-start" style={{ position: 'relative' }}>
                  <Grid container xs={8} direction="row" alignItems="flex-start" style={{ gap: 50 }}>
                    <Grid
                      container
                      direction="column"
                      style={{ gap: 12, paddingBottom: 40 }}
                      className={classes.eventHeaderDate}
                    >
                      <Grid>{formattedDateLetters.slice(0, -8)}</Grid>
                      <Grid>{props.time}</Grid>
                    </Grid>
                    <Grid container className={classes.eventHeader} style={{ textTransform: 'uppercase' }}>
                      {props.title}
                    </Grid>
                  </Grid>
                  <CloseModalButton aria-label="Close modal" onClick={props.handleOpenClose} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={9} justifyContent="center" style={{ gap: 70 }}>
              <Grid container justifyContent="space-between">
                <Grid
                  container
                  className={classes.fullModalArticle}
                  direction="row"
                  alignItems="flex-start"
                  xs={7}
                  style={{ gap: 20 }}
                >
                  <Grid container className={classes.modalArticleHeader} style={{ marginTop: 50 }}>
                    О мероприятии
                  </Grid>
                  {/* {edit && props.isOwner ? (
                    <OutlinedInput
                      fullWidth={true}
                      value={articleValue}
                      onChange={e => setArticleValue(e.target.value)}
                      placeholder="Описание"
                      color="primary"
                      multiline
                      inputProps={{
                        maxLength: 8128,
                      }}
                    />
                  ) : ( */}
                  <Grid container>
                    <ReactMarkdown key={props.content} plugins={[gfm, a11yEmoji]} className={style.reactMarkDown}>
                      {props.content}
                    </ReactMarkdown>
                  </Grid>
                  {/* )} */}
                </Grid>
                <Grid container direction="column" xs={4} style={{ gap: 12 }}>
                  <Grid container direction={width < 900 ? 'column' : 'row'} style={{ gap: 5 }}>
                    <Grid container xs={5} className={classes.eventInfoTitle}>
                      Дата
                    </Grid>
                    <Grid container xs className={classes.eventInfoText}>
                      {formattedDateLetters}
                    </Grid>
                  </Grid>
                  <Grid container direction={width < 900 ? 'column' : 'row'} style={{ gap: 5 }}>
                    <Grid container xs={5} className={classes.eventInfoTitle}>
                      Время
                    </Grid>
                    <Grid container xs className={classes.eventInfoText}>
                      {props.time}
                    </Grid>
                  </Grid>
                  <Grid container direction={width < 900 ? 'column' : 'row'} style={{ gap: 5 }}>
                    <Grid container xs={5} className={classes.eventInfoTitle}>
                      Тип мероприятия
                    </Grid>
                    <Grid container xs className={classes.eventInfoText}>
                      {props.type === 'local'
                        ? props.type.replace('local', 'Личное')
                        : props.type === 'command'
                        ? props.type.replace('command', 'Командное')
                        : props.type === 'general'
                        ? props.type.replace('general', 'Общее')
                        : props.type}
                    </Grid>
                  </Grid>

                  {props.format ? (
                    <Grid container direction={width < 900 ? 'column' : 'row'} style={{ gap: 5 }}>
                      <Grid container xs={5} className={classes.eventInfoTitle}>
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
                  <Grid container direction={width < 900 ? 'column' : 'row'} style={{ gap: 5 }}>
                    <Grid container xs={5} className={classes.eventInfoTitle}>
                      Оганизатор
                    </Grid>
                    <Grid container xs className={classes.organizerText}>
                      {props.organizer}
                    </Grid>
                  </Grid>
                  {props.telegramm ? (
                    <Grid container direction="row" style={{ gap: 5 }}>
                      <Grid container xs={5} className={classes.eventInfoTitle}>
                        <img
                          src={Telegram}
                          style={{
                            width: 50,
                            height: 50,
                            padding: 5,
                            backgroundColor: '#38AEF0',
                            borderRadius: '50%',
                            cursor: 'pointer',
                          }}
                          onClick={onTelegramHandle}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container style={{ gap: 70 }}>
                {props.address ? (
                  <Grid className={classes.fullModalArticle} container direction="row" style={{ gap: 20 }}>
                    <Grid container className={classes.modalArticleHeader}>
                      Адрес мероприятия
                    </Grid>
                    {/* {edit && props.isOwner ? (
                      <OutlinedInput
                        fullWidth={true}
                        value={addressValue}
                        onChange={e => setAddressValue(e.target.value)}
                        placeholder="Адрес"
                        color="primary"
                        inputProps={{
                          maxLength: 96,
                        }}
                      />
                    ) : ( */}
                    <Grid container>
                      <ReactMarkdown key={props.address} plugins={[gfm, a11yEmoji]} className={style.reactMarkDown}>
                        {props.address}
                      </ReactMarkdown>
                    </Grid>
                    {/* )} */}
                  </Grid>
                ) : null}
              </Grid>
              {props.isOwner ? null : (
                <Grid container>
                  <Grid container justifyContent="flex-start" xs={width < 960 ? 12 : 6} style={{ gap: 20 }}>
                    <Grid container className={classes.modalArticleHeader}>
                      Запись на мероприятие
                    </Grid>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Кто вы?</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="participians"
                        name="radio-buttons-group"
                        value={registerTypeValue}
                        onChange={handleChangeRegister}
                      >
                        <FormControlLabel value="participians" control={<Radio />} label="Участник" />
                        <FormControlLabel value="guests" control={<Radio />} label="Гость" />
                      </RadioGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Хотите посетить мероприятие?</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="willgo"
                        name="radio-buttons-group"
                        value={decideValue}
                        onChange={handleChangeDecide}
                      >
                        <FormControlLabel value="willgo" control={<Radio />} label="Пойду" />
                        <FormControlLabel value="maybego" control={<Radio />} label="Возможно пойду" />
                      </RadioGroup>
                    </FormControl>
                    <Button
                      onClick={onClickHandler}
                      isOrange={true}
                      text="Записаться"
                      className={classes.eventRegButton}
                    />
                  </Grid>
                </Grid>
              )}

              <Grid container direction="row" justifyContent="center" alignItems="center">
                {props.role === 'moderator' ? (
                  <>
                    <StateModal open={openModalState} handleOpenClose={handleOpenCloseState} />
                    <Button
                      onClick={handleOpenCloseState}
                      text="Посмотреть статистику по мероприятию"
                      className={classes.eventRegButton}
                    />
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
