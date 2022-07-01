/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { gql, useMutation } from '@apollo/client';

export const UpdateMyCompanyMutation = () => {
  const [companyId] = useMutation(gql`
    mutation ($data: updateCompanyInput!) {
      updateMyCompany(data: $data)
    }
  `);
  return (data: any) => companyId({ variables: { data } });
};

export const UploadImageMutation = () => {
  const [uploadUrl] = useMutation<{ putCompanyAvatar: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putCompanyAvatar(data: $data) {
        signedURL
      }
    }
  `);
  return (data: { entityId: number; fileName: string; fileType: string }) => uploadUrl({ variables: { data } });
};

export const UpdateContactsMutation = () => {
  const [uploadUrl] = useMutation<{ putCompanyAvatar: { signedURL: string } }>(gql`
    mutation ($data: updateContactInput!) {
      updateContact(data: $data)
    }
  `);
  return (data: { contactId: number; phones?: string[]; emails?: string[]; adresses?: string[] }) =>
    uploadUrl({ variables: { data } });
};

export const CreateEventMutation = () => {
  const [eventId] = useMutation<{ createOneEvent: { id: number } }>(gql`
    mutation ($data: createOneEventInput!) {
      createOneEvent(data: $data)
    }
  `);
  return (data: any) => eventId({ variables: { data } });
};

export const GetUrlToUploadEventPoster = () => {
  const [uploadUrl] = useMutation<{ putEventPoster: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putEventPoster(data: $data) {
        signedURL
      }
    }
  `);

  return (data: any) => uploadUrl({ variables: { data } });
};
