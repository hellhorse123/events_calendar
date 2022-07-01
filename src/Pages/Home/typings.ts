export interface EventsTypes {
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
}
