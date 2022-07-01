import { gql } from '@apollo/client';

export const GET_EVENT_DATA = gql`
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

export const GET_POST_QUERY = gql`
  query ($id: Int!) {
    post(where: { id: $id }) {
      id
      createdAt
      title
      isOffer
      isResource
      isNews
      category
      poster {
        link
      }
      description
      articleBody
      isApproved
    }
  }
`;
