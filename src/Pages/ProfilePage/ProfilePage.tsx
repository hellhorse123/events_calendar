/* eslint-disable @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import ShowMoreText from 'react-show-more-text';

import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import style from '../../Pages/SingleProjectPage/markdown-styles.module.css';

import { useWindowSize } from '../../rules/index';

import NoneClick from '../../Components/UI/NoneClickableField/NoneClick';
import NavBar from '../../Components/UI/NavBar/NavBar';
import Loading from '../../Components/UI/Loading/Loading';

import SkeletonEvents from '../../Components/UI/SkeletonBlocks/SkeletonEvents/SkeletonEvents';

import Header from '../../Components/Home/Header/Header';
import Line from '../../Components/Line/Line';
import ModalFrame from '../../Components/ProfilePage/CompanyCreation/ModalFrame';
import MyButton from '../../Components/UI/Buttons/OutlinedButton/Button';

import CreateEventModal from '../../Components/ProfilePage/Modals/CreateEventModal';
import EditEventModal from '../../Components/ProfilePage/EntityEditModals/EventEditModal';

import ProfileEvent from '../../Components/ProfilePage/ProfileEvent/ProfileEvent';

import { useHistory } from 'react-router-dom';

import { userContext } from '../../Context/context';
import { MatchProps, UserDataTypes, ProjectTypes, PostTypes, EventTypes, SwitchToChatTypes } from './typings';
import { UpdateUserDataMutation, UploadImageMutation, SwitchToChat } from './graphql/mutations';
import { GET_USER_QUERY, GET_ROLE_QUERY, GET_EVENT_STATISTIC_QUERY } from '../../Queries';

import NavigationLine from '../../Components/ProfilePage/NavigationLine';

import back from '../../assets/icons/back.svg';

import './style.css';
import useStyles from './Style';

const ProfilePage: (props: MatchProps) => JSX.Element = (props: MatchProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 959px)' });
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();
  const userId = props.match.params.profileId;
  const { data, loading, refetch } = useQuery<{ getUser: UserDataTypes }>(GET_USER_QUERY, {
    variables: { data: { userId: Number(userId) } },
  });
  const { data: stateData } = useQuery<{ getUser: UserDataTypes }>(GET_EVENT_STATISTIC_QUERY);
  const UpdateUserInfoHandler = UpdateUserDataMutation();
  const uploadImageHandler = UploadImageMutation();
  const switchToChatHandler = SwitchToChat();
  const contextUserData = useContext(userContext);
  const userData: UserDataTypes | undefined = data && data.getUser;

  const [fioEdit, setFioEdit] = useState(true);

  const [firstNameField, setFirstNameField] = useState(userData && userData.firstname);
  const [lastNameField, setLastNameField] = useState(userData && userData.lastname);
  const [workField, setWorkField] = useState(userData && userData.work);

  const [phoneField, setPhoneField] = useState(userData && userData.phone);
  const [emailField, setEmailField] = useState(userData && userData.email);
  const [telegramField, setTelegramField] = useState(userData && userData.telegrammLink);

  const [width] = useWindowSize();
  const secondDefaultBlockHeight = width / 5.5;

  const firstDefaultBlockWidth = width / 3.9;
  const secondDefaultBlockWidth = width / 2.5;
  const thirdDefaultBlockWidth = width / 2.6;

  const [openModal, setOpenModal] = React.useState(false);
  const [openModalOffer, setOpenModalOffer] = useState(false);
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedSection, setSelectedSection] = useState('Мои мероприятия');

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const classes = useStyles();

  const handleOpenClose: () => void = () => {
    setOpenModal(!openModal);
  };

  const handleOpenClosePostModal: () => void = () => {
    setOpenModalOffer(!openModalOffer);
  };

  const handleOpenCloseEvent: () => void = () => {
    setOpenModalEvent(!openModalEvent);
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick: () => void = () => {
    hiddenFileInput?.current!.click();
  };
  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOpenNoneClick(true);
    const fileUploaded = event.target.files![0];
    const userImageData = {
      entityId: Number(userId),
      fileName: fileUploaded.name,
      fileType: fileUploaded.type,
    };
    try {
      const uploadUrl = (await uploadImageHandler(userImageData)).data;
      await fetch(uploadUrl!.putUserAvatar.signedURL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: fileUploaded, // body data type must match "Content-Type" header
      });
      await refetch();
      setOpenNoneClick(false);
    } catch (e) {
      console.error('FILE_UPLOAD_ERROR', e);
    }
  };

  const editBioHandler: () => void = async () => {
    if (fioEdit) {
      setFioEdit(false);
    } else {
      const newData = {
        firstname: firstNameField,
        lastname: lastNameField,
        work: workField,
        phone: phoneField,
        email: emailField,
        telegrammLink: telegramField,
      };
      try {
        await UpdateUserInfoHandler(newData)
          .then(async res => {
            if (!res.errors) {
              await refetch();
            } else {
              // handle errors with status code 200
            }
          })
          .catch(error => {
            alert(error);
          });
      } catch (e) {
        alert(e);
      }
      setFioEdit(true);
    }
  };

  const onHomeHandler: () => void = () => {
    history.push('/home');
  };

  const messageButtonHandler: () => Promise<void> = async () => {
    const res: SwitchToChatTypes = await switchToChatHandler({
      senderId: contextUserData && Number(contextUserData.user.id),
      recipientId: Number(userId),
    });
    history.push(`/messages/${res?.data!.switchToMessager.id}`);
  };
  const [hover, setHover] = useState(false);

  console.log(data?.getUser.myevent, userData);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container xs={12} style={{ position: 'relative' }}>
      {openNoneClick ? <NoneClick /> : null}
      <Header />

      <ModalFrame ownerId={Number(userId)} open={openModal} handleOpenClose={handleOpenClose} />

      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }}>
        <Grid container xs={12} direction="row" justifyContent="space-between">
          <Grid container justifyContent="flex-start" style={{ marginBottom: 60 }}>
            <Grid
              item
              container
              alignItems="center"
              style={{
                fontWeight: '500',
                fontSize: 27,
                lineHeight: '130%',
                cursor: 'pointer',
              }}
              onClick={onHomeHandler}
            >
              <img src={back} />
              <Grid item>На главную</Grid>
            </Grid>
          </Grid>
          {isTabletOrMobile ? (
            <Grid item container xs direction="column" alignItems="center" style={{ gap: 30 }}>
              <Grid
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ border: '0px solid', gap: 60 }}
              >
                {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <div className="hover-effect-cover">
                    <Avatar
                      alt="user"
                      sx={{
                        width: secondDefaultBlockHeight,
                        height: secondDefaultBlockHeight,
                        maxWidth: 160,
                        maxHeight: 160,
                      }}
                      src={data && data.getUser?.avatar?.link}
                    />
                    <div className="effect-to-top">
                      <Grid container direction="column" alignItems="center" className="link" onClick={handleClick}>
                        <Grid item>
                          <DownloadIcon
                            sx={{ fontSize: width > 900 ? 'clamp(1.125rem, 0.7500rem + 0.7500vw, 1.5rem)' : 24 }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                  </div>
                ) : (
                  <Avatar
                    alt="user"
                    sx={{
                      width: secondDefaultBlockHeight,
                      height: secondDefaultBlockHeight,
                      maxWidth: 160,
                      maxHeight: 160,
                    }}
                    src={data && data.getUser?.avatar?.link}
                  />
                )}
              </Grid>
              <Grid item container xs direction="column" justifyContent="space-around">
                <Grid item container direction="column" style={{ gap: 10, textAlign: 'center' }}>
                  {fioEdit ? (
                    <>
                      {loading ? (
                        <Skeleton animation="wave" height={35} width="40%" style={{ margin: 'auto' }} />
                      ) : (
                        <Grid item className={classes.fullName}>
                          {data && data.getUser.firstname} &nbsp;
                          {userData && userData.lastname}
                        </Grid>
                      )}
                    </>
                  ) : (
                    <Grid item container direction="row" style={{ gap: 0 }}>
                      <Grid container xs>
                        <OutlinedInput
                          defaultValue={userData?.firstname}
                          value={firstNameField}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstNameField(e.target.value)}
                          disabled={fioEdit}
                          placeholder="Имя"
                          color="primary"
                          inputProps={{
                            maxLength: 128,
                          }}
                        />
                      </Grid>
                      <Grid container xs>
                        <OutlinedInput
                          defaultValue={userData?.lastname}
                          value={lastNameField}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastNameField(e.target.value)}
                          placeholder="Фамилия"
                          color="primary"
                          disabled={fioEdit}
                          inputProps={{
                            maxLength: 128,
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid item>
                    {fioEdit ? (
                      <>
                        {loading ? (
                          <>
                            <Skeleton animation="wave" height={25} width="60%" style={{ margin: 'auto' }} />
                          </>
                        ) : (
                          <Grid container direction="column" style={{ gap: 30 }}>
                            <Grid item className={classes.shortDescText}>
                              {userData && userData.work}
                            </Grid>
                          </Grid>
                        )}
                      </>
                    ) : (
                      <Grid item container direction="column" style={{ gap: 30 }}>
                        <Grid container xs>
                          <OutlinedInput
                            defaultValue={userData?.work}
                            value={workField}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWorkField(e.target.value)}
                            placeholder="Специализация"
                            color="primary"
                            disabled={fioEdit}
                            inputProps={{
                              maxLength: 64,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column" style={{ gap: 20 }}>
                {fioEdit ? (
                  <>
                    {loading ? (
                      <>
                        <Skeleton animation="wave" height={15} width="90%" />
                        <Skeleton animation="wave" height={15} width="70%" />
                        <Skeleton animation="wave" height={15} width="90%" />
                        <Skeleton animation="wave" height={15} width="70%" />
                      </>
                    ) : userData?.phone || userData?.email || userData?.telegrammLink ? (
                      <Grid container style={{ gap: 12 }}>
                        <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                          {userData && userData.phone}
                        </Grid>
                        <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                          {userData && userData.email}
                        </Grid>
                        <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                          {userData && userData.telegrammLink}
                        </Grid>
                      </Grid>
                    ) : contextUserData.user && contextUserData.user.id === Number(userId) ? (
                      <div>
                        <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                          Вы можете заполнить свою биографию, кликнув по кнопке &quot;Редактировать&quot;
                        </Grid>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Grid container xs>
                      <OutlinedInput
                        fullWidth={true}
                        defaultValue={userData && userData.phone}
                        value={phoneField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPhoneField(e.target.value)}
                        disabled={fioEdit}
                        placeholder="Телефон"
                        color="primary"
                        multiline={true}
                        inputProps={{
                          maxLength: 20,
                        }}
                      />
                    </Grid>
                    <Grid container xs>
                      <OutlinedInput
                        fullWidth={true}
                        defaultValue={userData && userData.email}
                        value={emailField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailField(e.target.value)}
                        disabled={fioEdit}
                        placeholder="Почта"
                        color="primary"
                        inputProps={{
                          maxLength: 30,
                        }}
                      />
                    </Grid>
                    <Grid container xs>
                      <OutlinedInput
                        fullWidth={true}
                        defaultValue={userData && userData.telegrammLink}
                        value={telegramField}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTelegramField(e.target.value)}
                        disabled={fioEdit}
                        placeholder="Telegram"
                        color="primary"
                        inputProps={{
                          maxLength: 20,
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                <Grid container>
                  <MyButton
                    onClick={editBioHandler}
                    isWhite={fioEdit ? true : false}
                    isEdit={fioEdit ? true : false}
                    text={fioEdit ? 'Редактировать' : 'Сохранить'}
                    className={classes.editButton}
                  />
                </Grid>
              ) : null}
            </Grid>
          ) : (
            <Grid item container xs direction="row" style={{ gap: 60 }}>
              <Grid item container xs direction="row" style={{ gap: 60 }}>
                <Grid
                  item
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ border: '0px solid', gap: 60 }}
                >
                  {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                    <div className="hover-effect-cover">
                      <Avatar
                        alt="user"
                        sx={{
                          width: secondDefaultBlockHeight,
                          height: secondDefaultBlockHeight,
                          maxWidth: 150,
                          maxHeight: 150,
                        }}
                        src={data && data.getUser?.avatar?.link}
                      />
                      <div className="effect-to-top">
                        <Grid container direction="column" alignItems="center" className="link" onClick={handleClick}>
                          <Grid item>
                            <DownloadIcon
                              sx={{ fontSize: width > 900 ? 'clamp(1.125rem, 0.7500rem + 0.7500vw, 1.5rem)' : 24 }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                    </div>
                  ) : (
                    <Avatar
                      alt="user"
                      sx={{
                        width: secondDefaultBlockHeight,
                        height: secondDefaultBlockHeight,
                        maxWidth: 150,
                        maxHeight: 150,
                      }}
                      src={data && data.getUser?.avatar?.link}
                    />
                  )}
                </Grid>
                <Grid item container xs direction="column" justifyContent="space-around">
                  <Grid item container direction="column" style={{ gap: 10 }}>
                    {fioEdit ? (
                      <>
                        {loading ? (
                          <Skeleton animation="wave" height={35} width="40%" />
                        ) : (
                          <Grid item className={classes.fullName}>
                            {userData && userData.firstname} &nbsp;
                            {userData && userData.lastname}
                          </Grid>
                        )}
                      </>
                    ) : (
                      <Grid item container direction="row" style={{ gap: 0 }}>
                        <Grid container xs>
                          <OutlinedInput
                            defaultValue={userData?.firstname}
                            value={firstNameField}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                              setFirstNameField(e.target.value)
                            }
                            disabled={fioEdit}
                            placeholder="Имя"
                            color="primary"
                            inputProps={{
                              maxLength: 128,
                            }}
                          />
                        </Grid>
                        <Grid container xs>
                          <OutlinedInput
                            defaultValue={userData?.lastname}
                            value={lastNameField}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                              setLastNameField(e.target.value)
                            }
                            placeholder="Фамилия"
                            color="primary"
                            disabled={fioEdit}
                            inputProps={{
                              maxLength: 128,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid item>
                      {fioEdit ? (
                        <>
                          {loading ? (
                            <>
                              <Skeleton animation="wave" height={25} width="60%" />
                            </>
                          ) : (
                            <Grid container direction="column" style={{ gap: 30 }}>
                              <Grid item className={classes.shortDescText}>
                                {userData && userData.work}
                              </Grid>
                            </Grid>
                          )}
                        </>
                      ) : (
                        <Grid item container direction="column" style={{ gap: 30 }}>
                          <Grid container xs>
                            <OutlinedInput
                              defaultValue={userData?.work}
                              value={workField}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWorkField(e.target.value)}
                              placeholder="Специализация"
                              color="primary"
                              disabled={fioEdit}
                              inputProps={{
                                maxLength: 64,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                <Grid>
                  <MyButton
                    onClick={editBioHandler}
                    isWhite={fioEdit ? true : false}
                    isEdit={fioEdit ? true : false}
                    text={fioEdit ? 'Редактировать' : 'Сохранить'}
                    className={classes.editButton}
                  />
                </Grid>
              ) : null}
            </Grid>
          )}
        </Grid>
        <Line marginTop={40} marginBottom={40} display={isTabletOrMobile ? 'none' : 'block'} />

        {isTabletOrMobile ? null : (
          <Grid container direction="column" style={{ gap: 20, marginBottom: 60 }}>
            <Grid container className={classes.profileHeaders}>
              Контакты
            </Grid>
            {fioEdit ? (
              <>
                {loading ? (
                  <>
                    <Skeleton animation="wave" height={15} width="70%" />
                    <Skeleton animation="wave" height={15} width="70%" />
                    <Skeleton animation="wave" height={15} width="70%" />
                  </>
                ) : userData?.phone || userData?.email || userData?.telegrammLink ? (
                  <Grid container style={{ gap: 12 }}>
                    <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                      {userData && userData.phone}
                    </Grid>
                    <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                      {userData && userData.email}
                    </Grid>
                    <Grid container className={classes.bio} style={{ border: '0px solid' }}>
                      {userData && userData.telegrammLink}
                    </Grid>
                  </Grid>
                ) : contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <div>
                    <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                      Вы можете заполнить свои контакты, кликнув по кнопке &quot;Редактировать&quot;
                    </Grid>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <Grid container xs>
                  <OutlinedInput
                    fullWidth={true}
                    defaultValue={userData && userData.phone}
                    value={phoneField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPhoneField(e.target.value)}
                    disabled={fioEdit}
                    placeholder="Телефон"
                    color="primary"
                    multiline={true}
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                </Grid>
                <Grid container xs>
                  <OutlinedInput
                    fullWidth={true}
                    defaultValue={userData && userData.email}
                    value={emailField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailField(e.target.value)}
                    disabled={fioEdit}
                    placeholder="Почта"
                    color="primary"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </Grid>
                <Grid container xs>
                  <OutlinedInput
                    fullWidth={true}
                    defaultValue={userData && userData.telegrammLink}
                    value={telegramField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTelegramField(e.target.value)}
                    disabled={fioEdit}
                    placeholder="Telegram"
                    color="primary"
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )}
        <Grid container justifyContent="center">
          <Grid container style={{ margin: isTabletOrMobile ? '60px 0 40px 0' : 0 }}>
            <NavigationLine
              page="Профиль"
              selectedCategory={selectedSection}
              setSelectedCategory={setSelectedSection}
            />
            <Line marginTop={10} display={isTabletOrMobile ? 'none' : 'block'} />
          </Grid>
          {selectedSection === 'Мои мероприятия' ? (
            <Grid container id="Мои мероприятия" style={{ gap: 30 }}>
              <Grid
                container
                direction="row"
                justifyContent={isTabletOrMobile ? 'center' : 'flex-end'}
                alignItems="center"
              >
                {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <>
                    <CreateEventModal
                      userId={Number(contextUserData.user.id)}
                      open={openModalEvent}
                      handleOpenClose={handleOpenCloseEvent}
                    />
                    <Button
                      onClick={handleOpenCloseEvent}
                      variant="text"
                      // color="inherit"
                      startIcon={<AddIcon />}
                      sx={{
                        color: isTabletOrMobile ? '#252525' : '#AAADB2',

                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Добавить
                    </Button>
                  </>
                ) : null}
              </Grid>
              <Grid container style={{ gap: 70 }}>
                {loading ? (
                  <SkeletonEvents />
                ) : (
                  <>
                    {data?.getUser.myevent &&
                      data?.getUser.myevent.map(event => (
                        <ProfileEvent
                          key={event.id}
                          id={event.id}
                          inviteLink={event.inviteLink}
                          poster={event.poster.link}
                          name={event.title}
                          description={event.description}
                          shortDescription={event.shortDescription}
                          date={event.date}
                          address={event.place}
                          telegramm={event.telegramm}
                          seats={event.seats}
                          type={event.type}
                          format={event.format}
                          organizer={event.organizer}
                          author={event.author}
                          visitors={event.visitors}
                          participians={event.participians}
                          guests={event.guests}
                          members={event.members}
                          maybe={event.maybe}
                          isOwner={contextUserData.user && contextUserData.user.id === Number(userId)}
                          role={data.getUser.role}
                        />
                        // <div key={event.id}>d</div>
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          ) : selectedSection === 'Планирую пойти' ? (
            <Grid container id="Планирую пойти" style={{ gap: 30 }}>
              <Grid container style={{ gap: 70 }}>
                {loading ? (
                  <SkeletonEvents />
                ) : (
                  <>
                    {data?.getUser.planning &&
                      data?.getUser.planning.map(event => (
                        <ProfileEvent
                          key={event.id}
                          id={event.id}
                          inviteLink={event.inviteLink}
                          poster={event.poster.link}
                          name={event.title}
                          description={event.description}
                          shortDescription={event.shortDescription}
                          date={event.date}
                          address={event.place}
                          telegramm={event.telegramm}
                          seats={event.seats}
                          type={event.type}
                          format={event.format}
                          organizer={event.organizer}
                          author={event.author}
                          visitors={event.visitors}
                          participians={event.participians}
                          guests={event.guests}
                          members={event.members}
                          maybe={event.maybe}
                          isOwner={contextUserData.user && contextUserData.user.id === Number(userId)}
                          role={data.getUser.role}
                        />
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container id="Архив" style={{ gap: 30 }}>
              <Grid container style={{ gap: 70 }}>
                {loading ? (
                  <SkeletonEvents />
                ) : (
                  <>
                    {data?.getUser.archives &&
                      data?.getUser.archives.map(event => (
                        <ProfileEvent
                          key={event.id}
                          id={event.id}
                          inviteLink={event.inviteLink}
                          poster={event.poster.link}
                          name={event.title}
                          description={event.description}
                          shortDescription={event.shortDescription}
                          date={event.date}
                          address={event.place}
                          telegramm={event.telegramm}
                          seats={event.seats}
                          type={event.type}
                          format={event.format}
                          organizer={event.organizer}
                          author={event.author}
                          visitors={event.visitors}
                          participians={event.participians}
                          guests={event.guests}
                          members={event.members}
                          maybe={event.maybe}
                          isOwner={contextUserData.user && contextUserData.user.id === Number(userId)}
                          role={data.getUser.role}
                        />
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
