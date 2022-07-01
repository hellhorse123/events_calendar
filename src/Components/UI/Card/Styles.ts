import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  portfolioCards: {
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 200,
  },

  rootCard: {
    padding: 14,
    backgroundColor: '#252525',
    height: '100%',
    display: 'grid',
  },

  portfolioAvatar: {
    // width: 100,
    // height: 100,
    // backgroundColor: '#AAADB2',
    // marginBottom: 50,
    // border:'1px solid #fff'
  },

  cardHeader: {
    color: '#fff',
    fontSize: 24,
    lineHeight: '120%',
    marginBottom: 16,
    textTransform: 'uppercase',
  },

  title: {
    fontSize: 14,
  },

  pos: {
    marginBottom: 12,
    color: '#fff',
    fontSize: 18,
    lineHeight: '130%',
    // border: '1px solid #fff'
  },

  num: {
    marginRight: '20%',
  },

  cardLearn: {
    textTransform: 'uppercase',
    fontSize: 18,
    lineHeight: '100%',
    color: '#fff',
  },

  colorLink: {
    color: '#fff',
  },
}));

export default useStyles;
