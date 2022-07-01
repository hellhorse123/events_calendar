/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
// import { CreateEventMutation, GetUrlToUploadEventPoster } from '../../../Pages/Company/graphql/mutation';
import { ErrorAlert } from '../../UI/CustomErrorAlert/ErrorAlert';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import imgModalDefault from '../../../assets/img/imgModal.svg';
import useStyles from './Styles';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';
import { GET_EVENT_DATA } from './graphql/query';
import { EventTypes } from '../../../Pages/ProfilePage/typings';
import { UpdateEventMutation } from './graphql/mutation';

interface ModalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  eventId: number;
}

const EditEventModal: (props: ModalFrameProps) => JSX.Element = (props: ModalFrameProps) => {
  const { data, loading } = useQuery<{ event: EventTypes }>(GET_EVENT_DATA, {
    variables: { id: Number(props.eventId) },
  });
  const updateEventHandler = UpdateEventMutation();
  // const getUrlToUploadEventPosterHandler = GetUrlToUploadEventPoster();
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [posterValue, setPosterValue] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: '',
    type: '',
    size: 0,
  });
  const [bodyValue, setBodyValue] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [catValue, setCatValue] = useState('');
  const [organizerValue, setOrganizerValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [themeValue, setThemeValue] = useState('');
  const [eventFormatValue, setEventFormatValue] = useState('');
  const [imgModal, setImgModal] = useState(imgModalDefault);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  // useEffect(() => {
  //   if (!loading && data) {
  //     setBodyValue(data?.event.description);
  //     setNameValue(data?.event.name);
  //     setDateValue(data.event.date);
  //     setOrganizerValue(data.event.organizer);
  //     setAddressValue(data.event.address);
  //     setThemeValue(data.event.theme);
  //     setEventFormatValue(data.event.format ? data.event.format : '');
  //     setCatValue(data.event.category ? data.event.category : 'business');
  //     setDescriptionValue(data.event.shortDescription);
  //   }
  // }, [loading]);

  // const onClickHandler: () => Promise<void> = async () => {
  //   if (
  //     nameValue ||
  //     catValue ||
  //     bodyValue ||
  //     descriptionValue ||
  //     dateValue ||
  //     organizerValue ||
  //     addressValue ||
  //     themeValue
  //   ) {
  //     const newEventData = {
  //       name: nameValue,
  //       category: catValue,
  //       description: bodyValue,
  //       shortDescription: descriptionValue,
  //       date: dateValue,
  //       organizer: organizerValue,
  //       address: addressValue,
  //       theme: themeValue,
  //       eventId: props.eventId,
  //       ...(eventFormatValue && { format: eventFormatValue }),
  //     };

  //     await updateEventHandler(newEventData);

  //     if (posterValue.size !== 0) {
  //       const PosterData = {
  //         fileName: posterValue.name,
  //         entityId: props.eventId,
  //         fileType: posterValue.type,
  //       };
  //       const uploadUrl = await getUrlToUploadEventPosterHandler(PosterData);
  //       await fetch(uploadUrl.data!.putEventPoster.signedURL, {
  //         method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  //         credentials: 'include', // include, *same-origin, omit
  //         headers: {
  //           'Content-Type': posterValue.type,
  //         },
  //         //@ts-ignore
  //         body: posterValue, // body data type must match "Content-Type" header
  //       });
  //     }
  //     props.handleOpenClose();
  //     window.location.reload();
  //   } else {
  //     ErrorAlert();
  //   }
  // };

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
        <Grid container direction="column" style={{ gap: 20 }}>
          <Grid item className={classes.modalHeader}>
            Обновление Мероприятия
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Название
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder="Название"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 96,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Краткое описание
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder="Краткое описание"
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Дата
            </Grid>
            <Grid container xs>
              <DateTimePicker onChange={setDateValue} value={dateValue} />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Изменить категорию мероприятия
            </Grid>
            <Grid container xs>
              <Select value={catValue} onChange={handleChangeCategory} fullWidth>
                <MenuItem value={'business'}>Бизнес</MenuItem>
                <MenuItem value={'development'}>Разработка</MenuItem>
                <MenuItem value={'design'}>Дизайн</MenuItem>
                <MenuItem value={'management'}>Управление</MenuItem>
                <MenuItem value={'analytic'}>Аналитика</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Изображение
            </Grid>
            <Grid container xs direction="column" style={{ gap: 15 }}>
              <Grid>Выберете изображение для превью мероприятия (не обязательно)</Grid>
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
                  JPEG или PNG
                  <br />
                  Оптимальный размер - 930x385px
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Описание статьи (Пожалуйста, указывайте все необходимые ссылки только здесь)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={bodyValue}
                value={bodyValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setBodyValue(e.target.value)}
                placeholder="Описание"
                multiline={true}
                color="primary"
                inputProps={{
                  maxLength: 8128,
                }}
              />
            </Grid>
          </Grid>
          {/* <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Прикрепите проект (опционально)
            </Grid>
            <Grid container xs>
              <AutoCompleteSearchFieldForProject
                projectId="100500"
                value={projectIdValue}
                setValue={setProjectIdValue}
              />
            </Grid>
          </Grid> */}

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Организатор мероприятия
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={organizerValue}
                value={organizerValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setOrganizerValue(e.target.value)}
                placeholder="Организатор мероприятия"
                inputProps={{
                  maxLength: 56,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Тема мероприятия
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={themeValue}
                value={themeValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setThemeValue(e.target.value)}
                placeholder="Тема мероприятия"
                inputProps={{
                  maxLength: 62,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Адрес мероприятия
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={addressValue}
                value={addressValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddressValue(e.target.value)}
                placeholder="Адрес мероприятия"
                inputProps={{
                  maxLength: 96,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Формат мероприятия (опционально)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={eventFormatValue}
                value={eventFormatValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEventFormatValue(e.target.value)}
                placeholder="Формат мероприятия"
                inputProps={{
                  maxLength: 36,
                }}
              />
            </Grid>
          </Grid>
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
                  text="Отменить"
                  className={classes.modalButton}
                />
              </Grid>

              <Grid container xs>
                {/* <Button onClick={onClickHandler} text="Обновить" className={classes.modalButton} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default EditEventModal;
