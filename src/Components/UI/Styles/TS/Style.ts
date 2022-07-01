import { Grid } from '@material-ui/core';
import { styled as styledMUI } from '@mui/material/styles';

export const ModalImageContainer = styledMUI(Grid)(({ isDefault }: { isDefault: boolean }) => ({
  border: '1px solid #AAADB3',
  minWidth: 150,
  maxWidth: 230,
  minHeight: 90,
  height: 120,
  cursor: 'pointer',
}));

export const ModalImage = styledMUI('img')(({ isDefault }: { isDefault: boolean }) => ({
  height: isDefault ? 56 : '',
  width: isDefault ? 56 : '',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
}));
