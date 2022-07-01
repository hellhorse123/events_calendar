import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  partner: {
    // border: '1px solid black',
    // width:350,
    // height: 200,
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
    // margin:'1%'
    backgroundColor: '#fff',
    border: '4px solid',
  },

  partnerImg: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    maxHeight: '180px',
  },
}));

export default useStyles;
