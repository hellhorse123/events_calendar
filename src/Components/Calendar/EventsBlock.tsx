/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import Calendar, { CalendarTileProperties } from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import { gql, useQuery } from '@apollo/client';

import ComponentTextHeader from '../Home/ComponentTextHeader/ComponentTextHeader';
import EventCard from './Event';
import EventInfo from './EventInfo';
import FilterLine from './FilterLine';
import EmptyEvents from './EmptyEvents';
import Loading from '../UI/Loading/Loading';
import { useWindowSize } from '../../rules/index';

import useStyles from './Styles';
import { EventTypes } from './typings';

const GET_EVENT_STATISTIC_QUERY = gql`
  query ($data: getEventStatisticInput!) {
    getEventStatistic(data: $data) {
      allMembers {
        id
        avatar {
          link
        }
        firstname
        lastname
      }
      allMembersCount
      willGo {
        id
        avatar {
          link
        }
        firstname
        lastname
      }
      willGoCount
      maybeGo {
        id
        avatar {
          link
        }
        firstname
        lastname
      }
      maybeGoCount
      allMembersPercentToAllPeople
      allMembersPercentToAllMembersLastEvent
      willGoPercentToAllMembers
      maybeGoPercentToAllMembers
      place
      date
    }
  }
`;

const GET_EVENTS = gql`
  query {
    events {
      id
      inviteLink
      title
      description
      shortDescription
      organizer
      date
      place
      format
      type
      telegramm
      seats
      poster {
        link
      }
      author {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      members {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      visitors {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      participians {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      guests {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
      maybe {
        id
        firstname
        lastname
        avatar {
          link
        }
      }
    }
  }
`;

const GET_ROLE_QUERY = gql`
  query {
    me {
      id
      role
    }
  }
`;

export default function EventsBlock(): JSX.Element {
  interface StateType {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
    poster: {
      link: string;
    };
    author: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    };
    members: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    }[];

    visitors: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    }[];
    participians: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    }[];

    guests: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    }[];

    maybe: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    }[];
  }

  interface RoleType {
    id: number;
    role: string;
  }

  const [value, setValue] = useState(new Date());
  const { loading, data } = useQuery<{ events: EventTypes[] }>(GET_EVENTS);
  const { data: roleData } = useQuery<{ me: RoleType }>(GET_ROLE_QUERY);
  const [filteredData, setFilteredData] = useState<Array<StateType | undefined>>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [datesToAddContentTo, setDatesToAddContentTo] = useState(
    data ? data.events.map((d: EventTypes) => new Date(d.date)) : [],
  );

  const [width] = useWindowSize();

  function onChange(nextValue: Date): void {
    setValue(nextValue);
  }

  function isSameDay(a: Date, b: Date): boolean {
    return differenceInCalendarDays(a, b) === 0;
  }
  useEffect(() => {
    const newFilter: Array<StateType | undefined> = data
      ? data.events.reduce((acc: Array<StateType>, d: EventTypes) => {
          if (selectedCategory === 'Все') {
            if (isSameDay(new Date(d.date), value)) {
              acc.push(d);
            }
          } else {
            if (isSameDay(new Date(d.date), value) && d.type === selectedCategory) {
              acc.push(d);
            }
          }
          return acc;
        }, [])
      : [];
    setFilteredData(newFilter);
    const newDates = data
      ? data.events.reduce((acc: Array<string>, d: EventTypes) => {
          if (selectedCategory === 'Все') {
            acc.push(d.date.toString());
          } else {
            if (d.type === selectedCategory) {
              acc.push(d.date.toString());
            }
          }
          return acc;
        }, [])
      : [];
    setDatesToAddContentTo(newDates.map((d: any) => new Date(d)));
  }, [selectedCategory, value, data]);

  function tileContent(props: CalendarTileProperties): JSX.Element | null {
    if (props.view === 'month') {
      if (datesToAddContentTo.find((dDate: any) => isSameDay(dDate, props.date))) {
        return (
          <div
            style={{
              borderTop: '1px solid',
              width: '55%',
              height: '100%',
              margin: '1px auto',
            }}
          />
        );
      }
      return null;
    }
    return null;
  }

  const classes = useStyles();

  console.log(filteredData);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container className={classes.eventsBox} xs={12}>
      <Grid item>
        <ComponentTextHeader text="" />
      </Grid>

      {width > 1200 ? (
        <Grid container direction="row" justifyContent="space-between" className={classes.eventsContainer}>
          <Grid container xs={7} direction="column" justifyContent="flex-start" style={{ gap: 30 }}>
            <Grid item>
              <FilterLine selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </Grid>
            <Grid container xs direction="column">
              {filteredData.length !== 0 ? (
                filteredData.map(event => {
                  if (event) {
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        inviteLink={event.inviteLink}
                        img={event.poster}
                        title={event.title}
                        content={event.description}
                        shortContent={event.shortDescription}
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
                        role={roleData ? roleData.me.role : 'common'}
                      />
                    );
                  }
                })
              ) : (
                <EmptyEvents />
              )}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="start" xs className={classes.calendarContainer}>
            <Grid xs={12} style={{ height: 300 }}>
              <Calendar
                onChange={onChange}
                value={value}
                tileContent={tileContent}
                className={classes.calendar}
                minDetail="year"
                next2Label={null}
                prev2Label={null}
              />
            </Grid>
            {/* <Grid container className={classes.eventInfoBox} xs={12}>
                <EventInfo />
              </Grid> */}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justifyContent="space-between" className={classes.eventsContainer}>
          <Grid
            container
            direction="row"
            alignItems="start"
            xs={12}
            className={classes.calendarContainer}
            style={{ gap: 40 }}
          >
            <Grid container direction="row" justifyContent="center">
              <FilterLine selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </Grid>
            <Grid container justifyContent="center">
              <Grid item md={6} sm={8} xs={12}>
                <Calendar
                  onChange={onChange}
                  value={value}
                  tileContent={tileContent}
                  className={classes.calendar}
                  minDetail="year"
                  next2Label={null}
                  prev2Label={null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={12} direction="column">
              {filteredData.length !== 0 ? (
                filteredData.map(event => {
                  if (event) {
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        inviteLink={event.inviteLink}
                        img={event.poster}
                        title={event.title}
                        content={event.description}
                        shortContent={event.shortDescription}
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
                        role={roleData ? roleData.me.role : 'common'}
                      />
                    );
                  }
                })
              ) : (
                <EmptyEvents />
              )}
            </Grid>
          </Grid>
          {/* <Grid container className={classes.eventInfoBox} xs={12}>
              <EventInfo />
            </Grid> */}
        </Grid>
      )}
    </Grid>
  );
}
