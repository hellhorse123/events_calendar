import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useHistory } from 'react-router-dom';

import { userContext } from '../../../Context/context';

import defaultAvatar from '../../../assets/img/Avatar.svg';

export default function AccountMenu(props: { logOutHandler: () => void }): JSX.Element {
  const history = useHistory();
  const { user } = useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const context = useContext(userContext);

  const handleClick: (event: React.MouseEvent<HTMLElement>) => void = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick: () => void = () => {
    history.push(`/profile/${context.user.id}`);
  };

  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  console.log(context);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingRight: 5 }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{
                width: 'clamp(1.5rem, 0.3360rem + 5.1733vw, 3.44rem)',
                height: 'clamp(1.5rem, 0.3360rem + 5.1733vw, 3.44rem)',
              }}
              src={user?.avatar?.link ? user?.avatar?.link : defaultAvatar}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Профиль
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={(): void => history.push('/messages')}>
          <ListItemIcon>
            <MessageIcon fontSize="small" />
          </ListItemIcon>
          Сообщения
        </MenuItem> */}
        <MenuItem onClick={props.logOutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
