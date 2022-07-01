/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';

import MyButton from './Button';
import { useWindowSize } from '../../rules/index';

const StyledAppBar = styled(AppBar)(() => ({
  display: 'grid',
  justifyContent: 'flex-start',
  boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%);',
}));

export default function FilterLine(props: { selectedCategory: string; setSelectedCategory: any }): JSX.Element {
  const [width] = useWindowSize();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const filters = ['Все', 'business', 'development', 'design', 'management', 'analytic'];

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <StyledAppBar position="static" color="inherit" defaultValue="Все">
        {width > 959 ? (
          <Grid container>
            {filters.map(filter => (
              <MyButton
                key={filter}
                value={filter}
                selectedFilter={props.selectedCategory}
                setSelectedFilter={props.setSelectedCategory}
              />
            ))}
          </Grid>
        ) : (
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {filters.map(filter => (
                <MyButton
                  key={filter}
                  value={filter}
                  selectedFilter={props.selectedCategory}
                  setSelectedFilter={props.setSelectedCategory}
                />
              ))}
            </Menu>
          </Toolbar>
        )}
      </StyledAppBar>
    </Box>
  );
}
