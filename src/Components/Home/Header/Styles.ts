import { makeStyles } from '@material-ui/core/styles';
import { FS72, FS18 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  sloganImageBox: {
    // backgroundColor: '#AAADB2',
    height: 'clamp(6.25rem, 2.5974rem + 16.2338vw, 21.875rem)',
    // height: 'clamp(30.75rem, -0.875rem + 8.333333vw, 43.75rem)',
    paddingTop: 'clamp(0.625rem, -0.1008rem + 3.2258vw, 3.125rem)',
    backgroundColor: '#fff',
  },

  sloganTextContainer: {
    // marginTop: 50,
  },

  sloganText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: FS72,
    lineHeight: 'clamp(4rem, -0.1250rem + 6.8750vw, 5.375rem)',
    // letterSpacing: '-0.01em',
    color: '#252525',
    textTransform: 'capitalize',
    // marginTop: 'clamp(1.875rem, -0.4688rem + 10.4167vw, 5rem)',
    '@media (max-width: 960px)': {
      lineHeight: '116%',
    },
  },

  sloganTextDesc: {
    marginTop: 'clamp(1.875rem, -1.4063rem + 14.5833vw, 4rem)',
    fontSize: FS18,
    fontWeight: 400,
    lineHeight: '130%',
    color: '#fff',
  },

  colorLink: {
    color: '#252525',
    marginTop: 30,
    fontSize: FS18,
  },

  //   lastNewsAll: {
  //   color: '#fff',
  //   fontSize: 18,
  //   lineHeight: '100%',
  //   textTransform: 'uppercase',
  // },
}));

export default useStyles;
