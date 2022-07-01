import { gql } from '@apollo/client';

export const GET_ROLE_QUERY = gql`
  query {
    me {
      id
      role
    }
  }
`;
export const GET_EVENT_STATISTIC_QUERY = gql`
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

export const ME_QUERY = gql`
  query {
    me {
      id
      email
      login
      firstname
      lastname
      avatar {
        link
      }
      phone
      role
      myevent {
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
      }
      planning {
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
      }
      participian {
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
      }
      guest {
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
      }
      archives {
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
      }
      maybego {
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
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query ($data: getUserInput!) {
    getUser(data: $data) {
      id
      email
      login
      firstname
      lastname
      work
      telegrammLink
      phone
      avatar {
        link
      }
      role
      myevent {
        id
        inviteLink
        title
        description
        shortDescription
        organizer
        poster {
          link
        }
        date
        place
        format
        type
        telegramm
        seats
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
      planning {
        id
        inviteLink
        title
        description
        shortDescription
        organizer
        poster {
          link
        }
        date
        place
        format
        type
        telegramm
        seats
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
      participian {
        id
        inviteLink
        title
        description
        shortDescription
        poster {
          link
        }
        organizer
        date
        place
        format
        type
      }
      guest {
        id
        inviteLink
        title
        description
        shortDescription
        poster {
          link
        }
        organizer
        date
        place
        format
        type
      }
      archives {
        id
        inviteLink
        title
        description
        shortDescription
        organizer
        poster {
          link
        }
        date
        place
        format
        type
        telegramm
        seats
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
      maybego {
        id
        inviteLink
        title
        description
        shortDescription
        organizer
        poster {
          link
        }
        date
        place
        format
        type
        telegramm
        seats
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
  }
`;

export const GET_EVENTS_QUERY = gql`
  query ($data: getEventInput!) {
    getEvent(data: $data) {
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

export const GET_ALL_EVENTS_QUERY = gql`
  query {
    getAllEvents {
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
