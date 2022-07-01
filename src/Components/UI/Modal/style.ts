import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS48 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  // Fullscreen modal event

  eventHeader: {
    color: '#fff',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    wordBreak: 'break-word',
  },

  eventHeaderDate: {
    color: '#fff',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    wordBreak: 'break-word',
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    wordBreak: 'break-word',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS18,
    lineHeight: '100%',
    fontWeight: 500,
  },

  modalArticleHeader: {
    textTransform: 'uppercase',
    fontSize: FS18,
    color: '#252525',
    fontWeight: 500,
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

  eventRegButton: {
    width: '100%',
    padding: '21px 52px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
}));

export default useStyles;
