import { makeStyles } from '@material-ui/core/styles';
import { FS72 } from '../../rules/index';

const useStyles = makeStyles(() => ({
  sloganText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: FS72,
    lineHeight: '86px',
    letterSpacing: '-0.045em',
    color: '#252525',
    textTransform: 'uppercase',
  },
}));

export default useStyles;
