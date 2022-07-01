import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import OutlinedInput from '@mui/material/OutlinedInput';

import AddIcon from '@mui/icons-material/Add';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import imgModal from '../../assets/img/imgModal.svg';

import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';

import { useWindowSize } from '../../../rules/index';

import { CREATE_ONE_COMPANY_MUTATION } from './mutations';
import useStyles from './Styles';

interface MoodalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
}

const ModalFrame: (props: MoodalFrameProps) => JSX.Element = (props: MoodalFrameProps) => {
  const [avatarValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [activityTypeValue, setActivityTypeValue] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const [createCompanyHandler] = useMutation(CREATE_ONE_COMPANY_MUTATION);
  const classes = useStyles();
  const [width] = useWindowSize();

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setActivityTypeValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    setOpenNoneClick(true);
    const newCompanyData = {
      name: nameValue,
      description: descriptionValue,
      shortDescription: shortDescriptionValue,
      activityKind: activityTypeValue,
    };
    await createCompanyHandler({
      variables: {
        data: newCompanyData,
      },
    })
      .then()
      .catch(err => {
        console.error(err);
      });
    window.location.reload();
    setOpenNoneClick(false);
  };

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            Создание компании
          </Grid>
          <Grid
            style={{
              paddingBottom: 20,
            }}
          >
            (Вы сможете отредактировать эти данные позже внутри компании)
          </Grid>
          <Grid container direction="row" style={{ gap: width > 600 ? 60 : 10, marginBottom: width > 600 ? 0 : 20 }}>
            <Grid container sm={3} xs={12}>
              Название компании
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder="Название компании"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: width > 600 ? 60 : 10, marginBottom: width > 600 ? 0 : 20 }}>
            <Grid container sm={3} xs={12}>
              Краткое описание (будет отображаться в карточке компании)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={shortDescriptionValue}
                value={shortDescriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
                placeholder="Краткое описание"
                inputProps={{
                  maxLength: 78,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: width > 600 ? 60 : 10, marginBottom: width > 600 ? 0 : 20 }}>
            <Grid container sm={3} xs={12}>
              Описание компании
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                multiline={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder="Описание"
                inputProps={{
                  maxLength: 2048,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: width > 600 ? 60 : 10, marginBottom: width > 600 ? 0 : 20 }}>
            <Grid container sm={3} xs={12}>
              Тип предоставляемых услуг
            </Grid>
            <Grid container xs>
              <Select value={activityTypeValue} onChange={handleChangeCategory} fullWidth>
                <MenuItem value={'business'}>Бизнес</MenuItem>
                <MenuItem value={'development'}>Разработка</MenuItem>
                <MenuItem value={'design'}>Дизайн</MenuItem>
                <MenuItem value={'management'}>Управление</MenuItem>
                <MenuItem value={'analytic'}>Аналитика</MenuItem>
              </Select>
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
                <Button onClick={onClickHandler} text="Создать компанию" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ModalFrame;
