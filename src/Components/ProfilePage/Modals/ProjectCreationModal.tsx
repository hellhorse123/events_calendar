import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Button from '../../UI/Buttons/OutlinedButton/Button';
import { ErrorAlert } from '../../UI/CustomErrorAlert/ErrorAlert';
import AutoCompleteSearchFieldForCompany from '../../UI/AutoCompleteSearchFields/AutoCompleteSearchFieldForCompany';
import NoneClick from '../../UI/NoneClickableField/NoneClick';

import { CREATE_PROJECT_MUTATION } from '../graphql/mutations';

import { GET_COMPANIES_QUERY } from '../graphql/query';
import { CompaniesDataQueryTypes } from '../graphql/typing';

import { useQuery } from '@apollo/client';

import useStyles from './Styles';

interface MoodalFrameProps {
  open: boolean;
  handleOpenClose: () => void;
  ownerId: number;
  companiesOwner: {
    id: number;
    name: string;
  }[];
}

const ProjectCreationModal: (props: MoodalFrameProps) => JSX.Element = (props: MoodalFrameProps) => {
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [activityTypeValue, setActivityTypeValue] = useState('');
  const [posterValue, setPosterValue] = useState('');
  const [companyIdValue, setCompanyIdValue] = useState<string | null>('');

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const { data: companyData } = useQuery<CompaniesDataQueryTypes>(GET_COMPANIES_QUERY);

  const [createProjectHandler] = useMutation(CREATE_PROJECT_MUTATION);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setActivityTypeValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (nameValue && descriptionValue && shortDescriptionValue && activityTypeValue && companyIdValue) {
      setOpenNoneClick(true);
      const newCompanyData = {
        name: nameValue,
        description: descriptionValue,
        shortDescription: shortDescriptionValue,
        category: activityTypeValue,
        ownerCompany: Number(companyData?.companies.filter(company => company.name === companyIdValue)[0].id),
      };
      await createProjectHandler({
        variables: {
          data: newCompanyData,
        },
      })
        .then(() => {
          props.handleOpenClose();
        })
        .catch(err => {
          console.error(err);
        });
      window.location.reload();
      setOpenNoneClick(false);
    } else {
      ErrorAlert();
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Modal open={props.open} onClose={props.handleOpenClose}>
        <Grid container direction="column" style={{ gap: 20, position: 'relative' }}>
          {openNoneClick ? <NoneClick /> : null}
          <Grid item className={classes.modalHeader}>
            Создание проекта
          </Grid>
          <Grid
            style={{
              paddingBottom: 20,
            }}
          >
            (Вы сможете отредактировать эти данные позже внутри проекта)
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Прикрепите компанию (обязательно)
            </Grid>
            <Grid container xs>
              <AutoCompleteSearchFieldForCompany
                projectId="100500"
                value={companyIdValue}
                setValue={setCompanyIdValue}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Название проекта
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder="Название проекта"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Описание проекта
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                multiline={true}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder="Описание"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Краткое описание (будет отображаться в карточке проекта)
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={shortDescriptionValue}
                value={shortDescriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
                placeholder="Краткое описание"
                inputProps={{
                  maxLength: 128,
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ gap: 60 }}>
            <Grid container xs={3}>
              Сфера проекта
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
                <Button onClick={onClickHandler} text="Создать проект" className={classes.modalButton} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ProjectCreationModal;
