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
import '../UI/Styles/CSS/Components/style.css';

const StyledAppBar = styled(AppBar)(() => ({
  display: 'grid',
  justifyContent: 'flex-start',
  boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%);',
}));

export default function NavigationLine(props: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  page: string;
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

  const filters = props.page === 'Профиль' ? ['Мои мероприятия', 'Планирую пойти', 'Архив'] : ['Проекты', 'Контакты'];

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <StyledAppBar position="static" color="inherit" defaultValue="Все">
        {width < 600 ? (
          <Grid container justifyContent="flex-start" style={{ gap: 20 }} className="scrolling-wrapper">
            <div style={{ display: 'flex', flexDirection: 'row' }} className="card">
              {filters.map(filter => (
                <MyButton
                  key={filter}
                  value={filter}
                  selectedFilter={props.selectedCategory}
                  setSelectedFilter={props.setSelectedCategory}
                />
              ))}
            </div>
          </Grid>
        ) : width < 959 && width > 599 && props.page === 'Профиль' ? (
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
        ) : (
          <Grid container justifyContent="flex-start" style={{ gap: 20 }}>
            {filters.map(filter => (
              <MyButton
                key={filter}
                value={filter}
                selectedFilter={props.selectedCategory}
                setSelectedFilter={props.setSelectedCategory}
              />
            ))}
          </Grid>
        )}
      </StyledAppBar>
    </Box>
  );
}
