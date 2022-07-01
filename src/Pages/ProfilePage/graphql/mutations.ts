/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { gql, useMutation } from '@apollo/client';
import { UploadUrlType } from '../typings';

export const CreateCompanyMutation = () => {
  const [companyId] = useMutation(
    gql`
      mutation ($data: createCompanyInput!) {
        createCompany(data: $data) {
          name
        }
      }
    `,
  );
  return (data: any) => companyId({ variables: { data } });
};

export const UpdateUserDataMutation = () => {
  const [userId] = useMutation(gql`
    mutation ($data: updateUserInput!) {
      updateUser(data: $data)
    }
  `);
  return (data: any) => userId({ variables: { data } });
};

export const UploadImageMutation = () => {
  const [uploadUrl] = useMutation<{ putUserAvatar: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putUserAvatar(data: $data) {
        signedURL
      }
    }
  `);
  return (data: any) => uploadUrl({ variables: { data } });
};

export const SwitchToChat = () => {
  const [userId] = useMutation(gql`
    mutation ($data: switchToMessagerInput!) {
      switchToMessager(data: $data) {
        id
        members {
          firstname
          lastname
        }
        messages {
          sender {
            firstname
            lastname
          }
          text
        }
      }
    }
  `);
  return (data: any) => userId({ variables: { data } });
};
