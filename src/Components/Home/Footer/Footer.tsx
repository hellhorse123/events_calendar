import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { FiArrowUpRight } from 'react-icons/fi';
import { useWindowSize } from '../../../rules/index';

import NavBar from '../../UI/NavBar/NavBar';
import useStyles from './Styles';

const Footer: () => JSX.Element = () => {
  const classes = useStyles();
  const [width] = useWindowSize();

  return (
    <Grid container className={classes.footerWrapper}>
      <Grid container justifyContent="center" xs={12} className={classes.footerBox}>
        <Grid xs={12} container alignItems="center" className={classes.footerContainer}>
          {width < 900 ? null : (
            <Grid xs={12} container className={classes.footerNavBar}>
              <NavBar text="footer" />
            </Grid>
          )}
          {width < 900 ? (
            <Grid
              xs={10}
              container
              direction="column"
              // justifyContent="space-between"
              alignItems="center"
              className={classes.footerInfo}
            >
              <Grid
                container
                xs={12}
                direction="column"
                justifyContent="space-between"
                style={{
                  gap: 60,
                }}
              >
                <Grid
                  container
                  xs={6}
                  direction="column"
                  justifyContent="flex-start"
                  className={classes.footerContactsContainer}
                >
                  <Link className={classes.linkNameFooter} to="/home">
                    Oggetto
                  </Link>
                  <Grid className={classes.footerHeaderTextContacts}>
                    ДГТУ, УЛК №7, ауд. 100/101, пр. Михаила Нагибина, 3а, Ростов-на-Дону, 344010
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={6}
                  direction="column"
                  justifyContent="flex-start"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderContacts}>Контакты</Grid>
                  <Grid container className={classes.footerTitleTextContacts}>
                    <Grid>info@magicamedia.com</Grid>
                    <Grid>+7 918 539 99 10</Grid>
                  </Grid>
                </Grid>

                {/* <Grid
                  container
                  xs
                  direction="column"
                  justifyContent="space-between"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderContacts}>Документы</Grid>
                  <Grid className={classes.footerTitleTextContacts}>Политика конфиденциальности.PDF</Grid>
                </Grid> */}
              </Grid>
            </Grid>
          ) : (
            <Grid
              xs={10}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.footerInfo}
            >
              <Grid
                container
                xs={12}
                direction="row"
                justifyContent="space-between"
                style={{
                  gap: 40,
                }}
              >
                <Grid
                  container
                  xs
                  direction="column"
                  justifyContent="flex-start"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderTextContacts}>
                    ДГТУ, УЛК №7, ауд. 100/101, пр. Михаила Нагибина, 3а, Ростов-на-Дону, 344010
                  </Grid>
                  {/* <Grid
                  container
                  alignItems="center"
                  style={{ fontWeight: 500 }}
                  className={classes.footerTitleTextContacts}
                >
                  Telegram-канал
                  <FiArrowUpRight />
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  style={{ fontWeight: 500 }}
                  className={classes.footerTitleTextContacts}
                >
                  Instagram
                  <FiArrowUpRight />
                </Grid> */}
                </Grid>

                <Grid
                  container
                  xs
                  direction="column"
                  justifyContent="flex-start"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderContacts}>Контакты</Grid>
                  <Grid container className={classes.footerTitleTextContacts}>
                    <Grid>info@magicamedia.com</Grid>
                    <Grid>+7 918 539 99 10</Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs
                  direction="column"
                  justifyContent="flex-start"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderContacts}>Документы</Grid>
                  <Grid className={classes.footerTitleTextContacts}>Политика конфиденциальности.PDF</Grid>
                  {/* <Grid className={classes.footerTitleTextContacts}>Пользовательское соглашение.PDF</Grid> */}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
