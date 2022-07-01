import { createContext } from 'react';

interface OngoingEventsType {
  name: string;
  poster: {
    link: string;
  };
  description: string;
}

export interface ContextUserTypes {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
    role: string;
  };
}

export const userContext = createContext<ContextUserTypes>({
  user: {
    id: 0,
    firstname: 'string',
    lastname: 'string',
    avatar: {
      link: '',
    },
    role: 'string',
  },
});
