import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  aboutUsContainer: {
    gap: 100,
    '@media (max-width: 600px)': {
      gap: 60,
    },
  },

  tagline: {
    // marginTop: 200,
    // border: '1px solid black',
    gap: 0,
    '@media (max-width: 960px)': {
      gap: 30,
    },
  },

  taglineTitle: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#252525',
    wordBreak: 'break-word',
  },

  portfolioCards: {
    // marginTop: 200,
  },

  portfolioCard: {
    // marginBottom: 20,
  },
}));

export default useStyles;
