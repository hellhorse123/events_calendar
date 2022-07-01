import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
  },

  imgConditionText: {
    color: '#AAADB2',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 300,
  },

  modalDefaultImgContainer: {
    border: '1px solid #AAADB3',
    paddingTop: '25px',
    paddingBottom: '25px',
    cursor: 'pointer',
  },

  modalDefaultImg: {
    height: 56,
    width: 56,
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
  },
}));

export default useStyles;
