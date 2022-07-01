export interface EventTypes {
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
