import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  project: {
    // marginBottom: 30,
    // paddingTop: 20,
    border: '1px solid black',
    gap: 60,
  },

  projectImage: {
    // minWidth: 780,
    width: '100%',
    // height: '46%',
    // minHeight: 500,
    backgroundColor: '#AAADB3',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  projectRealImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },

  projectDescription: {
    // paddingLeft: 60,
    // width: 660,
  },

  projectDescriptionHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 400,
  },

  projectDescriptionTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 400,
    marginTop: 20,
  },

  projectDescriptionLinkContainer: {
    // marginTop: 200,
  },

  projectDescriptionLink: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '100%',
    fontWeight: 400,
  },
}));

export default useStyles;
