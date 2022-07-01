import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-scroll';

import ArrowButton from '../Buttons/ArrowButton/ArrowButton';

import '../../UI/Styles/CSS/Components/style.css';
import useStyles from './Styles';

interface MyCardProps {
  header: string;
  title1: string;
  number1: string;
  title2: string;
  number2: string;
  link: string;
  avatar: string;
  goTo: () => void;
}

const MyCard: (props: MyCardProps) => JSX.Element = (props: MyCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <div className={classes.portfolioAvatar}>
            <img src={props.avatar} alt="avatar" />
          </div>
        </Typography>
        <Typography className={classes.cardHeader}>{props.header}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid>{props.title1}</Grid>
            <Grid className={classes.num}>
              <div className={props.link === 'Для инвесторов' ? 'unicode' : '1'}>{props.number1}</div>
            </Grid>
          </Grid>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid>{props.title2}</Grid>
            <Grid className={classes.num}>
              <div className={props.link === 'Для инвесторов' ? 'unicode' : '1'}>{props.number2}</div>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link to="partner"> */}
        {/* <Button size="small" className={classes.cardLearn}> */}
        <Grid>
          <ArrowButton onClick={props.goTo} text={props.link} className={classes.colorLink} />
        </Grid>
        {/* </Button> */}
        {/* </Link> */}
      </CardActions>
    </Card>
  );
};

export default MyCard;
