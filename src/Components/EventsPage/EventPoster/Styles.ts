import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  event: {
    gap: 20,
  },

  eventImage: {
    // minWidth: 780,
    // width: '100%',
    // height: '46%',
    // minHeight: 500,
    backgroundColor: 'rgba(0,0,0,0.03)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  eventDescription: {
    // paddingLeft: 60,
    // width: 660,
    wordBreak: 'break-word',
  },

  eventDescriptionHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  eventDescriptionTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 400,
    margin: '18px 0',
    textTransform: 'none',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS18,
    lineHeight: '100%',
    fontWeight: 400,
  },

  eventInfoTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 400,
    gap: 30,
  },

  eventInfoText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    // maxWidth: 300,
  },

  eventDescriptionLinkContainer: {
    // marginTop: 200,
  },

  eventDescriptionLink: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '100%',
    fontWeight: 400,
  },

  colorLink: {
    color: '#252525',
    fontWeight: 500,
  },

  newsDescriptionDate: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
    marginTop: 10,
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
    border: '1px solid',
  },
}));

export default useStyles;
