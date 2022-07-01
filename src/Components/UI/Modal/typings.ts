import { Dispatch } from 'react';

export interface ModalFrameProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  Background: string;
  title: string;
  content: string;
}

export interface ShownFullscreenPostContentProps {
  id: number;
  title: string;
  img: string;
  article: string;
  date: string;
  onImage: boolean;
  isCancel?: boolean;
  isNewNotApprovedArticle?: boolean;
  isEvent?: boolean;
  eventAddress?: string;
  eventTheme?: string;
  eventFormat?: string;
  eventOrganizer?: string;
  isOwner?: boolean;
  open: boolean;
  handleOpenClose: () => void;
}

export interface ShownModalContentProps {
  id: number;
  header: string;
  img?: string;
  article: string;
  date?: string;
  onImage: boolean;
  isCancel?: boolean;
  isNewNotApprovedArticle?: boolean;
  isEvent?: boolean;
  eventAddress?: string;
  eventTheme?: string;
  eventFormat?: string;
  eventOrganizer?: string;
  isOwner?: boolean;
}

export interface ShownModalEventContentProps {
  id: number;
  inviteLink?: string;
  img: string;
  title: string;
  content: string;
  shortContent?: string;
  date: Date;
  time: string;
  address?: string;
  format?: string;
  type?: string;
  organizer?: string;
  telegramm?: string;
  author: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: {
      link: string;
    };
  };
  open: boolean;
  handleOpenClose: () => void;
  isOwner?: boolean;
  role: string;
}
