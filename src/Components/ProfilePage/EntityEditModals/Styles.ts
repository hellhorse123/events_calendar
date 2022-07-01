import { styled as styledMUI } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  partners: {
    // marginTop: 150,
  },

  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
  },

  fullModalHeader: {
    color: '#252525',
    fontSize: 48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    // paddingBottom: 40,
  },

  fullModalDate: {
    color: '#AAADB2',
    fontSize: 16,
    lineHeight: '125%',
    fontWeight: 300,
    marginBottom: 40,
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    marginBottom: 20,
  },

  articleImage: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  imgConditionText: {
    color: '#AAADB2',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 300,
  },

  additionalPartnerStyle: {
    color: 'black',
    backgroundColor: '#fff',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
    border: '1px solid',
  },
}));

export default useStyles;
