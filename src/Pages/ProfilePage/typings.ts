export interface MatchProps {
  match: {
    path: string;
    isExact: boolean;
    url: string;
    params: {
      profileId: string;
    };
  };
}

export interface ProjectTypes {
  id: number;
  name: string;
  description: string;
  poster: {
    link: string;
  };
  shortDescription: string;
  presentationMedia: string[];
  isApproved: boolean;
  category: string;
  publishedPosts: {
    id: number;
    createdAt: Date;
    title: string;
    isOffer: boolean;
    isResource: boolean;
    isNews: boolean;
    category: string;
    poster: {
      link: string;
    };
    description: string;
    articleBody: string;
    isApproved: boolean;
  }[];
  updatedVariable?: {
    name: string;
    shortDescription: string;
    description: string;
    poster: {
      link: string;
    };
    presentationMedia: {
      link: string;
    };
  };
}

interface StatisticType {
  allMembers: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  allMembersCount: number;
  willGo: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  willGoCount: number;
  id: number;
  maybeGo: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  maybeGoCount: number;
  allMembersPercentToAllPeople: number;
  allMembersPercentToAllMembersLastEvent: number;
  willGoPercentToAllMembers: number;
  maybeGoPercentToAllMembers: number;
  place: string;
  date: Date;
}

export interface UserDataTypes {
  id: number;
  email: string;
  login: string;
  firstname: string;
  lastname: string;
  work?: string;
  telegrammLink?: string;
  phone?: string;
  avatar: {
    link: string;
  };
  role: string;
  myevent: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
  planning: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
  participian: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
  guest: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
  archives: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
  maybego: {
    id: number;
    inviteLink?: string;
    title: string;
    description: string;
    shortDescription?: string;
    organizer?: string;
    poster: {
      link: string;
    };
    date: Date;
    place?: string;
    format?: string;
    type?: string;
    telegramm?: string;
    seats?: number;
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
  }[];
}

export interface PostTypes {
  id: number;
  createdAt: Date;
  title: string;
  isOffer: boolean;
  isResource: boolean;
  isNews: boolean;
  poster: {
    link: string;
  };
  category: string;
  author: {
    worker: {
      id: number;
      firstname: string;
      lastname: string;
      avatar: {
        link: string;
      };
    };
  };
  description: string;
  articleBody: string;
  isApproved: boolean;
}

interface StatisticType {
  allMembers: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  allMembersCount: number;
  willGo: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  willGoCount: number;
  maybeGo: {
    id: number;
    avatar: {
      link: string;
    };
    firstname: string;
    lastname: string;
  };
  maybeGoCount: number;
  allMembersPercentToAllPeople: number;
  allMembersPercentToAllMembersLastEvent: number;
  willGoPercentToAllMembers: number;
  maybeGoPercentToAllMembers: number;
  place: string;
  date: Date;
}

export interface EventTypes {
  id: number;
  inviteLink?: string;
  title: string;
  description: string;
  shortDescription?: string;
  organizer?: string;
  poster: {
    link: string;
  };
  date: Date;
  place?: string;
  format?: string;
  type?: string;
  telegramm?: string;
  seats?: number;
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

export interface UploadUrlType {
  putUserAvatar: {
    signedURL: string;
  };
}

export interface DataUploadType {
  data: UploadUrlType;
}

export interface SwitchToChatTypes {
  data?: {
    switchToMessager: {
      id: number;
      members: {
        firstname: string;
        lastname: string;
      }[];
    };
    messages: {
      sender: {
        firstname: string;
        lastname: string;
      };
      text: string;
    }[];
  };
}
