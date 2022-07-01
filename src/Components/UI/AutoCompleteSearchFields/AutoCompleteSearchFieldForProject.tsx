import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';

import { AutoCompleteSearchFieldPropsType } from './typings';
// import { userContext, ProjectType, CompaniesTypes } from '../../../Context/context';

export default function AutoCompleteSearchField(props: AutoCompleteSearchFieldPropsType): JSX.Element {
  const [filteredData, setFilteredData] = React.useState<string[]>(['']);
  const [inputValue, setInputValue] = React.useState('');
  const [role, setRole] = useState('');

  // const contextUserData = useContext(userContext);
  // useEffect(() => {
  //   const ownerProjects =
  //     contextUserData &&
  //     contextUserData.user.ownerCompanies.reduce((acc: string[], company) => {
  //       if (company) {
  //         company.projects.map(project => {
  //           acc.push(project.id.toString() + '.' + project.name);
  //         });
  //       }
  //       return acc;
  //     }, []);

  //   setFilteredData(ownerProjects);
  // }, []);

  return (
    <Grid container xs direction="row" justifyContent="space-between" style={{ gap: 20 }}>
      <Grid container xs={12}>
        <Autocomplete
          value={props.value?.split('.')[1]}
          onChange={(event, newValue: string | null): void => {
            // event.preventDefault();
            props.setValue(filteredData.filter(data => data.split('.')[1] === newValue)[0].split('.')[1]);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue): void => {
            // event.preventDefault();
            setInputValue(filteredData.filter(data => data.split('.')[1] === newInputValue)[0].split('.')[1]);
          }}
          id="controllable-states-demo"
          options={filteredData && filteredData.map(data => data.split('.')[1])}
          sx={{ width: '100%' }}
          renderInput={(params): JSX.Element => <TextField {...params} label="Ваши проекты" />}
        />
      </Grid>
      {/* {inputValue ? (
        <Grid container xs={12} direction="row" justifyContent="space-between" style={{ gap: 20 }}>
          <Grid container xs>
            <TextField
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setRole(e.target.value);
              }}
              id="outlined-basic"
              label="Позиция в проекте"
              variant="outlined"
              inputProps={{
                maxLength: 64,
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Добавить проект
          </Button>
        </Grid>
      ) : null} */}
    </Grid>
  );
}
