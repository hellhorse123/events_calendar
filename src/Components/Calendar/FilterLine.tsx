import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';

import MyButton from './Button';
import { useWindowSize } from '../../rules/index';

const StyledAppBar = styled(AppBar)(() => ({
  display: 'grid',
  justifyContent: 'space-between',
  boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%);',
}));

export default function FilterLine(props: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [width] = useWindowSize();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const filters = ['Все', 'local', 'command', 'general'];

  return (
    <Box>
      <StyledAppBar position="static" color="inherit" defaultValue="Все">
        {/* {width > 680 ? ( */}
        <Toolbar
          style={{
            paddingLeft: 0,
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
        </Toolbar>
        {/* ) : (
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
          </Toolbar> */}
        {/* )} */}
      </StyledAppBar>
    </Box>
  );
}
