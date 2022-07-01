import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';

import Line from '../../Components/Line/Line';
import FilterLine from '../../Components/EventsPage/FilterLine';
import EventPoster from '../../Components/EventsPage/EventPoster/EventPoster';

import Loading from '../../Components/UI/Loading/Loading';
import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonEvents from '../../Components/UI/SkeletonBlocks/SkeletonEvents/SkeletonEvents';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';

import { EventTypes } from './typings';

import { GET_EVENTS_QUERY } from '../../Queries';
import Footer from '../../Components/Home/Footer/Footer';

interface EventsContentProps {
  // isEditable: boolean;
  selectedEventCategory: string;
  setSelectedEventCategory: React.Dispatch<string>;
}

const Events = (props: EventsContentProps) => {
  const { loading, data: eventData, error } = useQuery<{ events: EventTypes[] }>(GET_EVENTS_QUERY);
  const [filter, setFilter] = useState<string>('Все');
  const [filteredData, setFilteredData] = useState<EventTypes[]>([]);
  const classes = useStyles();
  if (error) {
    console.error(error);
  }
  useEffect(() => {
    if (filter !== 'Все' && eventData) {
      const filtered = eventData.events.filter(event => event.category === filter);
      setFilteredData(filtered);
    } else if (eventData && filter === 'Все') {
      setFilteredData(eventData.events);
    }
  }, [filter]);

  useEffect(() => {
    if (!loading && eventData) {
      setFilteredData(eventData.events);
    }
  }, [loading]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={classes.sloganText}>Мероприятия</Grid>
        <FilterLine selectedCategory={filter} setSelectedCategory={setFilter} />
        <Line />
        {loading ? (
          <SkeletonEvents />
        ) : (
          <>
            {filteredData?.map((event: EventTypes) => (
              <EventPoster
                id={event.id}
                key={event.id}
                name={event.name}
                poster={event.poster}
                description={event.description}
                shortDescription={event.shortDescription}
                date={event.date}
                organizer={event.organizer}
                theme={event.theme}
                format={event.format}
                address={event.address}
                stream={event.stream}
              />
            ))}
          </>
        )}
      </Grid>
      <Footer />
    </Grid>
  );
};

export default Events;
