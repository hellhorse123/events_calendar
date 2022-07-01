import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Login, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Avatar from '@mui/material/Avatar';
import * as Scroll from 'react-scroll';
import { CgCornerRightUp } from 'react-icons/cg';

import AccountMenu from './AccountMenu';

import Line from '../../Line/Line';

import { useWindowSize } from '../../../rules/index';
import useStyles from './Styles';
import { userContext } from '../../../Context/context';
import { API_URL } from '../../../config';

interface NavBarProps {
  text: string;
}

const Navbar: (props: NavBarProps) => JSX.Element = (props: NavBarProps) => {
  const context = useContext(userContext);
  const history = useHistory();

  const scroll = Scroll.animateScroll;

  const exitHandler: () => void = () => {
    context.user = {
      id: 0,
      firstname: 'string',
      lastname: 'string',
      avatar: {
        link: '',
      },
      role: 'string',
    };
    fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' })
      .then()
      .catch(err => console.error(err));
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleProfileClick: () => void = () => {
    history.push(`/profile/${context.user.id}`);
  };

  const handleMessagesClick: () => void = () => {
    history.push('/messages');
  };

  const handleModerateClick: () => void = () => {
    history.push('/moderate');
  };

  const loginHandler: () => void = () => {
    history.push('/login');
  };

  const [width] = useWindowSize();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item className={classes.navbar} style={{ paddingRight: context.user ? 0 : 56 }}>
        <Grid>
          {context.user ? (
            <AccountMenu logOutHandler={exitHandler} />
          ) : (
            <Button onClick={context.user ? exitHandler : loginHandler}>
              {context.user ? (
                <div className={props.text === 'header' ? classes.link : classes.projectLink}>Выйти</div>
              ) : (
                <div className={props.text === 'header' ? classes.link : classes.projectLink}>Войти</div>
              )}
            </Button>
          )}
        </Grid>
      </Grid>
      {props.text === 'footer' ? (
        <Grid container xs={10} style={{ margin: 'auto' }}>
          <Line marginTop={40} marginBottom={40} />
        </Grid>
      ) : null}
    </>
  );
};

export default Navbar;
