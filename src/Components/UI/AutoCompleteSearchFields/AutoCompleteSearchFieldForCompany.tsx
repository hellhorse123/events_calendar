import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@material-ui/core';

import { useQuery } from '@apollo/client';

import { AutoCompleteSearchFieldPropsType } from './typings';
import { GET_USER_QUERY } from './graphql/query';

// import { userContext, ContextUserTypes, CompaniesTypes } from '../../../Context/context';

export default function AutoCompleteSearchField(props: AutoCompleteSearchFieldPropsType): JSX.Element {
  const [filteredData, setFilteredData] = useState<string[]>(['']);
  const [inputValue, setInputValue] = useState('');

  // const contextUserData = useContext(userContext);
  // useEffect(() => {
  //   const ownerCompanies =
  //     contextUserData &&
  //     contextUserData.user.ownerCompanies.map(company => {
  //       return company.id.toString() + '.' + company.name;
  //     });

  //   setFilteredData(ownerCompanies);
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
          renderInput={(params): JSX.Element => <TextField {...params} label="Ваши компании" />}
        />
      </Grid>
    </Grid>
  );
}
