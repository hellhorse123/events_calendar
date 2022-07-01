import { FS72 } from '../../../../../rules/index';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sloganText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: FS72,
    lineHeight: '86px',
    letterSpacing: '-0.045em',
    color: '#252525',
    textTransform: 'uppercase',
    margin: '50px 0',
  },

  projectHeader: {
    color: '#252525',
    fontSize: FS72,
    lineHeight: '86px',
    margin: 'auto',
    wordBreak: 'break-word',
  },

  postPresentationBox: {
    gap: 20,
    borderLeft: '1px solid #AAADB3',
  },
}));

export default useStyles;
